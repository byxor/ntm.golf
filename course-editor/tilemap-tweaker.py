import atexit
import copy
import os
import random
import shutil
import struct
import tempfile
import time
import zipfile
import pyperclip
import tkinter as tk

from dataclasses import dataclass, field
from enum import Enum
from sys import exit
from tkinter import Tk, messagebox
from tkinter.filedialog import askopenfilename, asksaveasfilename
from typing import List

from tiles import Tile
from course_data import DEFAULT_COURSES
from models import *
from renderer import render_tile_map_image


@dataclass
class Context:
    version: str = "v0.0.0"

    rom: default_courses.find_in(rom.program_rom)

def main():
    context = Context()

    context.tk_root = Tk()
    # context.tk_root.withdraw()
    context.tk_root.attributes('-topmost', True)
    context.tk_root.after(0, context.tk_root.attributes, '-topmost', False)

    try:
        with ROM.prompt_open_zip() as rom:
            context.rom = rom

            load_courses_from_program_rom(context)
            make_some_edits(context)

            rom.prompt_write_zip()
    finally:
        if context.tk_root:
            context.tk_root.destroy()


def load_courses_from_program_rom(context):
    print("Loading courses from program ROM...")
    context.loaded_courses = copy.deepcopy(DEFAULT_COURSES)
    context.loaded_courses.find_in(context.rom.program_rom)


def make_some_edits(context):
    print("\nMaking some editz...")

    updated_one = False

    # TODO: include the course name in the hole class so i dont need the param
    def update_program_rom_for_hole(hole, course):
        nonlocal updated_one
        if hole.tile_map_pointer != -1:

            print(f"Patching {course.name} {hole.number}...")

            new_tile_map = hole.get_tile_map_bytes()

            if len(new_tile_map) > hole.tile_map.capacity():
                messagebox.showwarning("Warning: tile_map capacity exceeded", f"{course.name} {hole.number} tile_map exceeds memory capacity.\n\n(old size = {hole.tile_map.capacity()} bytes)\n(new size = {len(new_tile_map)} bytes).\n\nThis will corrupt the ROM.", parent=context.tk_root)
                # exit(1)
            elif len(new_tile_map) < hole.tile_map.capacity():
                n = hole.tile_map.capacity() - len(new_tile_map)
                print(f"Saved {n} bytes!")

            context.program_rom = _overwrite_bytes_at_index(
                context.program_rom,
                hole.tile_map_pointer,
                new_tile_map
            )

            updated_one = True
        else:
            print(f"Warning: Skipping {course.name} {hole.number}...")   

    # def update_program_rom_for_course(course):
        # for hole in course.holes:
            # update_program_rom_for_hole(hole, course)

    germany = context.loaded_courses.germany
    japan = context.loaded_courses.japan
    australia = context.loaded_courses.australia
    usa = context.loaded_courses.usa

    def debug_tiles(tile_map, verbose=True):
        tile_map.debug()
        if verbose:
            print("Unknown tiles")
            frequencies = {}
            for t in tile_map._tiles:
                if t in Tile.glossary():
                    continue
                if t in frequencies:
                    frequencies[t] += 1
                else:
                    frequencies[t] = 1
            sorted_frequencies = dict(sorted(frequencies.items(), key=lambda item: item[1]))
            for k, v in sorted_frequencies.items():
                print(hex(k), v)
        render_tile_map_image(tile_map)

    def update_germany_1():
        hole = germany.hole(1)
        
        # trim off that weird inset in fairway (to save space)
        hole.tile_map.set_tile_at(16, 171, Tile.FAIRWAY.id_)

        # Add water strips
        for y in range(177, 269):
            hole.tile_map.set_tile_at(18, y, Tile.WATER_HAZARD.id_)
        for y in range(177, 200):
            hole.tile_map.set_tile_at(20, y, Tile.WATER_HAZARD.id_)

        debug_tiles(hole.tile_map, False)
        update_program_rom_for_hole(hole, germany)

    # def update_japan_3():
    #     hole = japan.hole(3)

    #     debug_tiles(hole.tile_map)
    #     update_program_rom_for_hole(hole, japan) 


    update_germany_1()
    # update_japan_3()

    for hole in japan.holes:
        tile_map = hole.tile_map
        tiles = tile_map.tiles()
        for i in range(len(tiles)):
            if tiles[i] == Tile.ROUGH.id_:
                tiles[i] = Tile.FAIRWAY.id_
            elif tiles[i] == Tile.FAIRWAY.id_:
                tiles[i] = Tile.ROUGH.id_
        update_program_rom_for_hole(hole, japan)


    # for hole in germany.holes:
    #     tile_map = hole.tile_map
    #     tiles = tile_map.tiles()
    #     for i in range(len(tiles)):
    #         tiles[i] = max([tiles[i] - 0x20, 0])
    #     update_program_rom_for_hole(hole, germany)

    if not updated_one:
        messagebox.showerror("No holes were updated", "Did you provide the original 'turfmast.zip'?", parent=context.tk_root)
        exit(1)


def prompt_for_save_location_and_create_zip(context):
    initial_name = f"turfmast.whatever_{context.version}.zip"

    print("\nSaving the modified ROM...")

    initial_dir = os.path.dirname(context.turfmast_zip_path) if context.turfmast_zip_path else os.getcwd()

    save_path = asksaveasfilename(
        title="Save modified turfmast.zip",
        defaultextension=".zip",
        filetypes=[("ZIP files", "*.zip")],
        initialdir=initial_dir,
        initialfile=initial_name,
        parent=context.tk_root
    )

    if not save_path:
        print("Cancelled.")
        exit()
    else:
        print("Saved:", save_path)

        message = ""

        backup_full_path = os.path.join(os.path.dirname(context.turfmast_zip_path), context.turfmast_backup_zip_name)

        if save_path.strip() != context.turfmast_zip_path.strip():
            message = (
                f"Success!\n\nSaved to: {save_path}\n\n"
                f"Replace the original turfmast.zip with your new zip to load the modified ROM.\n\n"
                f"A backup of the original ROM was created at: {backup_full_path}"
            )
        else:
            message = (
                f"You have overwritten the original ROM. "
                f"A backup is available at: {backup_full_path}"
            )

        messagebox.showinfo("Patch Successful", message, parent=context.tk_root)

    context.turfmast_pin_randomizer_zip_path = save_path

    with open(context.program_rom_path, "wb") as f:
        f.write(context.program_rom)

    with zipfile.ZipFile(save_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root_dir, _, files in os.walk(context.temp_directory):
            for file in files:
                abs_file = os.path.join(root_dir, file)
                rel_path = os.path.relpath(abs_file, context.temp_directory)
                zipf.write(abs_file, arcname=rel_path)


def _overwrite_bytes_at_index(data: bytes, index: int, new_bytes: bytes) -> bytes:
    if index < 0 or index + len(new_bytes) > len(data):
        raise IndexError("Replacement would go out of bounds")

    mutable = bytearray(data)
    mutable[index:index + len(new_bytes)] = new_bytes
    return bytes(mutable)


def _hex(data):
    return ' '.join(f'{b:02x}' for b in data)


if __name__ == "__main__":
    main()
