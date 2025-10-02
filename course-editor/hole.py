from dataclasses import dataclass

from tile_map import TileMap
from gameobjects import ObjectMap
from pins import PinMap
from binary import ByteSequence
from typing import List
from views import RiverView, GroundView


def _disassembly_lines_to_endian_swapped_hex(lines: List[str]) -> str:
    cramped_hex = "".join(lines)
    endian_swapped_hex = ' '.join(cramped_hex[i+2:i+4] + cramped_hex[i:i+2] for i in range(0, len(cramped_hex) - 3, 4))
    return endian_swapped_hex


class Hole:

    @classmethod
    def from_disassembly(cls, number, disassembly):
        # clean the disassembly

        lines = disassembly.split("\n")

        lines = [line.strip() for line in lines]
        lines = [line for line in lines if line]
        lines = [line for line in lines if not line.startswith(";")]
        lines = [line.replace(",", "").replace("$", "").replace("dc.w ", "").replace("dc.l ", "").replace("dc.b ", "") for line in lines]
        lines = [line.split(";")[0].strip() for line in lines]

        # split the disassembly into sections (quick hack - splitting by labels)
        label_refs = []
        for i in range(len(lines)):
            line = lines[i]
            is_label = line.endswith(":")
            if is_label:
                label_ref = (i, line)
                label_refs.append(label_ref)
        [
            (base_label_index, base_label),
            (object_map_label_index, object_map_label),
            (ground_view_label_index, ground_view_label),
            (river_view_label_index, river_view_label),
            (pin_map_label_index, pin_map_label),
        ] = label_refs

        header_lines = lines[0:7]
        tile_map_lines = lines[7:object_map_label_index]
        object_map_lines = lines[object_map_label_index+1:ground_view_label_index]
        ground_view_lines = lines[ground_view_label_index+1:river_view_label_index]
        river_view_lines = lines[river_view_label_index+1:pin_map_label_index]
        pin_map_lines = lines[pin_map_label_index+1:]

        def debuq(thang, sheit):
            print(f"---------------{thang}------------------")
            print("\n".join(sheit))
            print("-------------------")

        def parse_header(lines):
            def label_to_address(label: str) -> int:
                try:
                    return int(label[4:], 16)
                except ValueError:
                    print(f"Couldn't convert label '{label}' to an address")
                    return 0


            base_location = label_to_address(lines[0][:-1])
            unknown = int(lines[1], 16)
            par = int(lines[2], 16)
            pin_map_location = label_to_address(lines[3])
            object_map_location = label_to_address(lines[4])
            river_view_location = label_to_address(lines[5])
            ground_view_location = label_to_address(lines[6])

            return (
                base_location,
                unknown,
                par,
                pin_map_location,
                object_map_location,
                river_view_location,
                ground_view_location,
            )

        def parse_tile_map(lines) -> TileMap:
            return TileMap.from_hex(_disassembly_lines_to_endian_swapped_hex(lines))

        def parse_river_view(lines) -> RiverView:
            hex_str = _disassembly_lines_to_endian_swapped_hex(lines)
            data = bytes(bytearray.fromhex(hex_str))
            return RiverView.from_bytes(data)

        def parse_ground_view(lines) -> GroundView:
            hex_str = _disassembly_lines_to_endian_swapped_hex(lines)
            data = bytes(bytearray.fromhex(hex_str))
            return GroundView.from_bytes(data)

        def parse_object_map(lines) -> ObjectMap:
            hex_str = _disassembly_lines_to_endian_swapped_hex(lines)
            data = bytes(bytearray.fromhex(hex_str))
            return ObjectMap.from_bytes(data)

        def parse_pin_map(lines) -> PinMap:
            hex_str = _disassembly_lines_to_endian_swapped_hex(lines)
            data = bytes(bytearray.fromhex(hex_str))
            return PinMap.from_bytes(data)

        header = parse_header(header_lines)
        (
            base_location,
            unknown,
            par,
            pin_map_location,
            object_map_location,
            river_view_location,
            ground_view_location
        ) = header

        tile_map = parse_tile_map(tile_map_lines)
        river_view = parse_river_view(river_view_lines)
        ground_view = parse_ground_view(ground_view_lines)
        object_map = parse_object_map(object_map_lines)
        pin_map = parse_pin_map(pin_map_lines)

        # ----------------------------
        base_pointer = None # calculate this later when loading ROM
        tile_map_offset    = 1 + 1 + 4 + 4 + 4 + 4
        object_map_offset  = object_map_location - base_location
        river_view_offset  = river_view_location - base_location
        ground_view_offset = ground_view_location - base_location
        pin_map_offset     = pin_map_location - base_location

        # Memory info
        hole = Hole()
        hole.__base_location = base_location # not sure I need this...
        hole.__base_pointer = base_pointer
        hole.__tile_map_offset = tile_map_offset
        hole.__river_view_offset = river_view_offset
        hole.__ground_view_offset = ground_view_offset
        hole.__object_map_offset = object_map_offset
        hole.__pin_map_offset = pin_map_offset

        # Course data
        hole.__number = number
        hole.__unknown = unknown
        hole.__par = par
        hole.__tile_map = tile_map
        hole.__river_view = river_view
        hole.__ground_view = ground_view
        hole.__object_map = object_map
        hole.__pin_map = pin_map

        hole.__initial_capacity = len(hole.to_bytes())

        return hole

    def find_in(self, program_rom: bytes):
        # load the base pointer
        # (search for tile_map and subtract tilemap offset)
        tile_map_search_pattern = self.__tile_map.to_bytes()[:40]
        tile_map_pointer = program_rom.find(tile_map_search_pattern)

        # print("--searchfor--")
        # print(_hex(tile_map_search_pattern))
        # print("---offsets")
        # print(self.__base_location)
        # print(self.__tile_map_offset)
        # print(self.__object_map_offset)
        # print(self.__pin_map_offset)
        # print("---")
        if tile_map_pointer == -1:
            print("Failed to find hole in program rom")
            exit(-1)

        self.__base_pointer = tile_map_pointer - self.__tile_map_offset

    @property
    def unknown(self) -> int:
        return self.__unknown

    @unknown.setter
    def unknown(self, value: int) -> None:
        self.__unknown = value

    @property
    def number(self) -> int:
        return self.__number

    @property
    def par(self) -> int:
        return self.__par

    @par.setter
    def par(self, value: int) -> None:
        self.__par = value

    @property
    def tile_map(self) -> TileMap:
        return self.__tile_map

    @tile_map.setter
    def tile_map(self, tile_map: TileMap) -> None:
        self.__tile_map = tile_map

    @property
    def object_map(self) -> ObjectMap:
        return self.__object_map

    @object_map.setter
    def object_map(self, object_map: ObjectMap) -> None:
        self.__object_map = object_map

    @property
    def pin_map(self) -> PinMap:
        return self.__pin_map

    @pin_map.setter
    def pin_map(self, pin_map: PinMap) -> None:
        self.__pin_map = pin_map

    @property
    def base_pointer(self):
        return self.__base_pointer

    @property
    def tile_map_pointer(self):
        return self.__base_pointer + self.__tile_map_offset

    @property
    def object_map_pointer(self):
        return self.__base_pointer + self.__object_map_offset

    @property
    def ground_view_pointer(self):
        return self.__base_pointer + self.__ground_view_offset

    @property
    def river_view_pointer(self):
        return self.__base_pointer + self.__river_view_offset

    @property
    def pin_map_pointer(self):
        return self.__base_pointer + self.__pin_map_offset

    @property
    def ground_view(self):
        return self.__ground_view

    @ground_view.setter
    def ground_view(self, value: GroundView) -> None:
        self.__ground_view = value

    @property
    def river_view(self):
        return self.__river_view

    @river_view.setter
    def river_view(self, value: RiverView) -> None:
        self.__river_view = value

    @property
    def base_location(self):
        return self.__base_location

    @property
    def tile_map_location(self):
        return self.__base_location + self.__tile_map_offset

    @property
    def object_map_location(self):
        return self.__base_location + self.__object_map_offset

    @property
    def ground_view_location(self):
        return self.__base_location + self.__ground_view_offset

    @property
    def river_view_location(self):
        return self.__base_location + self.__river_view_offset

    @property
    def pin_map_location(self):
        return self.__base_location + self.__pin_map_offset

    @property
    def initial_capacity(self):
        return self.__initial_capacity

    def recalculate_locations(self):
        tile_map_bytes = self.__tile_map.to_bytes()
        object_map_bytes = self.__object_map.to_bytes()
        ground_view_bytes = self.__ground_view.to_bytes()
        river_view_bytes = self.__river_view.to_bytes()

        old_object_map_offset = self.__object_map_offset
        old_ground_view_offset = self.__ground_view_offset
        old_river_view_offset = self.__river_view_offset
        old_pin_map_offset = self.__pin_map_offset

        header_size = 1 + 1 + 4 + 4 + 4 + 4
        self.__object_map_offset = header_size + len(tile_map_bytes)
        self.__ground_view_offset = self.__object_map_offset + len(object_map_bytes)
        self.__river_view_offset = self.__ground_view_offset + len(ground_view_bytes)
        self.__pin_map_offset = self.__river_view_offset + len(river_view_bytes)

        print("Recalculated locations...")
        print("object diff =", self.__object_map_offset - old_object_map_offset)
        print("ground view diff =", self.__ground_view_offset - old_ground_view_offset)
        print("river view diff =", self.__river_view_offset - old_river_view_offset)
        print("pin diff =", self.__pin_map_offset - old_pin_map_offset)

    def to_bytes(self) -> bytes:
        # header location bytes are in a weird order, need to shuffle them round a bit 🤷‍♀️🤷‍♂️
        def rearrange_ui32_bdac(value):
            b = value.to_bytes(4, 'big')
            rearranged = bytes([b[1], b[0], b[3], b[2]])
            return int.from_bytes(rearranged, 'big')

        tile_map_bytes = self.__tile_map.to_bytes()
        object_map_bytes = self.__object_map.to_bytes()
        ground_view_bytes = self.__ground_view.to_bytes()
        river_view_bytes = self.__river_view.to_bytes()
        pin_map_bytes = self.__pin_map.to_bytes()

        data = ByteSequence()

        data.append_ui8_be(self.__par)
        data.append_ui8_be(self.__unknown)
        data.append_ui32_be(rearrange_ui32_bdac(self.pin_map_location))
        data.append_ui32_be(rearrange_ui32_bdac(self.object_map_location))
        data.append_ui32_be(rearrange_ui32_bdac(self.river_view_location))
        data.append_ui32_be(rearrange_ui32_bdac(self.ground_view_location))

        data.append_bytes(tile_map_bytes)
        data.append_bytes(object_map_bytes)
        data.append_bytes(ground_view_bytes)
        data.append_bytes(river_view_bytes)
        data.append_bytes(pin_map_bytes)

        return data.as_bytes()


def _hex(data):
    return ' '.join(f'{b:02x}' for b in data)


def test():
    import pyperclip
    from tkinter import Tk, messagebox
    from rom import ROM

    tk_root = Tk()
    # tk_root.withdraw()
    tk_root.attributes('-topmost', True)
    tk_root.after(0, tk_root.attributes, '-topmost', False)

    hole = Hole.from_disassembly(16,
        """
        ;xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        ;Hole 16
        loc_042848:
            dc.b $03	;Unknown
            dc.b $03	;Par
            dc.l loc_04325c	;Holes
            dc.l loc_043204	;Objects
            dc.l loc_043252	;Rivers
            dc.l loc_04324e	;Display Ground

        ;==============================================
        ;tile_map Data
            dc.w $002f,$004e
            dc.w $0000,$009e
            dc.w $0390,$0007
            dc.w $8c81
            dc.w $0390,$0002
            dc.w $83b2
            dc.w $82b0
            dc.w $0190,$003e
            dc.w $0000,$0004
            dc.w $0390,$0007
            dc.w $8c81
            dc.w $0390,$0003
            dc.w $83b3
            dc.w $0190,$003e
            dc.w $0000,$0004
            dc.w $0390,$0006
            dc.w $8cac
            dc.w $8c9c
            dc.w $0390,$0003
            dc.w $83b2
            dc.w $82b0
            dc.w $92c9
            dc.w $0190,$003c
            dc.w $0000,$0004
            dc.w $0390,$0005
            dc.w $8cab
            dc.w $8cd7
            dc.w $8cce
            dc.w $0390,$0004
            dc.w $83c2
            dc.w $83c3
            dc.w $82b0
            dc.w $0190,$0007
            dc.w $92d4
            dc.w $0190,$0004
            dc.w $92d4
            dc.w $0190,$002e
            dc.w $0000,$0004
            dc.w $8cc5
            dc.w $8c91
            dc.w $0c80,$0003
            dc.w $8c9a
            dc.w $8cbe
            dc.w $0390,$0007
            dc.w $83c1
            dc.w $82b0
            dc.w $92cf
            dc.w $0190,$0002
            dc.w $92d4
            dc.w $0190,$0036
            dc.w $0000,$0004
            dc.w $8cca
            dc.w $8ca1
            dc.w $0390,$000d
            dc.w $83b3
            dc.w $0190,$003a
            dc.w $0000,$0004
            dc.w $0390,$000f
            dc.w $83b2
            dc.w $82b0
            dc.w $0190,$0007
            dc.w $92c6
            dc.w $0190,$0010
            dc.w $92d8
            dc.w $0190,$0020
            dc.w $0000,$0004
            dc.w $0390,$000a
            dc.w $8107
            dc.w $8106
            dc.w $810b
            dc.w $810a
            dc.w $8109
            dc.w $8108
            dc.w $82c1
            dc.w $82b0
            dc.w $0190,$0038
            dc.w $0000,$0004
            dc.w $0390,$0008
            dc.w $8103
            dc.w $8102
            dc.w $0110,$0007
            dc.w $82c1
            dc.w $82b0
            dc.w $0190,$0006
            dc.w $92d8
            dc.w $0190,$0030
            dc.w $0000,$0004
            dc.w $0390,$0007
            dc.w $8101
            dc.w $8110
            dc.w $849c
            dc.w $849b
            dc.w $848f
            dc.w $848e
            dc.w $84f1
            dc.w $84f0
            dc.w $84fe
            dc.w $84fd
            dc.w $8110
            dc.w $82b3
            dc.w $0190,$0019
            dc.w $92d4
            dc.w $0190,$001d
            dc.w $0000,$0004
            dc.w $0390,$0006
            dc.w $8113
            dc.w $8110
            dc.w $849d
            dc.w $8496
            dc.w $0500,$0003
            dc.w $899e
            dc.w $89a5
            dc.w $8500
            dc.w $84f6
            dc.w $84fc
            dc.w $82b5
            dc.w $92cf
            dc.w $0190,$0036
            dc.w $0000,$0004
            dc.w $0390,$0006
            dc.w $8115
            dc.w $8110
            dc.w $849e
            dc.w $8895
            dc.w $889b
            dc.w $88a0
            dc.w $8500
            dc.w $899f
            dc.w $89a6
            dc.w $89ab
            dc.w $8500
            dc.w $84fb
            dc.w $82b9
            dc.w $0190,$0037
            dc.w $0000,$0004
            dc.w $8ca9
            dc.w $0390,$0005
            dc.w $8119
            dc.w $8110
            dc.w $8487
            dc.w $8896
            dc.w $889c
            dc.w $88a1
            dc.w $899a
            dc.w $89a0
            dc.w $89a7
            dc.w $89ac
            dc.w $8500
            dc.w $84e1
            dc.w $82b8
            dc.w $82b0
            dc.w $92cf
            dc.w $8190
            dc.w $92f3
            dc.w $92dc
            dc.w $0190,$0032
            dc.w $0000,$0004
            dc.w $8cdd
            dc.w $8ca8
            dc.w $0390,$0004
            dc.w $8118
            dc.w $8110
            dc.w $8488
            dc.w $8897
            dc.w $889d
            dc.w $88a2
            dc.w $899b
            dc.w $89a1
            dc.w $89a8
            dc.w $89ad
            dc.w $89b1
            dc.w $84e0
            dc.w $82d1
            dc.w $82c0
            dc.w $92f3
            dc.w $92dc
            dc.w $92e2
            dc.w $92c8
            dc.w $92d8
            dc.w $0190,$000b
            dc.w $92d8
            dc.w $0190,$0025
            dc.w $0000,$0004
            dc.w $8ccb
            dc.w $8c99
            dc.w $8c9f
            dc.w $8ccd
            dc.w $0390,$0002
            dc.w $8111
            dc.w $8110
            dc.w $84a0
            dc.w $8898
            dc.w $8500
            dc.w $88a3
            dc.w $899c
            dc.w $89a2
            dc.w $8500
            dc.w $89ae
            dc.w $89b2
            dc.w $84c8
            dc.w $82f4
            dc.w $8290
            dc.w $92e2
            dc.w $92c8
            dc.w $0190,$0005
            dc.w $92d8
            dc.w $0190,$0006
            dc.w $92d5
            dc.w $0190,$0015
            dc.w $92d8
            dc.w $0190,$0010
            dc.w $82f0
            dc.w $0000,$0004
            dc.w $0390,$0002
            dc.w $8caf
            dc.w $8cdb
            dc.w $8cbd
            dc.w $8390
            dc.w $8158
            dc.w $8110
            dc.w $84a1
            dc.w $8899
            dc.w $8500
            dc.w $88a4
            dc.w $899d
            dc.w $89a3
            dc.w $89a9
            dc.w $89af
            dc.w $89b3
            dc.w $84c7
            dc.w $82f5
            dc.w $92cf
            dc.w $8190
            dc.w $82f0
            dc.w $8383
            dc.w $838b
            dc.w $838a
            dc.w $83c5
            dc.w $83cc
            dc.w $83cd
            dc.w $83ce
            dc.w $838e
            dc.w $838d
            dc.w $838c
            dc.w $838b
            dc.w $838a
            dc.w $83ca
            dc.w $83cb
            dc.w $83cc
            dc.w $838b
            dc.w $83cb
            dc.w $83c3
            dc.w $82b0
            dc.w $0190,$000a
            dc.w $92d4
            dc.w $0190,$0011
            dc.w $82f0
            dc.w $8387
            dc.w $8386
            dc.w $8385
            dc.w $8384
            dc.w $0000,$0004
            dc.w $0390,$0003
            dc.w $8cae
            dc.w $8c9d
            dc.w $8390
            dc.w $8159
            dc.w $8110
            dc.w $84bb
            dc.w $889a
            dc.w $889e
            dc.w $88a5
            dc.w $88a7
            dc.w $89a4
            dc.w $89aa
            dc.w $89b0
            dc.w $84cc
            dc.w $84cd
            dc.w $82f3
            dc.w $8190
            dc.w $82f0
            dc.w $8381
            dc.w $8cb7
            dc.w $8c94
            dc.w $0c80,$000b
            dc.w $8c92
            dc.w $8cd5
            dc.w $8ce5
            dc.w $8ca3
            dc.w $8390
            dc.w $83c1
            dc.w $82b0
            dc.w $0190,$0004
            dc.w $92df
            dc.w $0190,$0013
            dc.w $82f0
            dc.w $8383
            dc.w $8385
            dc.w $8384
            dc.w $0390,$0004
            dc.w $0000,$0004
            dc.w $0390,$0004
            dc.w $8c81
            dc.w $8390
            dc.w $8155
            dc.w $8110
            dc.w $84bc
            dc.w $84b6
            dc.w $889f
            dc.w $88a6
            dc.w $88a8
            dc.w $0500,$0002
            dc.w $84ca
            dc.w $84cb
            dc.w $82e1
            dc.w $8290
            dc.w $92c9
            dc.w $8393
            dc.w $8cc7
            dc.w $8cde
            dc.w $8ca5
            dc.w $8390
            dc.w $8fb7
            dc.w $8fb8
            dc.w $8fb9
            dc.w $8fc6
            dc.w $8fc7
            dc.w $8fc8
            dc.w $8fc9
            dc.w $8fda
            dc.w $8fdb
            dc.w $8fdc
            dc.w $8ca2
            dc.w $8cda
            dc.w $8cea
            dc.w $8c93
            dc.w $8c9f
            dc.w $8ccd
            dc.w $83c1
            dc.w $82b0
            dc.w $92c9
            dc.w $0190,$0015
            dc.w $82f0
            dc.w $8381
            dc.w $0390,$0007
            dc.w $0000,$0004
            dc.w $0390,$0004
            dc.w $8c81
            dc.w $8390
            dc.w $8153
            dc.w $0110,$0002
            dc.w $84bd
            dc.w $84be
            dc.w $84b0
            dc.w $84b1
            dc.w $84ce
            dc.w $84cf
            dc.w $84c9
            dc.w $82e1
            dc.w $8290
            dc.w $8190
            dc.w $82f0
            dc.w $8392
            dc.w $8c96
            dc.w $8ca6
            dc.w $8390
            dc.w $8fb3
            dc.w $8fb4
            dc.w $8fb5
            dc.w $8fb6
            dc.w $8fc3
            dc.w $8fc4
            dc.w $8fc5
            dc.w $8fd5
            dc.w $8fd6
            dc.w $8fd7
            dc.w $8fd8
            dc.w $8fd9
            dc.w $0390,$0003
            dc.w $8caf
            dc.w $8cdb
            dc.w $8cbd
            dc.w $83c2
            dc.w $83c3
            dc.w $82b0
            dc.w $0190,$0004
            dc.w $92d8
            dc.w $0190,$000f
            dc.w $8393
            dc.w $0390,$0008
            dc.w $0000,$0004
            dc.w $0390,$0004
            dc.w $8c97
            dc.w $8ca9
            dc.w $8390
            dc.w $8123
            dc.w $8122
            dc.w $0110,$0006
            dc.w $8161
            dc.w $83ff
            dc.w $82f0
            dc.w $8383
            dc.w $8382
            dc.w $8cac
            dc.w $8c9c
            dc.w $8fa5
            dc.w $8fa6
            dc.w $8fa7
            dc.w $8fb0
            dc.w $8fb1
            dc.w $8fb2
            dc.w $8fc0
            dc.w $8fc1
            dc.w $8fc2
            dc.w $8fd1
            dc.w $8fd2
            dc.w $8fd3
            dc.w $8fd4
            dc.w $8fe9
            dc.w $8fea
            dc.w $8feb
            dc.w $0390,$0002
            dc.w $8cae
            dc.w $8c9d
            dc.w $0390,$0002
            dc.w $83b3
            dc.w $8190
            dc.w $92f3
            dc.w $92dc
            dc.w $0190,$0004
            dc.w $92d4
            dc.w $0190,$000c
            dc.w $8395
            dc.w $0390,$0008
            dc.w $0000,$0004
            dc.w $0390,$0004
            dc.w $8cbb
            dc.w $8cdd
            dc.w $8ca8
            dc.w $0390,$0002
            dc.w $8123
            dc.w $8125
            dc.w $8124
            dc.w $8164
            dc.w $8165
            dc.w $8163
            dc.w $83d1
            dc.w $83b0
            dc.w $83f0
            dc.w $8cb0
            dc.w $8cab
            dc.w $8cd7
            dc.w $8cce
            dc.w $8fa2
            dc.w $8fa3
            dc.w $8fa4
            dc.w $8fa8
            dc.w $2390,$0007
            dc.w $8fd0
            dc.w $8fe5
            dc.w $8fe6
            dc.w $8fe7
            dc.w $8fe8
            dc.w $0390,$0003
            dc.w $8c97
            dc.w $8ca9
            dc.w $8390
            dc.w $83b2
            dc.w $82b0
            dc.w $92e2
            dc.w $92c8
            dc.w $0190,$0006
            dc.w $92d4
            dc.w $0190,$0009
            dc.w $82f0
            dc.w $8394
            dc.w $0390,$0008
            dc.w $0000,$0004
            dc.w $0390,$0005
            dc.w $8ccb
            dc.w $8c99
            dc.w $0c80,$0008
            dc.w $8c84
            dc.w $8c85
            dc.w $8c87
            dc.w $8c88
            dc.w $8c9a
            dc.w $8cbe
            dc.w $8f98
            dc.w $8fa0
            dc.w $8fa1
            dc.w $2390,$000a
            dc.w $8fe1
            dc.w $8fe2
            dc.w $8fe3
            dc.w $8fe4
            dc.w $8ffc
            dc.w $0390,$0002
            dc.w $8cbb
            dc.w $8cdd
            dc.w $8ca8
            dc.w $83d1
            dc.w $83b0
            dc.w $03d0,$0012
            dc.w $83f0
            dc.w $8cb0
            dc.w $0390,$0008
            dc.w $0000,$0004
            dc.w $0390,$0010
            dc.w $83b7
            dc.w $82d0
            dc.w $83d2
            dc.w $8390
            dc.w $8f95
            dc.w $8f96
            dc.w $8f97
            dc.w $2390,$000c
            dc.w $8fe0
            dc.w $8ff8
            dc.w $8ff9
            dc.w $8ffa
            dc.w $8ffb
            dc.w $0390,$0002
            dc.w $8ccb
            dc.w $8c99
            dc.w $8c84
            dc.w $8c85
            dc.w $0c86,$0012
            dc.w $8c87
            dc.w $8c88
            dc.w $8c80
            dc.w $8c9f
            dc.w $8ccd
            dc.w $0390,$0005
            dc.w $0000,$0004
            dc.w $0390,$0010
            dc.w $83f7
            dc.w $8190
            dc.w $83d3
            dc.w $8390
            dc.w $8f92
            dc.w $8f93
            dc.w $8f94
            dc.w $2390,$000d
            dc.w $8ff4
            dc.w $8ff5
            dc.w $8ff6
            dc.w $8ff7
            dc.w $0390,$0004
            dc.w $83f2
            dc.w $8290
            dc.w $0190,$0012
            dc.w $82f0
            dc.w $8394
            dc.w $8390
            dc.w $8caf
            dc.w $8cdb
            dc.w $8cbd
            dc.w $0390,$0004
            dc.w $0000,$0004
            dc.w $0390,$000f
            dc.w $83f4
            dc.w $8290
            dc.w $8190
            dc.w $82d0
            dc.w $83d2
            dc.w $8f90
            dc.w $8f91
            dc.w $2390,$000e
            dc.w $8ff0
            dc.w $8ff1
            dc.w $8ff2
            dc.w $8ff3
            dc.w $0390,$0004
            dc.w $83f3
            dc.w $0190,$0013
            dc.w $8397
            dc.w $0390,$0003
            dc.w $8cae
            dc.w $8c9d
            dc.w $0390,$0004
            dc.w $0000,$0004
            dc.w $0390,$000f
            dc.w $83f5
            dc.w $0190,$0003
            dc.w $83d6
            dc.w $8f82
            dc.w $8f83
            dc.w $2390,$000f
            dc.w $8f8a
            dc.w $8f8b
            dc.w $8f8c
            dc.w $0390,$0003
            dc.w $83e1
            dc.w $8290
            dc.w $0190,$0013
            dc.w $8396
            dc.w $0390,$0004
            dc.w $8c81
            dc.w $0390,$0004
            dc.w $0000,$0004
            dc.w $0390,$000f
            dc.w $83f6
            dc.w $0190,$0003
            dc.w $83de
            dc.w $8f80
            dc.w $8f81
            dc.w $2390,$000f
            dc.w $8f87
            dc.w $8f88
            dc.w $8f89
            dc.w $0390,$0002
            dc.w $83f4
            dc.w $8290
            dc.w $0190,$0014
            dc.w $8395
            dc.w $0390,$0004
            dc.w $8c81
            dc.w $0390,$0004
            dc.w $0000,$0004
            dc.w $0390,$000f
            dc.w $83fe
            dc.w $0190,$0003
            dc.w $83df
            dc.w $8f00
            dc.w $8f01
            dc.w $2390,$000f
            dc.w $8f07
            dc.w $8f08
            dc.w $8f09
            dc.w $0390,$0002
            dc.w $83f5
            dc.w $0190,$000a
            dc.w $92d4
            dc.w $0190,$0009
            dc.w $92d4
            dc.w $8399
            dc.w $0390,$0004
            dc.w $8c81
            dc.w $0390,$0004
            dc.w $0000,$0004
            dc.w $0390,$000f
            dc.w $83ff
            dc.w $0190,$0003
            dc.w $8397
            dc.w $8f02
            dc.w $8f03
            dc.w $2390,$000f
            dc.w $8f0a
            dc.w $8f0b
            dc.w $8f0c
            dc.w $0390,$0002
            dc.w $83f6
            dc.w $0190,$0014
            dc.w $82f0
            dc.w $8398
            dc.w $0390,$0004
            dc.w $8c81
            dc.w $0390,$0004
            dc.w $0000,$0004
            dc.w $0390,$000f
            dc.w $83b7
            dc.w $0190,$0003
            dc.w $8396
            dc.w $8f10
            dc.w $8f11
            dc.w $2390,$000e
            dc.w $8f70
            dc.w $8f71
            dc.w $8f72
            dc.w $8f73
            dc.w $0390,$0002
            dc.w $83f7
            dc.w $0190,$0014
            dc.w $839f
            dc.w $0390,$0005
            dc.w $8c97
            dc.w $8ca9
            dc.w $0390,$0003
            dc.w $0000,$0004
            dc.w $0390,$000f
            dc.w $83b6
            dc.w $0190,$0003
            dc.w $8395
            dc.w $8f12
            dc.w $8f13
            dc.w $8f14
            dc.w $2390,$000d
            dc.w $8f74
            dc.w $8f75
            dc.w $8f76
            dc.w $8f77
            dc.w $8390
            dc.w $83f4
            dc.w $8290
            dc.w $0190,$0014
            dc.w $839e
            dc.w $0390,$0005
            dc.w $8cbb
            dc.w $8cdd
            dc.w $8ca8
            dc.w $0390,$0002
            dc.w $0000,$0004
            dc.w $0390,$000f
            dc.w $83b2
            dc.w $82b0
            dc.w $8190
            dc.w $82f0
            dc.w $8394
            dc.w $8f15
            dc.w $8f16
            dc.w $8f17
            dc.w $2390,$000c
            dc.w $8f60
            dc.w $8f78
            dc.w $8f79
            dc.w $8f7a
            dc.w $8f7b
            dc.w $8390
            dc.w $83f5
            dc.w $0190,$0015
            dc.w $839d
            dc.w $0390,$0006
            dc.w $8ccb
            dc.w $8c99
            dc.w $8c9f
            dc.w $8ccd
            dc.w $0000,$0004
            dc.w $0390,$0010
            dc.w $83c2
            dc.w $83c3
            dc.w $8381
            dc.w $0390,$0002
            dc.w $8f18
            dc.w $8f20
            dc.w $8f21
            dc.w $2390,$000a
            dc.w $8f61
            dc.w $8f62
            dc.w $8f63
            dc.w $8f64
            dc.w $8f7c
            dc.w $0390,$0002
            dc.w $83bb
            dc.w $0190,$0015
            dc.w $839c
            dc.w $0390,$0008
            dc.w $8caf
            dc.w $8cdb
            dc.w $0000,$0004
            dc.w $0390,$0016
            dc.w $8f22
            dc.w $8f23
            dc.w $8f24
            dc.w $8f28
            dc.w $2390,$0007
            dc.w $8f50
            dc.w $8f65
            dc.w $8f66
            dc.w $8f67
            dc.w $8f68
            dc.w $0390,$0003
            dc.w $83ba
            dc.w $0190,$0015
            dc.w $839b
            dc.w $0390,$0009
            dc.w $8cae
            dc.w $0000,$0004
            dc.w $0390,$0006
            dc.w $8ca0
            dc.w $8cb5
            dc.w $8cc5
            dc.w $8c91
            dc.w $0c80,$0002
            dc.w $8c9f
            dc.w $8ccd
            dc.w $0390,$0008
            dc.w $8f25
            dc.w $8f26
            dc.w $8f27
            dc.w $8f30
            dc.w $8f31
            dc.w $8f32
            dc.w $8f40
            dc.w $8f41
            dc.w $8f42
            dc.w $8f51
            dc.w $8f52
            dc.w $8f53
            dc.w $8f54
            dc.w $8f69
            dc.w $8f6a
            dc.w $8f6b
            dc.w $0390,$0003
            dc.w $83b9
            dc.w $0190,$000f
            dc.w $92d8
            dc.w $0190,$0005
            dc.w $839a
            dc.w $0390,$000a
            dc.w $0000,$0004
            dc.w $8390
            dc.w $8cb7
            dc.w $8c94
            dc.w $0c80,$0003
            dc.w $8c90
            dc.w $8cba
            dc.w $8cca
            dc.w $8ca1
            dc.w $0390,$0002
            dc.w $8caf
            dc.w $8cdb
            dc.w $8cbd
            dc.w $0390,$0009
            dc.w $8f33
            dc.w $8f34
            dc.w $8f35
            dc.w $8f36
            dc.w $8f43
            dc.w $8f44
            dc.w $8f45
            dc.w $8f55
            dc.w $8f56
            dc.w $8f57
            dc.w $8f58
            dc.w $8f59
            dc.w $0390,$0005
            dc.w $83b8
            dc.w $82b0
            dc.w $0190,$0013
            dc.w $92c6
            dc.w $8399
            dc.w $0390,$000a
            dc.w $0000,$0004
            dc.w $8cc7
            dc.w $8cde
            dc.w $8ca5
            dc.w $0390,$000a
            dc.w $8cae
            dc.w $8c9d
            dc.w $0390,$000a
            dc.w $8f37
            dc.w $8f38
            dc.w $8f39
            dc.w $8f46
            dc.w $8f47
            dc.w $8f48
            dc.w $8f49
            dc.w $8f5a
            dc.w $8f5b
            dc.w $8f5c
            dc.w $0390,$0006
            dc.w $83d1
            dc.w $83c0
            dc.w $0190,$0012
            dc.w $92d4
            dc.w $82f0
            dc.w $8398
            dc.w $0390,$000a
            dc.w $0000,$0004
            dc.w $8c96
            dc.w $8ca6
            dc.w $0390,$000c
            dc.w $8c81
            dc.w $0390,$0011
            dc.w $8ca0
            dc.w $8cb5
            dc.w $8cc5
            dc.w $8c91
            dc.w $8c9f
            dc.w $8ccd
            dc.w $0390,$0003
            dc.w $83d1
            dc.w $83c0
            dc.w $0190,$0013
            dc.w $8393
            dc.w $0390,$000b
            dc.w $0000,$0004
            dc.w $8c9c
            dc.w $0390,$000d
            dc.w $8c81
            dc.w $0390,$000a
            dc.w $8cb7
            dc.w $8c94
            dc.w $0c80,$0005
            dc.w $8c90
            dc.w $8cba
            dc.w $8cca
            dc.w $8ca1
            dc.w $8caf
            dc.w $8cdb
            dc.w $8cbd
            dc.w $0390,$0002
            dc.w $83f8
            dc.w $8290
            dc.w $0190,$0012
            dc.w $82f0
            dc.w $8392
            dc.w $0390,$000b
            dc.w $0000,$0004
            dc.w $8cce
            dc.w $0390,$000d
            dc.w $8c81
            dc.w $0390,$0009
            dc.w $8cc7
            dc.w $8cde
            dc.w $8ca5
            dc.w $0390,$000a
            dc.w $8cae
            dc.w $8c9d
            dc.w $0390,$0002
            dc.w $83f9
            dc.w $0190,$0012
            dc.w $82f0
            dc.w $8381
            dc.w $0390,$000c
            dc.w $0000,$0004
            dc.w $0390,$000e
            dc.w $8c81
            dc.w $0390,$0009
            dc.w $8c96
            dc.w $8ca6
            dc.w $0390,$000c
            dc.w $8c81
            dc.w $0390,$0002
            dc.w $83fa
            dc.w $0190,$0011
            dc.w $82f0
            dc.w $8381
            dc.w $0390,$000d
            dc.w $0000,$0004
            dc.w $0390,$000e
            dc.w $8c81
            dc.w $0390,$0008
            dc.w $8cac
            dc.w $8c9c
            dc.w $0390,$000d
            dc.w $8c81
            dc.w $0390,$0002
            dc.w $83fb
            dc.w $0190,$0006
            dc.w $82f0
            dc.w $83e0
            dc.w $82b0
            dc.w $0190,$0006
            dc.w $82f0
            dc.w $8383
            dc.w $8382
            dc.w $0390,$000e
            dc.w $0000,$0004
            dc.w $0390,$000e
            dc.w $8c97
            dc.w $8ca9
            dc.w $0390,$0006
            dc.w $8cab
            dc.w $8cd7
            dc.w $8cce
            dc.w $0390,$000d
            dc.w $8c81
            dc.w $0390,$0002
            dc.w $83fc
            dc.w $8190
            dc.w $82f0
            dc.w $8383
            dc.w $838b
            dc.w $838a
            dc.w $8389
            dc.w $8388
            dc.w $83f1
            dc.w $83c4
            dc.w $83c5
            dc.w $83c3
            dc.w $82b0
            dc.w $82f0
            dc.w $8387
            dc.w $8386
            dc.w $8382
            dc.w $0390,$0010
            dc.w $0000,$009e
            dc.w $ffff

        ;==============================================
        ;Object
        loc_043204:
            dc.w $0312,$0000,$0000
            dc.w $0014,$0100,$00f0
            dc.w $0711,$0210,$0430
            dc.w $0402,$006c,$00cc
            dc.w $0402,$0078,$00f8
            dc.w $040a,$01a4,$01b8
            dc.w $040a,$01b8,$01e4
            dc.w $040a,$0178,$020c
            dc.w $040a,$0178,$0238
            dc.w $040a,$01b8,$023c
            dc.w $0402,$01ac,$02b8
            dc.w $0606,$01d0,$0200
            dc.w $ffff

        ;==============================================
        ;Backview Ground
        loc_04324e:
            dc.w $0000,$0000

        ;==============================================
        ;Backview River
        loc_043252:
            dc.w $0140,$0160
            dc.w $02c0,$0420
            dc.w $ffff

        ;==============================================
        ;Hole Locations
        loc_04325c:
            dc.w $00d8,$00e8
            dc.w $0110,$00c8
            dc.w $0110,$010e
            dc.w $00de,$00ff
            dc.w $00eb,$0123
            dc.w $0130,$00f0
            dc.w $0108,$00ef
            dc.w $00f0,$0107
        """
    )

    with ROM.open_zip("C:\\Users\\Brandon\\Desktop\\ntm-notes-website\\turfmast.original.zip", tk_root) as rom:
        
        hole.find_in(rom.program_rom)
        hole_bytes = hole.to_bytes()

        print(hex(hole.base_pointer))
        print(hex(hole.base_location))
        print(hex(hole.tile_map_location))

        length = len(hole_bytes)

        rom_bytes = rom.program_rom[hole.base_pointer:hole.base_pointer+length]

        print("---")
        print(_hex(hole_bytes))
        print("---")
        print(_hex(rom_bytes))
        print("---")

        # pyperclip.copy(_hex(hole_bytes))
        # messagebox.showinfo("Title", "Your message here")
        # pyperclip.copy(_hex(rom_bytes))

        print(len(hole_bytes), len(rom.program_rom), len(rom_bytes))
        assert hole_bytes == rom_bytes

        assert hole_bytes in rom.program_rom

        pass

    print("Hole working")


if __name__ == "__main__":
    test()