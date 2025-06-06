@echo off
cd /d "%~dp0"

rmdir /s /q build
rmdir /s /q dist
del /q randomize-pins.spec

python3 -m PyInstaller --onefile --noconsole --icon="%~dp0icon.ico" --name=NTM-pin-randomizer-v0.0.0-patcher randomize-pins.py
