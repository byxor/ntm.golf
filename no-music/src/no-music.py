#!/usr/bin/env python3
import os
import shutil
import tempfile
import zipfile
import atexit

from dataclasses import dataclass
from typing import Optional
from tkinter import Tk, messagebox
from tkinter.filedialog import askopenfilename, asksaveasfilename


PATCH_OFFSET = 0x1802BC + 0x2C
PATCH_BYTES  = bytes([0x10, 0x3C, 0xFF, 0x00])


@dataclass
class Context:
    turfmast_zip_path: Optional[str] = None
    temp_directory: Optional[str] = None
    program_rom_path: Optional[str] = None
    program_rom: Optional[bytearray] = None
    turfmast_backup_zip_name: str = "turfmast.backup.zip"
    version: str = "v0.0.0"
    tk_root: Optional[Tk] = None


def main():
    context = Context()
    atexit.register(clean_up_temp_dir, context)

    context.tk_root = Tk()
    context.tk_root.withdraw()
    context.tk_root.attributes('-topmost', True)
    context.tk_root.after(0, context.tk_root.attributes, '-topmost', False)

    prompt_for_turfmast_zip(context)
    create_temp_directory(context)
    extract_zip_to_temp(context)
    load_rom(context)
    apply_patch(context)
    prompt_for_save_location_and_create_zip(context)

    context.tk_root.destroy()


def prompt_for_turfmast_zip(context: Context):
    print("\nOpening the original ROM...")

    filename = askopenfilename(
        title="Open the original 'turfmast.zip'",
        filetypes=[("ZIP files","*.zip")],
        initialdir=os.getcwd(),
        parent=context.tk_root
    )

    if not filename:
        messagebox.showerror(
            "Unable to patch ROM",
            "A valid path to 'turfmast.zip' was not provided.",
            parent=context.tk_root
        )
        exit()

    context.turfmast_zip_path = filename
    print("Selected file:", filename)

    rom_dir = os.path.dirname(filename)
    backup = os.path.join(rom_dir, context.turfmast_backup_zip_name)

    if not os.path.exists(backup):
        shutil.copy2(filename, backup)
        print(f"Backup created at: {backup}")
    else:
        print(f"Backup already exists at: {backup}")


def create_temp_directory(context: Context):
    context.temp_directory = tempfile.mkdtemp()
    print("\nCreated temporary directory:", context.temp_directory)


def clean_up_temp_dir(context: Context):
    if context.temp_directory and os.path.exists(context.temp_directory):
        shutil.rmtree(context.temp_directory)
        

def extract_zip_to_temp(context: Context):
    with zipfile.ZipFile(context.turfmast_zip_path, "r") as z:
        z.extractall(context.temp_directory)

    rom_full = os.path.join(context.temp_directory, "200-p1.p1")
    if not os.path.exists(rom_full):
        raise FileNotFoundError("200-p1.p1 not found in ZIP.")

    context.program_rom_path = rom_full
    print("Extracted ZIP contents to temp and found program ROM at:", context.program_rom_path)
    print()


def load_rom(context: Context):
    print("Reading program ROM...")
    with open(context.program_rom_path, "rb") as f:
        context.program_rom = bytearray(f.read())


def apply_patch(context: Context):
    print("\nApplying 'no music' patch...")

    before = context.program_rom[PATCH_OFFSET:PATCH_OFFSET+4]
    print("Original bytes:", before.hex())

    context.program_rom[PATCH_OFFSET:PATCH_OFFSET+4] = PATCH_BYTES

    after = context.program_rom[PATCH_OFFSET:PATCH_OFFSET+4]
    print("Patched bytes:", after.hex())


def prompt_for_save_location_and_create_zip(context: Context):
    initial_name = f"turfmast.no_music_{context.version}.zip"

    print("\nSaving the modified ROM...")

    save_path = asksaveasfilename(
        title="Save modified turfmast.zip",
        defaultextension=".zip",
        filetypes=[("ZIP files","*.zip")],
        initialdir=os.path.dirname(context.turfmast_zip_path),
        initialfile=initial_name,
        parent=context.tk_root
    )

    if not save_path:
        print("Cancelled.")
        exit()
    else:
        print("Saved:", save_path)

        backup_full_path = os.path.join(
            os.path.dirname(context.turfmast_zip_path),
            context.turfmast_backup_zip_name
        )

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

    with open(context.program_rom_path, "wb") as f:
        f.write(context.program_rom)

    with zipfile.ZipFile(save_path, "w", zipfile.ZIP_DEFLATED) as z:
        for root, _, files in os.walk(context.temp_directory):
            for file in files:
                abs_path = os.path.join(root, file)
                rel = os.path.relpath(abs_path, context.temp_directory)
                z.write(abs_path, arcname=rel)


if __name__ == "__main__":
    main()
