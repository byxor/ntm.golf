This is a Neo Turf Masters ROM Hack.

See: https://ntm.golf/no-music

### Details:

`no-music.py` is a portable python 3.8+ script.

- It prompts the user to select an original copy of `turfmast.zip` (the Neo Turf Masters ROM).
- Once selected, it patches the ROM to disable in-game music.
- Then, it prompts the user where to save the ROM.

For development:

- `pip install -r requirements.txt`

Run with:

- `python3 no-music.py`

Or use PyInstaller to create a native executable. (I manually run GitHub actions to do this)