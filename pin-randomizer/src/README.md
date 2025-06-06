This is a Neo Turf Masters ROM Hack.

See: https://ntm.golf/pin-randomizer

### Details:

`randomize-pins.py` is a portable python 3.8+ script.

- It prompts the user to select an original copy of `turfmast.zip` (the Neo Turf Masters ROM).
- Once selected, it randomizes all the pin positions and produces a hacked ROM.
- Then, it prompts the user where to save the ROM.

For development:

- `pip install -r requirements.txt`

Run with:

- `python3 randomize-pins.py`

Or use PyInstaller to create a native executable.