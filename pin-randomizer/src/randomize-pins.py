import atexit
import copy
import os
import random
import shutil
import struct
import tempfile
import time
import zipfile

from dataclasses import dataclass, field
from sys import exit
from typing import List

from tkinter import Tk, messagebox
from tkinter.filedialog import askopenfilename, asksaveasfilename


@dataclass
class PinPosition:
    x: int
    y: int


    @classmethod
    def from_bytes(cls, data: bytes) -> 'PinPosition':
        """Deserialize 4 bytes (LSB first) into a PinPosition."""
        if len(data) != 4:
            raise ValueError("Expected 4 bytes")
        x, y = struct.unpack('<hh', data)
        return cls(x, y)


    @classmethod
    def from_hex(cls, hex_str: str) -> 'PinPosition':
        """Deserialize 4 bytes (LSB first) into a PinPosition."""
        return PinPosition.from_bytes(bytes.fromhex(hex_str))


    def to_bytes(self) -> bytes:
        """Serialize the PinPosition to 4 bytes (LSB first)."""
        return struct.pack('<hh', self.x, self.y)


@dataclass
class Hole:
    number: int
    pin_positions: List[PinPosition]
    pin_position_pointer: int = None


    @classmethod
    def from_hex(cls, number, hex_strings: List[str]) -> 'Hole':
        return Hole(number, list(map(lambda hex_str: PinPosition.from_hex(hex_str), hex_strings)))


    @classmethod
    def from_disassembly(cls, number, disassembly: str) -> 'Hole':
        """ e.g.
            dc.w $0138,$0100
            dc.w $0118,$00f0
            dc.w $0118,$0118
            dc.w $0148,$0128
            dc.w $0151,$00e0
            dc.w $0163,$00fb
            dc.w $0160,$0118
            dc.w $015a,$0138
        """
        lines = [
            line.strip()[5:].replace("$", "").replace(",", "") for line in disassembly.split("\n")
        ]

        lines = [line for line in lines if line.strip() != ""]

        hex_strings = [
            f"{line[2:4]} {line[0:2]} {line[6:8]} {line[4:6]}" for line in lines
        ]

        return cls.from_hex(number, hex_strings)


    def get_pin_position_bytes(self):
        search_pattern: bytes = bytes()

        for pin_position in self.pin_positions:
            search_pattern += pin_position.to_bytes()

        return search_pattern


    def randomize_pins(self, course_name):
        print(f"Randomizing pins for {course_name} {self.number}...")

        # Draw a rectangular boundary around the existing pins
        left_x = min([pin_position.x for pin_position in self.pin_positions])
        right_x = max([pin_position.x for pin_position in self.pin_positions])
        top_y = min([pin_position.y for pin_position in self.pin_positions])
        bottom_y = max([pin_position.y for pin_position in self.pin_positions])

        # Expand it a bit
        padding = 38 # 25 is safer
        left_x -= padding
        right_x += padding
        top_y -= padding
        bottom_y += padding

        # Update the pin positions
        debug = 0 # (set to 1 to force pins to the corners of the boundary, for debugging purposes)
        for pin_position in self.pin_positions:
            if debug == 4:
                pin_position.x = left_x
                pin_position.y = top_y
            elif debug == 3:
                pin_position.x = right_x
                pin_position.y = top_y
            elif debug == 2:
                pin_position.x = right_x
                pin_position.y = bottom_y
            elif debug == 1:
                pin_position.x = left_x
                pin_position.y = bottom_y
                debug = 4
            else:
                # Select random position within the boundary
                new_x = random.randint(left_x, right_x)
                new_y = random.randint(top_y, bottom_y)
                pin_position.x = new_x
                pin_position.y = new_y
            debug -= 1


@dataclass
class Course:
    name: str
    holes: List[Hole]


@dataclass
class Courses:
    germany: Course
    japan: Course
    australia: Course
    usa: Course


"""
Course data was manually written down based on
the disassembly from mountainmanjed.

See:
- https://github.com/mountainmanjed/BTG-Dasm/
- https://github.com/mountainmanjed/BTG-Dasm/tree/master/m68k/course

Thank you!
"""
DEFAULT_COURSES = Courses(
    Course(
        "Germany",
        [
            Hole.from_disassembly(1, """
                dc.w $0138,$0108
                dc.w $0118,$00f8
                dc.w $0110,$0120
                dc.w $0132,$0138
                dc.w $0148,$00d8
                dc.w $0170,$00f0
                dc.w $0168,$0118
                dc.w $0160,$0130
            """),
            Hole.from_disassembly(2, """
                dc.w $0118,$0128
                dc.w $0100,$00e0
                dc.w $0150,$00f0
                dc.w $011a,$00ee
                dc.w $0130,$0108
                dc.w $00fb,$010b
                dc.w $0127,$00d7
                dc.w $0148,$011f
            """),
            Hole.from_disassembly(3, """
                dc.w $00f0,$00fc
                dc.w $0128,$00e4
                dc.w $0118,$00cc
                dc.w $00e0,$0104
                dc.w $00e8,$00cc
                dc.w $0128,$010c
                dc.w $0100,$011c
                dc.w $00d8,$0114
            """),
            Hole.from_disassembly(4, """
                dc.w $00c0,$00f0
                dc.w $00d0,$00c0
                dc.w $00f8,$00f8
                dc.w $0110,$00c0
                dc.w $00db,$00e7
                dc.w $0105,$00dc
                dc.w $0120,$00f0
                dc.w $00f5,$00ad
            """),
            Hole.from_disassembly(5, """
                dc.w $0158,$00e0
                dc.w $018a,$00f8
                dc.w $0167,$0116
                dc.w $0150,$012a
                dc.w $013c,$0109
                dc.w $0135,$0128
                dc.w $0140,$00f0
                dc.w $0190,$0118
            """),
            Hole.from_disassembly(6, """
                dc.w $01a8,$0118
                dc.w $0198,$0108
                dc.w $0178,$00f8
                dc.w $01c8,$0100
                dc.w $01b0,$00e8
                dc.w $01a0,$00d5
                dc.w $0186,$00e0
                dc.w $017a,$0116
            """),
            Hole.from_disassembly(7, """
                dc.w $0190,$00d8
                dc.w $01c8,$00f8
                dc.w $0188,$0118
                dc.w $01b0,$0127
                dc.w $019b,$013c
                dc.w $01b8,$010b
                dc.w $01c0,$011e
                dc.w $0173,$0103
            """),
            Hole.from_disassembly(8, """
                dc.w $0128,$0109
                dc.w $0116,$00d0
                dc.w $00f8,$00e8
                dc.w $013f,$00f2
                dc.w $0130,$0120
                dc.w $00fe,$0123
                dc.w $010c,$00f3
                dc.w $00f0,$0108
            """),
            Hole.from_disassembly(9, """
                dc.w $0160,$0110
                dc.w $0110,$0120
                dc.w $0107,$00e8
                dc.w $0120,$00d0
                dc.w $0130,$00f8
                dc.w $0120,$00e8
                dc.w $0140,$0129
                dc.w $0148,$00d8
            """),
            Hole.from_disassembly(10, """
                dc.w $01f8,$00f0
                dc.w $01a0,$0130
                dc.w $01f8,$0128
                dc.w $01c0,$00f0
                dc.w $01c2,$0128
                dc.w $01d0,$00e8
                dc.w $01e8,$0109
                dc.w $01a8,$00f0
            """),
            Hole.from_disassembly(11, """
                dc.w $01a8,$00f4
                dc.w $0178,$0114
                dc.w $0170,$013c
                dc.w $0198,$0144
                dc.w $0190,$010c
                dc.w $0158,$0124
                dc.w $01b0,$013c
                dc.w $0160,$00fc
            """),
            Hole.from_disassembly(12, """
                dc.w $0130,$00f8
                dc.w $0102,$00c8
                dc.w $00e9,$00f3
                dc.w $0129,$00d5
                dc.w $012b,$0120
                dc.w $00f0,$0119
                dc.w $0110,$0128
                dc.w $00cc,$0113
            """),
            Hole.from_disassembly(13, """
                dc.w $0148,$00c8
                dc.w $0180,$00d8
                dc.w $0170,$00e8
                dc.w $0198,$00f8
                dc.w $0173,$010c
                dc.w $0146,$00fe
                dc.w $0158,$0118
                dc.w $0180,$00c0
            """),
            Hole.from_disassembly(14, """
                dc.w $0110,$0120
                dc.w $0130,$0140
                dc.w $0120,$0168
                dc.w $00e2,$015d
                dc.w $0120,$0157
                dc.w $00df,$0133
                dc.w $0110,$014a
                dc.w $00ef,$016d
            """),
            Hole.from_disassembly(15, """
                dc.w $012d,$00f8
                dc.w $0140,$0108
                dc.w $0120,$0158
                dc.w $00fd,$0137
                dc.w $0118,$0128
                dc.w $0100,$0101
                dc.w $0150,$0130
                dc.w $014c,$00f3
            """),
            Hole.from_disassembly(16, """
                dc.w $0240,$0112
                dc.w $0248,$00f2
                dc.w $0240,$00d8
                dc.w $0218,$00d9
                dc.w $0217,$0119
                dc.w $0207,$00f3
                dc.w $0230,$012b
                dc.w $0250,$0120
            """),
            Hole.from_disassembly(17, """
                dc.w $01d0,$00e8
                dc.w $0208,$00b8
                dc.w $0210,$0110
                dc.w $0218,$00f0
                dc.w $01e0,$0100
                dc.w $0208,$00dd
                dc.w $0213,$0100
                dc.w $0230,$00e0
            """),
            Hole.from_disassembly(18, """
                dc.w $0137,$0100
                dc.w $0160,$011b
                dc.w $012f,$0129
                dc.w $015e,$0132
                dc.w $011b,$00fa
                dc.w $0179,$00e4
                dc.w $0150,$00c7
                dc.w $0134,$00e5
            """),
        ]
    ),
    Course(
        "Japan",
        [
            Hole.from_disassembly(1, """
                dc.w $0130,$0130
                dc.w $0138,$0118
                dc.w $0130,$0150
                dc.w $00fe,$011d
                dc.w $010f,$00fa
                dc.w $00e5,$0103
                dc.w $00dc,$0146
                dc.w $00f8,$014d
            """),
            Hole.from_disassembly(2, """
                dc.w $00d8,$0138
                dc.w $0128,$0148
                dc.w $00f8,$0142
                dc.w $00e0,$00f8
                dc.w $0130,$0100
                dc.w $0108,$0118
                dc.w $0120,$00f0
                dc.w $0100,$00fc
            """),
            Hole.from_disassembly(3, """
                dc.w $00f8,$00e8
                dc.w $0108,$0100
                dc.w $00d8,$00d8
                dc.w $0118,$00c8
                dc.w $00f0,$00d0
                dc.w $00d0,$00fe
                dc.w $00f0,$011d
                dc.w $0130,$010e
            """),
            Hole.from_disassembly(4, """
                dc.w $0122,$0148
                dc.w $00f7,$014f
                dc.w $011e,$0101
                dc.w $0118,$0138
                dc.w $00d2,$0118
                dc.w $00f3,$00f7
                dc.w $00d2,$0140
                dc.w $00e8,$0108
            """),
            Hole.from_disassembly(5, """
                dc.w $028b,$0110
                dc.w $0296,$00ec
                dc.w $02ae,$0108
                dc.w $0268,$00e4
                dc.w $029b,$012b
                dc.w $0270,$010c
                dc.w $02c8,$010b
                dc.w $0292,$00d5
            """),
            Hole.from_disassembly(6, """
                dc.w $0178,$00d0
                dc.w $0183,$00eb
                dc.w $0130,$00d8
                dc.w $0135,$00b3
                dc.w $0151,$00e0
                dc.w $0159,$0108
                dc.w $0127,$010a
                dc.w $0167,$010b
            """),
            Hole.from_disassembly(7, """
                dc.w $0107,$00f0
                dc.w $0118,$0128
                dc.w $0140,$00f8
                dc.w $0134,$00d3
                dc.w $014c,$0125
                dc.w $0166,$00f8
                dc.w $0142,$0138
                dc.w $0165,$0118
            """),
            Hole.from_disassembly(8, """
                dc.w $00fc,$0133
                dc.w $0127,$0119
                dc.w $00f7,$00d8
                dc.w $0100,$0110
                dc.w $011a,$00de
                dc.w $00f0,$00f1
                dc.w $0139,$00e7
                dc.w $00e0,$0108
            """),
            Hole.from_disassembly(9, """
                dc.w $0140,$0120
                dc.w $0110,$0130
                dc.w $010c,$0112
                dc.w $0138,$0149
                dc.w $0141,$00ff
                dc.w $00ff,$0128
                dc.w $0120,$00f0
                dc.w $0140,$0156
            """),
            Hole.from_disassembly(10, """
                dc.w $0198,$0108
                dc.w $0150,$00f0
                dc.w $0178,$00e8
                dc.w $0150,$0138
                dc.w $0178,$0138
                dc.w $016e,$0117
                dc.w $0190,$0128
                dc.w $01a3,$00f0
            """),
            Hole.from_disassembly(11, """
                dc.w $0168,$00c8
                dc.w $0158,$00d8
                dc.w $0188,$0108
                dc.w $0190,$00e8
                dc.w $01a8,$00d8
                dc.w $01b0,$0100
                dc.w $0160,$0100
                dc.w $0190,$00b0
            """),
            Hole.from_disassembly(12, """
                dc.w $0218,$00ef
                dc.w $0228,$00d8
                dc.w $0217,$0108
                dc.w $01f7,$00c9
                dc.w $024d,$00e8
                dc.w $01f8,$00f8
                dc.w $023f,$0118
                dc.w $021f,$011e
            """),
            Hole.from_disassembly(13, """
                dc.w $01b8,$00f8
                dc.w $01d0,$00e0
                dc.w $01d8,$0120
                dc.w $01f2,$010e
                dc.w $0210,$00e0
                dc.w $01f0,$00e8
                dc.w $0210,$0100
                dc.w $01e5,$00c0
            """),
            Hole.from_disassembly(14, """
                dc.w $0128,$0108
                dc.w $0108,$00f8
                dc.w $00f8,$00c8
                dc.w $0138,$00d8
                dc.w $0107,$0118
                dc.w $00e7,$00f0
                dc.w $00de,$00cf
                dc.w $00e1,$0103
            """),
            Hole.from_disassembly(15, """
                dc.w $0123,$0132
                dc.w $0168,$00e7
                dc.w $0180,$011a
                dc.w $013f,$0108
                dc.w $0150,$0116
                dc.w $0157,$0146
                dc.w $012b,$00fe
                dc.w $0154,$00db
            """),
            Hole.from_disassembly(16, """
                dc.w $0210,$012f
                dc.w $01e0,$0108
                dc.w $0231,$0113
                dc.w $01f0,$00e8
                dc.w $0220,$00e8
                dc.w $0211,$0102
                dc.w $01e0,$0120
                dc.w $0235,$00f8
            """),
            Hole.from_disassembly(17, """
                dc.w $0130,$00fc
                dc.w $0168,$00f4
                dc.w $0150,$00cc
                dc.w $0113,$00f4
                dc.w $0138,$00e2
                dc.w $016a,$00d9
                dc.w $0130,$00bc
                dc.w $0120,$00dc
            """),
            Hole.from_disassembly(18, """
                dc.w $00d8,$00d8
                dc.w $00f8,$010e
                dc.w $0128,$00f0
                dc.w $0100,$00c5
                dc.w $00e7,$00f9
                dc.w $00d0,$0108
                dc.w $00fc,$00e8
                dc.w $00c7,$00f7
            """),
        ]
    ),
    Course(
        "Australia",
        [
            Hole.from_disassembly(1, """
                dc.w $0138,$0100
                dc.w $0118,$00f0
                dc.w $0118,$0118
                dc.w $0148,$0128
                dc.w $0151,$00e0
                dc.w $0163,$00fb
                dc.w $0160,$0118
                dc.w $015a,$0138
            """),
            Hole.from_disassembly(2, """
                dc.w $0118,$0118
                dc.w $0118,$00f8
                dc.w $0108,$0120
                dc.w $0148,$0100
                dc.w $0138,$0138
                dc.w $0110,$00db
                dc.w $00e8,$0110
                dc.w $00f0,$0140
            """),
            Hole.from_disassembly(3, """
                dc.w $0146,$0150
                dc.w $0140,$012c
                dc.w $0178,$013d
                dc.w $0138,$0164
                dc.w $0168,$0164
                dc.w $0127,$014b
                dc.w $0134,$017f
                dc.w $015f,$0184
            """),
            Hole.from_disassembly(4, """
                dc.w $0198,$00e8
                dc.w $019b,$0106
                dc.w $01bc,$010a
                dc.w $0183,$011d
                dc.w $01b0,$00c3
                dc.w $018f,$00cf
                dc.w $01d8,$00e5
                dc.w $01d0,$0116
            """),
            Hole.from_disassembly(5, """
                dc.w $0210,$00d1
                dc.w $0208,$00f8
                dc.w $01d2,$011c
                dc.w $01e0,$00f8
                dc.w $0220,$0108
                dc.w $01fb,$0120
                dc.w $01e0,$00e0
                dc.w $0230,$0110
            """),
            Hole.from_disassembly(6, """
                dc.w $01e4,$0153
                dc.w $01e8,$0110
                dc.w $01c1,$0141
                dc.w $019c,$0154
                dc.w $01ad,$012c
                dc.w $01b6,$0118
                dc.w $01aa,$0108
                dc.w $0197,$0120
            """),
            Hole.from_disassembly(7, """
                dc.w $0220,$00f0
                dc.w $0208,$0108
                dc.w $01e8,$00d8
                dc.w $0230,$0100
                dc.w $0239,$00d6
                dc.w $01f8,$00e0
                dc.w $0218,$00c8
                dc.w $01f0,$0100    
            """),
            Hole.from_disassembly(8, """
                dc.w $0118,$00f8
                dc.w $0148,$00f8
                dc.w $0138,$0128
                dc.w $0115,$0119
                dc.w $0142,$00d8
                dc.w $0100,$0110
                dc.w $00f8,$00e0
                dc.w $0150,$0120
            """),
            Hole.from_disassembly(9, """
                dc.w $0180,$00f0
                dc.w $0178,$0110
                dc.w $0178,$0138
                dc.w $0148,$0110
                dc.w $0158,$0118
                dc.w $0140,$0130
                dc.w $0150,$00f8
                dc.w $01a0,$011d
            """),
            Hole.from_disassembly(10, """
                dc.w $0108,$00e8
                dc.w $0104,$0121
                dc.w $0116,$00d5
                dc.w $0134,$011c
                dc.w $012c,$00ff
                dc.w $015a,$00e0
                dc.w $0142,$00ff
                dc.w $0168,$00fd
            """),
            Hole.from_disassembly(11, """
                dc.w $0298,$0109
                dc.w $0278,$00e8
                dc.w $02b5,$00da
                dc.w $025c,$0108
                dc.w $02ab,$011c
                dc.w $0270,$00c8
                dc.w $02c0,$0118
                dc.w $028c,$0133
            """),
            Hole.from_disassembly(12, """
                dc.w $015b,$010d
                dc.w $0120,$0148
                dc.w $0117,$00f7
                dc.w $0126,$0116
                dc.w $0158,$0138
                dc.w $0139,$00fd
                dc.w $0130,$0157
                dc.w $0160,$012f
            """),
            Hole.from_disassembly(13, """
                dc.w $01c0,$00d0
                dc.w $0190,$00f8
                dc.w $01e8,$00d8
                dc.w $0191,$00d1
                dc.w $01d0,$0130
                dc.w $01b0,$010c
                dc.w $01f0,$0118
                dc.w $01eb,$00fa
            """),
            Hole.from_disassembly(14, """
                dc.w $0108,$00e0
                dc.w $0128,$0108
                dc.w $00f8,$00d8
                dc.w $00e8,$00f8
                dc.w $0108,$0110
                dc.w $0128,$00d8
                dc.w $0100,$00bf
                dc.w $0138,$00f0
            """),
            Hole.from_disassembly(15, """
                dc.w $0208,$0108
                dc.w $0250,$0108
                dc.w $0220,$00f0
                dc.w $0208,$00c2
                dc.w $0258,$00d8
                dc.w $0218,$00d8
                dc.w $0238,$00d0
                dc.w $0260,$00f5
            """),
            Hole.from_disassembly(16, """
                dc.w $00d8,$00e8
                dc.w $0110,$00c8
                dc.w $0110,$010e
                dc.w $00de,$00ff
                dc.w $00eb,$0123
                dc.w $0130,$00f0
                dc.w $0108,$00ef
                dc.w $00f0,$0107
            """),
            Hole.from_disassembly(17, """
                dc.w $0208,$0108
                dc.w $0226,$00d7
                dc.w $0240,$011d
                dc.w $0236,$00f8
                dc.w $0210,$00dd
                dc.w $025c,$00fa
                dc.w $0250,$0123
                dc.w $0250,$00d8
            """),
            Hole.from_disassembly(18, """
                dc.w $0160,$0120
                dc.w $0132,$0105
                dc.w $0191,$0106
                dc.w $0150,$00e8
                dc.w $0178,$0118
                dc.w $0180,$00e8
                dc.w $016e,$012c
                dc.w $015d,$00cf
            """),
        ]
    ), 
    Course(
        "U.S.A",
        [
            Hole.from_hex(1, [
                "28 01 50 01",
                "2a 01 2e 01",
                "00 01 48 01",
                "50 01 40 01",
                "08 01 78 01",
                "58 01 68 01",
                "28 01 88 01",
                "62 01 7d 01",
            ]),
            Hole.from_disassembly(2, """
                dc.w $01a0,$0170
                dc.w $0198,$0138
                dc.w $0140,$0158
                dc.w $0145,$0129
                dc.w $0148,$0172
                dc.w $0178,$0148
                dc.w $016c,$0120
                dc.w $0168,$0188
            """),
            Hole.from_disassembly(3, """
                dc.w $0138,$0118
                dc.w $013f,$0138
                dc.w $00e8,$0118
                dc.w $0100,$0100
                dc.w $00f5,$0146
                dc.w $0108,$0118
                dc.w $0121,$00f3
                dc.w $0112,$014d
            """),
            Hole.from_disassembly(4, """
                dc.w $0203,$0100
                dc.w $01e3,$00f3
                dc.w $0210,$00c0
                dc.w $0220,$0116
                dc.w $0218,$00e8
                dc.w $01f0,$00d8
                dc.w $0220,$0100
                dc.w $01e0,$00d0
            """),
            Hole.from_disassembly(5, """
                dc.w $0141,$00e6
                dc.w $0135,$010b
                dc.w $0168,$00f8
                dc.w $0148,$0128
                dc.w $016e,$00d2
                dc.w $016d,$010d
                dc.w $0130,$0120
                dc.w $0140,$00c9
            """),
            Hole.from_disassembly(6, """
                dc.w $0268,$00f0
                dc.w $0298,$0118
                dc.w $0258,$0120
                dc.w $0280,$0148
                dc.w $02ab,$014c
                dc.w $02a0,$0136
                dc.w $0252,$010d
                dc.w $02b0,$0120
            """),
            Hole.from_disassembly(7, """
                dc.w $0108,$00f8
                dc.w $00e8,$00c8
                dc.w $0108,$0118
                dc.w $00e8,$0108
                dc.w $0118,$00c8
                dc.w $0128,$0100
                dc.w $00df,$00e0
                dc.w $00c9,$00f0
            """),
            Hole.from_disassembly(8, """
                dc.w $00d3,$00e8
                dc.w $010d,$00ef
                dc.w $00de,$0106
                dc.w $00f7,$0112
                dc.w $010e,$00c7
                dc.w $00e7,$00b6
                dc.w $00d0,$00cd
                dc.w $0120,$00db
            """),
            Hole.from_disassembly(9, """
                dc.w $019e,$011b
                dc.w $01dc,$0118
                dc.w $01ce,$0160
                dc.w $01e5,$00ff
                dc.w $01e0,$012f
                dc.w $01c0,$0140
                dc.w $01fb,$0139
                dc.w $01c1,$00fb
            """),
            Hole.from_disassembly(10, """
                dc.w $0248,$0108
                dc.w $0236,$0128
                dc.w $01fc,$0104
                dc.w $0220,$00e8
                dc.w $0250,$00e8
                dc.w $0220,$0108
                dc.w $0240,$00d0
                dc.w $0221,$00d4
            """),
            Hole.from_disassembly(11, """
                dc.w $0240,$00f0
                dc.w $0248,$0130
                dc.w $0290,$00e0
                dc.w $0258,$0108
                dc.w $0280,$0118
                dc.w $0290,$0100
                dc.w $02a0,$0110
                dc.w $0278,$00cf
            """),
            Hole.from_disassembly(12, """
                dc.w $0108,$00e8
                dc.w $0140,$00f8
                dc.w $0120,$013e
                dc.w $00f7,$0139
                dc.w $00f0,$0110
                dc.w $014c,$0120
                dc.w $0110,$0150
                dc.w $0138,$0148
            """),
            Hole.from_disassembly(13, """
                dc.w $0240,$00f8
                dc.w $0210,$00d0
                dc.w $0203,$0118
                dc.w $0217,$00ff
                dc.w $023e,$00c8
                dc.w $021f,$012f
                dc.w $0251,$0121
                dc.w $0261,$00fb
            """),
            Hole.from_disassembly(14, """
                dc.w $00f0,$0100
                dc.w $0130,$0108
                dc.w $0111,$00ed
                dc.w $0100,$0128
                dc.w $0110,$00d8
                dc.w $00f7,$00d8
                dc.w $0140,$00f0
                dc.w $0138,$011f
            """),
            Hole.from_disassembly(15, """
                dc.w $0193,$00ef
                dc.w $0170,$0104
                dc.w $017b,$00e4
                dc.w $0198,$0135
                dc.w $0165,$0128
                dc.w $018c,$0117
                dc.w $01b8,$00fc
                dc.w $01b8,$0124
            """),
            Hole.from_disassembly(16, """
                dc.w $0113,$00d9
                dc.w $0113,$0100
                dc.w $0100,$00d8
                dc.w $00d3,$00f0
                dc.w $00e5,$0116
                dc.w $00fb,$00ff
                dc.w $0128,$00e8
                dc.w $0115,$0119
            """),
            Hole.from_disassembly(17, """
                dc.w $0137,$0130
                dc.w $0100,$00fb
                dc.w $0109,$015a
                dc.w $00fb,$0138
                dc.w $00e0,$0130
                dc.w $00e0,$014b
                dc.w $00cf,$0116
                dc.w $00e0,$015a
            """),
            Hole.from_disassembly(18, """
                dc.w $00e0,$0100
                dc.w $00f8,$0118
                dc.w $0127,$00d7
                dc.w $0137,$0108
                dc.w $00dd,$0111
                dc.w $00df,$00cd
                dc.w $00e8,$00e7
                dc.w $0118,$0110
            """),
        ]
    )
)


@dataclass
class Context:
    version: str = "v0.0.0"

    seed: int = 0

    turfmast_zip_path: str = None

    turfmast_backup_zip_name: str = "turfmast.backup.zip"

    temp_directory: str = None

    program_rom_path: str = "200-p1.p1"
    program_rom: bytes = field(default_factory=lambda: [])

    loaded_courses: 'Courses' = None

    turfmast_pin_randomizer_zip_path: str = None

    tk_root: Tk = None


def main():
    context = Context()
    context.tk_root = Tk()
    context.tk_root.withdraw()
    context.tk_root.attributes('-topmost', True)
    context.tk_root.after(0, context.tk_root.attributes, '-topmost', False)

    try:
        prompt_for_turfmast_zip(context)
        create_temp_directory(context)
        extract_zip_to_temp(context)
        atexit.register(clean_up_temp_dir, context)

        read_program_rom(context)
        load_courses_from_program_rom(context)
        set_random_seed(context)
        randomize_pins(context)

        prompt_for_save_location_and_create_zip(context)
    finally:
        if context.tk_root:
            context.tk_root.destroy()


def prompt_for_turfmast_zip(context):
    print("\nOpen the original ROM...")

    filename = askopenfilename(
        title="Open the original 'turfmast.zip'",
        initialdir=os.getcwd(),
        filetypes=[("ZIP files", "*.zip")],
        parent=context.tk_root
    )

    if not filename:
        messagebox.showerror("Unable to patch ROM", "A valid path to 'turfmast.zip' was not provided.", parent=context.tk_root)
        exit()

    context.turfmast_zip_path = filename
    print("Selected file:", filename)

    # Create backup if one doesn't already exist
    rom_dir = os.path.dirname(filename)
    backup_path = os.path.join(rom_dir, context.turfmast_backup_zip_name)

    if not os.path.exists(backup_path):
        shutil.copy2(filename, backup_path)
        print(f"Backup created at: {backup_path}")
    else:
        print(f"Backup already exists at: {backup_path}")



def create_temp_directory(context):
    context.temp_directory = tempfile.mkdtemp()
    print("\nCreated temporary directory:", context.temp_directory)


def extract_zip_to_temp(context):
    with zipfile.ZipFile(context.turfmast_zip_path, 'r') as zip_ref:
        zip_ref.extractall(context.temp_directory)

    program_rom_full_path = os.path.join(context.temp_directory, context.program_rom_path)
    if not os.path.exists(program_rom_full_path):
        raise FileNotFoundError(f"{context.program_rom_path} not found in ZIP.")

    context.program_rom_path = program_rom_full_path
    print("Extracted ZIP contents to temp and found program ROM at:", context.program_rom_path)
    print()


def clean_up_temp_dir(context):
    if context.temp_directory and os.path.exists(context.temp_directory):
        shutil.rmtree(context.temp_directory)
        print("\nCleaned up temporary directory.")


def set_random_seed(context):
    context.seed = int(time.time())
    random.seed(context.seed)
    print("\nUsing random seed:", context.seed)


def read_program_rom(context):
    print("Reading program ROM...")
    with open(context.program_rom_path, "rb") as f:
        context.program_rom = f.read()


def load_courses_from_program_rom(context):
    print("Loading courses from program ROM...")
    def load_hole(hole):
        loaded_hole = copy.deepcopy(hole)
        search_pattern = hole.get_pin_position_bytes()
        loaded_hole.pin_position_pointer = context.program_rom.find(search_pattern)

        if loaded_hole.pin_position_pointer == -1:
            print("Warning: Unable to find pin data (did you supply an original unmodified ROM?)")

        return loaded_hole

    def load_course(course):
        return Course(
            course.name,
            [load_hole(hole) for hole in course.holes]
        )

    context.loaded_courses = Courses(
        load_course(DEFAULT_COURSES.germany),
        load_course(DEFAULT_COURSES.japan),
        load_course(DEFAULT_COURSES.australia),
        load_course(DEFAULT_COURSES.usa),
    )


def randomize_pins(context):
    print("\nRandomizing pins...")

    updated_one = False

    def update_program_rom_for_hole(hole, course):
        nonlocal updated_one
        if hole.pin_position_pointer != -1:
            hole.randomize_pins(course.name)
            context.program_rom = _overwrite_bytes_at_index(
                context.program_rom,
                hole.pin_position_pointer,
                hole.get_pin_position_bytes()
            )
            updated_one = True
        else:
             print(f"Warning: Skipping {course.name} {hole.number}...")   

    def update_program_rom_for_course(course):
        for hole in course.holes:
            update_program_rom_for_hole(hole, course)

    update_program_rom_for_course(context.loaded_courses.germany)
    update_program_rom_for_course(context.loaded_courses.japan)
    update_program_rom_for_course(context.loaded_courses.australia)
    update_program_rom_for_course(context.loaded_courses.usa)

    if not updated_one:
        messagebox.showerror("No pin positions were updated", "Did you provide the original 'turfmast.zip'? No pin positions were found.", parent=context.tk_root)
        exit(1)


def prompt_for_save_location_and_create_zip(context):
    initial_name = f"turfmast.pin-randomizer_{context.version}_{context.seed}.zip"

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


if __name__ == "__main__":
    main()
