import atexit
import tempfile
import os
import zipfile
import shutil
import struct

from binary import ByteSequence
from contextlib import contextmanager
from tkinter.filedialog import askopenfilename, asksaveasfilename
from tkinter import Tk, messagebox

"""
Specifically, turfmast.zip.
"""
class ROM:

    program_rom_name: str = "200-p1.p1"
    c1_rom_name: str = "200-c1.c1"
    c2_rom_name: str = "200-c2.c2"
    s1_rom_name: str = "200-s1.s1"
    m1_rom_name: str = "200-m1.m1"
    v1_rom_name: str = "200-v1.v1"
    v2_rom_name: str = "200-v2.v2"
    v3_rom_name: str = "200-v3.v3"
    v4_rom_name: str = "200-v4.v4"

    def __init__(self, path: str, tk_root):
        self.path: str = path
        self.temporary_directory: str = None
        self.program_rom: ByteSequence = None
        self.tk_root = None

    @classmethod
    @contextmanager
    def prompt_open_zip(cls, tk_root) -> 'ROM':
        path = cls.__prompt_input_path(tk_root)
        with cls.open_zip(path, tk_root) as rom:
            yield rom

    @classmethod
    @contextmanager
    def open_zip(cls, path: str, tk_root) -> 'ROM':
        try:
            rom = ROM(path, tk_root)

            rom.__setup_temporary_directory()
            rom.__extract_zip_to_temporary_directory()

            # TODO: read other files from the rom if required
            rom.__read_program_rom()

            yield rom
        finally:
            rom.__cleanup_temporary_directory()

    def prompt_write_zip(self):
        self.write_zip(self.__prompt_output_path())

    def write_zip(self, output_path: str):
        if not output_path:
            print("Cancelled.")
            exit()

        if output_path == self.path:
            print("WARNING: overwriting original zip")

        self.__ensure_backup_exists()
        self.__write_program_rom()

        with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for root_dir, _, files in os.walk(self.temporary_directory):
                for file in files:
                    abs_file = os.path.join(root_dir, file)
                    rel_path = os.path.relpath(abs_file, self.temporary_directory)
                    zipf.write(abs_file, arcname=rel_path)

        print("Saved:", output_path)

    @classmethod
    def __prompt_input_path(cls, tk_root):
        print("Prompting for input path...")

        input_path = askopenfilename(
            title="Open the original 'turfmast.zip'",
            initialdir=os.getcwd(),
            filetypes=[("ZIP files", "*.zip")],
            parent=tk_root
        )

        if not input_path:
            messagebox.showerror("Unable to patch ROM", "A valid path to 'turfmast.zip' was not provided.", parent=tk_root)
            exit()

        return input_path

    def __prompt_output_path(self):
        print("Prompting for output path...")

        initial_directory = os.path.dirname(self.path) if self.path else os.getcwd()
        initial_name = f"turfmast.zip"

        output_path = asksaveasfilename(
            title="Save modified turfmast.zip",
            defaultextension=".zip",
            filetypes=[("ZIP files", "*.zip")],
            initialdir=initial_directory,
            initialfile=initial_name,
            parent=self.tk_root
        )

        return output_path

    def __setup_temporary_directory(self):
        self.temporary_directory = tempfile.mkdtemp()
        atexit.register(self.__cleanup_temporary_directory)
        print("Created temporary directory:", self.temporary_directory)

    def __cleanup_temporary_directory(self):
        if self.temporary_directory and os.path.exists(self.temporary_directory):
            shutil.rmtree(self.temporary_directory)
            print("Cleaned up temporary directory.")

    def __extract_zip_to_temporary_directory(self):
        with zipfile.ZipFile(self.path, 'r') as zip_ref:
            zip_ref.extractall(self.temporary_directory)
        print("Extracted ZIP contents to temporary directory")

    def __read_program_rom(self):
        with open(self.__program_rom_path, "rb") as f:
            self.program_rom = ByteSequence(f.read())

    def __write_program_rom(self):
        with open(self.__program_rom_path, "wb") as f:
            f.write(self.program_rom.as_bytes())

    def __ensure_backup_exists(self):
        rom_directory = os.path.dirname(self.path)
        backup_path = os.path.join(rom_directory, "turfmast.backup.zip")
        if not os.path.exists(backup_path):
            shutil.copy2(self.path, backup_path)
            print(f"Backup created at: {backup_path}")
        else:
            print(f"Backup already exists at: {backup_path}")

    @property
    def __program_rom_path(self):
        return os.path.join(self.temporary_directory, self.program_rom_name)


# ---------------------------------------------------------------------------

def test():
    tk_root = Tk()
    # tk_root.withdraw()
    tk_root.attributes('-topmost', True)
    tk_root.after(0, tk_root.attributes, '-topmost', False)

    with ROM.prompt_open_zip(tk_root) as rom:
        rom.prompt_write_zip()

    # Manually verify the ROM has the correct hashes (e.g. by loading it in FBNeo)


if __name__ == "__main__":
    test()