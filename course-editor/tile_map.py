from dataclasses import dataclass, field
from typing import List

import struct

from tiles import Tile


@dataclass
class TileMap:
    _width: int = None
    _height: int = None
    _area: int = None
    _tiles: List[int] = field(default_factory=lambda: [])
    _capacity: int = 0

    @classmethod
    def from_disassembly(cls, disassembly: str) -> 'tile_map':
        lines = disassembly.split("\n")

        lines = [line.strip() for line in lines]
        lines = [line for line in lines if line]
        lines = [line.replace(",", "").replace("$", "").replace("dc.w ", "") for line in lines]

        cramped_hex = "".join(lines)

        endian_swapped_hex = ' '.join(cramped_hex[i+2:i+4] + cramped_hex[i:i+2] for i in range(0, len(cramped_hex) - 3, 4))

        result = endian_swapped_hex

        return cls.from_hex(result)

    @classmethod
    def from_hex(cls, hex_str: str) -> 'tile_map':
        # print("Reading hex data:\n", hex_str, sep='')
        data = bytes.fromhex(hex_str.strip().replace('\n', ' ').replace('\r', '').replace('\t', ''))
        return cls.from_bytes(data)

    @classmethod
    def from_bytes(cls, data: bytes) -> 'tile_map':
        index = 0

        capacity = len(data)

        def read_short_little_endian():
            nonlocal index
            short = struct.unpack_from('<H', data, index)[0]
            # print(f"LE short at index {index}: {short}")
            index += 2
            return short

        def read_short_big_endian():
            nonlocal index
            short = struct.unpack_from('>H', data, index)[0]
            # print(f"BE short at index {index}: {short}")
            index += 2
            return short

        width = read_short_little_endian()
        height = read_short_little_endian()
        area = width * height

        tiles = []
        
        while True:
            if index + 2 > len(data):
                break
            
            tile = -1
            repetitions = -1

            first = read_short_little_endian()

            if first == 0xFFFF:
                break

            is_single_tile = first > 0x8000
            if is_single_tile:
                tile = first
                repetitions = 1
            else:
                tile = first
                repetitions = read_short_little_endian()

            tiles.extend([tile] * repetitions)

            # p1 = f"[{hex(tile)}]"
            # if repetitions > 1:
            #     message = f"{p1:>8}    x    {hex(repetitions)} ({repetitions})"
            # else:
            #     message = f"{p1:>8}"
            # print(message)

        # assert: number of tiles = width * height ?
        # assert: len(tiles) = width ?
        # assert: len(col) = height for col in tiles ?

        return TileMap(width, height, area, tiles, capacity)

    @property
    def width(self) -> int:
        return self._width

    @property
    def height(self) -> int:
        return self._height

    @property
    def area(self) -> int:
        return self._width * self._height

    @property
    def capacity(self) -> int:
        return self._capacity

    @property
    def tiles(self) -> List[int]:
        return self._tiles

    @tiles.setter
    def tiles(self, tiles: List[int]) -> None:
        self._tiles = tiles

    def get_tile_at(self, x: int, y: int) -> int:
        return self._tiles[self._tile_index(x, y)]

    def set_tile_at(self, x: int, y: int, tile: int):
        self._tiles[self._tile_index(x, y)] = tile

    def get_tiles_between(self, x1: int, y1: int, x2: int, y2: int) -> List[int]:
        """
        :param x1: top-left X
        :param y1: top-left Y
        :param x2: bottom-right X (inclusive)
        :param y2: bottom-right Y (inclusive)
        :return: A 1D list of tile IDs (representing a rectangular chunk)
        """
        tiles = []
        for x in range(x1, x2 + 1):
            for y in range(y1, y2 + 1):
                tile = self.get_tile_at(x, y)
                tiles.append(tile)
        return tiles

    def set_tiles_between(self, x1: int, y1: int, x2: int, y2: int, tiles):
        """
        :param x1: top-left X
        :param y1: top-left Y
        :param x2: bottom-right X (inclusive)
        :param y2: bottom-right Y (inclusive)
        :param tiles: A single tile, or a 1D list of tiles (representing a rectangular chunk)
        """

        i = 0
        for x in range(x1, x2 + 1):
            for y in range(y1, y2 + 1):
                if isinstance(tiles, list):
                    tile = tiles[i]
                else:
                    tile = tiles
                if tile != Tile.TRANSPARENT.id_:
                    self.set_tile_at(x, y, tile)
                i += 1

    def to_bytes(self) -> bytes:
        data = bytearray()

        def write_short_little_endian(value):
            data.extend(struct.pack('<H', value))

        def write_short_big_endian(value):
            data.extend(struct.pack('>H', value))

        write_short_little_endian(self.width)
        write_short_little_endian(self.height)

        index = 0
        while index < len(self._tiles):
            tile = self._tiles[index]

            # Look ahead for duplicate tiles
            j = index + 1
            while j < len(self._tiles):
                future_tile = self._tiles[j]
                if future_tile == tile:
                    j += 1
                else:
                    break

            repetitions = j - index
            
            if repetitions == 1:
                write_short_little_endian(tile)
            else:
                write_short_little_endian(tile)
                write_short_little_endian(repetitions)

            index += repetitions

        write_short_little_endian(0xffff)

        return bytes(data)

    def _tile_index(self, x: int, y: int) -> int:
        return (x * self.height) + y

    def debug(self):
        print("width:", self.width)
        print("height:", self.height)
        print("area:", self.area)
        # self.show_image()
        # pyperclip.copy(self.to_bytes())

# ------------------------------------------------------------------

def test():
    input_bytes = bytes(bytearray.fromhex("2D 00 8E 00 00 00 1E 01 90 03 8A 00 00 00 04 00 90 03 8A 00 00 00 04 00 90 03 8A 00 00 00 04 00 90 03 8A 00 00 00 04 00 90 03 8A 00 00 00 04 00 90 03 8A 00 00 00 04 00 90 03 8A 00 00 00 04 00 90 03 39 00 0F 81 0E 81 0D 81 0C 81 0B 81 0A 81 09 81 08 81 71 01 03 00 48 81 49 81 4A 81 4B 81 4C 81 4D 81 4E 81 4F 81 90 03 3E 00 00 00 04 00 90 03 10 00 0F 81 0E 81 0D 81 0C 81 0B 81 0A 81 09 81 08 81 71 01 03 00 48 81 49 81 4A 81 4B 81 4C 81 4D 81 4E 81 4F 81 90 03 12 00 07 81 06 81 05 81 04 81 10 81 03 8B 2F 83 2E 83 2D 83 2C 83 2B 83 6B 83 6C 83 6D 83 6E 83 6F 83 41 8B 10 01 06 00 71 01 03 00 48 81 49 81 4A 81 4B 81 4C 81 4D 81 4E 81 4F 81 90 03 0F 00 07 81 06 81 05 81 09 81 08 81 71 01 03 00 48 81 49 81 4A 81 4B 81 4C 81 4D 81 4E 81 4F 81 90 03 14 00 00 00 04 00 90 03 0B 00 07 81 06 81 05 81 09 81 08 81 10 01 13 00 71 01 03 00 48 81 49 81 4A 81 4B 81 4C 81 4D 81 4E 81 4F 81 90 03 03 00 07 81 06 81 05 81 04 81 10 01 04 00 44 8B 00 0B 05 00 03 83 0B 83 0A 83 09 83 08 83 71 83 10 01 12 00 48 81 49 81 4A 81 4B 81 4C 81 4D 81 4E 81 4F 81 90 03 03 00 07 81 06 81 05 81 04 81 44 8B 2F 83 2E 83 2D 83 2C 83 2B 83 2A 83 29 83 28 83 10 01 03 00 03 8B 27 83 26 83 22 83 44 81 45 81 46 81 47 81 90 03 10 00 00 00 04 00 90 03 09 00 03 81 02 81 10 01 1C 00 03 8B 2F 83 2E 83 2D 83 2C 83 25 83 24 83 71 01 03 00 68 83 69 83 6A 83 6B 83 6C 83 6D 83 6E 83 6F 83 00 0B 04 00 03 83 02 83 10 01 04 00 07 80 06 80 05 80 04 80 71 00 03 00 48 80 49 80 4A 80 4B 80 4C 80 4D 80 4E 80 4F 80 10 01 0D 00 71 01 03 00 10 01 02 00 01 8B 22 8B 00 0B 09 00 63 8B 10 81 44 8B 00 0B 04 00 24 8B 10 01 03 00 44 81 45 81 46 81 47 81 90 03 0C 00 00 00 04 00 90 03 08 00 01 81 10 01 02 00 03 80 05 80 09 80 08 80 71 00 02 00 44 80 45 80 43 80 10 01 12 00 01 8B 00 0B 07 00 27 83 6E 83 6F 83 00 0B 08 00 07 83 06 83 05 83 04 83 10 01 02 00 07 80 06 80 05 80 04 80 10 00 0F 00 71 00 04 00 48 80 49 80 4A 80 4B 80 4C 80 4D 80 4E 80 4F 80 10 01 07 00 23 8B 00 0B 09 00 04 8B 01 8B 00 0B 06 00 27 83 26 83 2B 83 2A 83 29 83 28 83 31 83 42 81 43 81 90 03 0A 00 00 00 04 00 90 03 07 00 01 81 10 01 02 00 01 80 10 00 09 00 41 80 10 01 12 00 48 83 49 83 4A 83 4B 83 4C 83 4D 83 47 83 00 0B 05 00 07 83 06 83 0B 83 0A 83 09 83 08 83 10 01 02 00 07 80 06 80 05 80 04 80 10 00 10 00 90 8B 94 8B 96 8B 98 8B 10 00 0B 00 48 80 49 80 4A 80 4B 80 4C 80 4D 80 4E 80 4F 80 48 83 49 83 4A 83 4B 83 4C 83 4D 83 4E 83 4F 83 43 8B 10 01 02 00 44 83 45 83 46 83 47 83 00 0B 09 00 63 8B 10 81 41 81 90 03 03 00 B7 8C 94 8C 80 0C 04 00 00 00 04 00 90 03 06 00 13 81 10 01 02 00 13 80 10 80 1C 84 1B 84 01 84 00 84 68 84 67 84 6D 84 10 00 03 00 41 80 10 01 18 00 23 8B 07 83 06 83 05 83 04 83 10 01 04 00 07 80 06 80 05 80 04 80 10 00 14 00 91 8B 9F 8B DF 8B 99 8B 10 00 13 00 48 80 49 80 4A 80 4B 80 4C 80 4D 80 4E 80 4F 80 10 01 07 00 48 83 49 83 4A 83 4B 83 4C 83 4D 83 4E 83 4F 83 00 0B 02 00 63 8B 10 81 33 81 90 83 C7 8C DE 8C A5 8C 90 03 04 00 00 00 04 00 90 03 06 00 15 81 10 01 02 00 12 80 1D 84 16 84 00 05 05 00 6C 84 6B 84 10 00 03 00 42 80 4C 80 4D 80 4E 80 4F 80 10 81 0F 80 0E 80 0D 80 0C 80 0B 80 0A 80 09 80 08 80 71 00 03 00 48 80 49 80 4A 80 4B 80 4C 80 4D 80 4E 80 4F 80 10 01 04 00 07 80 06 80 05 80 04 80 10 00 18 00 92 8B BF 8B FF 8B 9A 8B 10 00 1B 00 71 00 04 00 48 80 49 80 4A 80 4B 80 4C 80 4D 80 4E 80 4F 80 10 01 03 00 64 8B 00 8B 43 8B 10 81 35 81 90 83 96 8C A6 8C 90 03 05 00 00 00 04 00 90 03 06 00 19 81 10 81 17 80 10 80 1E 84 00 05 07 00 6A 84 69 84 10 00 07 00 71 80 10 00 13 00 71 00 04 00 10 00 1C 00 93 8B 95 8B 97 8B 9B 8B 10 00 27 00 44 80 45 80 43 80 10 81 21 8B 10 01 02 00 34 81 90 83 81 8C 90 03 06 00 00 00 04 00 90 03 06 00 18 81 10 81 16 80 10 80 07 84 00 05 08 00 6F 84 10 00 09 00 80 8B 84 8B 86 8B 8C 8B 10 00 5C 00 33 80 10 01 03 00 51 81 90 83 81 8C 90 03 06 00 00 00 04 00 90 03 06 00 11 81 10 81 15 80 10 80 08 84 00 05 08 00 6E 84 10 00 09 00 81 8B 9F 8B DF 8B 8D 8B 10 00 5C 00 32 80 10 01 03 00 74 81 90 83 81 8C 90 03 06 00 00 00 04 00 90 03 06 00 11 81 10 81 14 80 10 80 32 84 00 05 08 00 51 84 10 00 09 00 82 8B BF 8B FF 8B 8E 8B 10 00 17 00 90 8B 94 8B 96 8B 98 8B 10 00 1E 00 31 00 04 00 10 00 1F 00 61 80 10 01 03 00 75 81 90 83 81 8C 90 03 06 00 00 00 04 00 90 03 06 00 58 81 10 81 11 80 10 80 33 84 00 05 08 00 50 84 10 00 09 00 83 8B 85 8B 87 8B 8F 8B 10 00 17 00 91 8B 9F 8B DF 8B 99 8B 10 00 1A 00 64 80 65 80 66 80 67 80 10 01 04 00 2F 80 2E 80 2D 80 2C 80 2B 80 2A 80 29 80 28 80 10 00 14 00 64 80 65 80 63 80 10 01 04 00 76 81 90 83 81 8C 90 03 06 00 00 00 04 00 90 03 06 00 59 81 10 81 52 80 10 80 34 84 00 05 07 00 45 84 46 84 10 00 02 00 F3 8B F2 8B F1 8B F0 8B 10 00 1E 00 92 8B BF 8B FF 8B 9A 8B 10 00 16 00 64 80 65 80 66 80 67 80 10 01 0A 00 31 01 02 00 10 01 04 00 2F 80 2E 80 2D 80 2C 80 2B 80 2A 80 29 80 28 80 31 00 04 00 68 80 69 80 6A 80 6B 80 6C 80 6D 80 6E 80 6F 80 10 01 07 00 77 81 90 83 81 8C 90 03 06 00 00 00 04 00 90 03 06 00 55 81 10 81 53 80 10 80 35 84 36 84 00 05 05 00 43 84 44 84 10 00 03 00 F5 8B 9F 8B DF 8B F4 8B 10 00 1E 00 93 8B 95 8B 97 8B 9B 8B 10 00 0D 00 31 00 05 00 64 80 65 80 66 80 67 80 10 01 04 00 31 01 02 00 68 81 69 81 6A 81 6B 81 6C 81 6D 81 6E 81 6F 81 90 03 02 00 2F 81 2E 81 2D 81 2C 81 25 81 24 81 10 01 0A 00 03 8B 2F 83 2E 83 2D 83 2C 83 6C 83 6D 83 6E 83 6F 83 63 8B 10 01 04 00 61 81 90 03 02 00 81 8C 90 03 06 00 00 00 04 00 90 03 06 00 53 81 10 01 02 00 21 80 10 80 3D 84 3E 84 27 84 28 84 40 84 41 84 42 84 10 00 04 00 F7 8B BF 8B FF 8B F6 8B 10 00 27 00 68 80 69 80 6A 80 6B 80 6C 80 6D 80 6E 80 6F 80 10 01 09 00 64 81 65 81 66 81 67 81 90 03 12 00 27 81 26 81 25 81 24 81 10 01 05 00 01 8B 0F 83 0E 83 0D 83 0C 83 0B 83 0A 83 09 83 08 83 71 83 21 8B 10 01 02 00 62 81 63 81 90 03 03 00 81 8C 90 03 06 00 00 00 04 00 90 03 07 00 21 81 10 01 02 00 23 80 22 80 10 00 0A 00 FB 8B FA 8B F9 8B F8 8B 10 00 1F 00 68 80 69 80 6A 80 6B 80 6C 80 6D 80 6E 80 6F 80 10 01 0D 00 64 81 65 81 66 81 67 81 90 03 1A 00 2F 81 2E 81 2D 81 2C 81 2B 81 2A 81 29 81 28 81 31 01 02 00 68 81 69 81 6A 81 6B 81 6C 81 6D 81 6E 81 6F 81 90 03 05 00 81 8C 90 03 06 00 00 00 04 00 80 0C 03 00 9F 8C CD 8C 90 03 03 00 23 81 22 81 10 01 02 00 27 80 26 80 25 80 24 80 10 00 21 00 68 80 69 80 6A 80 6B 80 6C 80 6D 80 6E 80 6F 80 10 01 13 00 62 81 63 81 90 03 34 00 AC 8C 9C 8C 90 03 06 00 00 00 04 00 90 03 03 00 AF 8C DB 8C BD 8C 90 03 04 00 27 81 26 81 25 81 24 81 10 01 02 00 27 80 26 80 25 80 24 80 10 00 15 00 68 80 69 80 6A 80 6B 80 6C 80 6D 80 6E 80 6F 80 10 01 13 00 68 81 69 81 6A 81 6B 81 6C 81 6D 81 6E 81 6F 81 90 03 06 00 A0 8C B5 8C C5 8C 91 8C 80 0C 0D 00 92 8C D5 8C E5 8C A3 8C 90 03 1A 00 AB 8C D7 8C CE 8C 90 03 06 00 00 00 04 00 90 03 04 00 AE 8C 9D 8C 90 03 08 00 23 81 22 81 10 01 04 00 2F 80 2E 80 2D 80 2C 80 2B 80 2A 80 29 80 28 80 31 00 05 00 68 80 69 80 6A 80 6B 80 6C 80 6D 80 6E 80 6F 80 10 01 13 00 68 81 69 81 6A 81 6B 81 6C 81 6D 81 6E 81 6F 81 90 03 0A 00 A0 8C B5 8C C5 8C 91 8C 90 8C BA 8C CA 8C A1 8C 90 03 0D 00 A2 8C DA 8C EA 8C 93 8C 92 8C D5 8C E5 8C A3 8C 90 03 0B 00 A0 8C B5 8C C5 8C 91 8C 80 0C 07 00 9A 8C BE 8C 90 03 07 00 00 00 04 00 90 03 05 00 81 8C 90 03 0A 00 23 81 22 81 10 01 1F 00 31 01 03 00 68 81 69 81 6A 81 6B 81 6C 81 6D 81 6E 81 6F 81 90 03 0E 00 A0 8C B5 8C C5 8C 91 8C 90 8C BA 8C CA 8C A1 8C 90 03 15 00 A2 8C DA 8C EA 8C 93 8C 80 0C 0B 00 90 8C BA 8C CA 8C A1 8C 90 03 10 00 00 00 04 00 90 03 05 00 97 8C A9 8C 90 03 0B 00 27 81 26 81 25 81 24 81 10 01 13 00 68 81 69 81 6A 81 6B 81 6C 81 6D 81 6E 81 6F 81 90 03 15 00 A0 8C B5 8C C5 8C 91 8C 90 8C BA 8C CA 8C A1 8C 90 03 3C 00 00 00 04 00 90 03 05 00 BB 8C DD 8C A8 8C 90 03 0E 00 2F 81 2E 81 2D 81 2C 81 2B 81 2A 81 29 81 28 81 31 01 03 00 68 81 69 81 6A 81 6B 81 6C 81 6D 81 6E 81 6F 81 90 03 19 00 A0 8C B5 8C C5 8C 91 8C 90 8C BA 8C CA 8C A1 8C 90 03 40 00 00 00 04 00 90 03 06 00 CB 8C 99 8C 80 0C 09 00 92 8C D5 8C E5 8C A3 8C 90 03 21 00 A0 8C B5 8C C5 8C 91 8C 80 0C 08 00 90 8C BA 8C CA 8C A1 8C 90 03 44 00 00 00 04 00 90 03 11 00 A2 8C DA 8C EA 8C 93 8C 92 8C D5 8C E5 8C A3 8C 90 03 19 00 A0 8C B5 8C C5 8C 91 8C 90 8C BA 8C CA 8C A1 8C 90 03 50 00 00 00 04 00 90 03 15 00 A2 8C DA 8C EA 8C 93 8C 80 0C 19 00 90 8C BA 8C CA 8C A1 8C 90 03 54 00 00 00 04 00 90 03 8A 00 00 00 04 00 90 03 8A 00 00 00 04 00 90 03 8A 00 00 00 04 00 90 03 8A 00 00 00 04 00 90 03 8A 00 00 00 04 00 90 03 8A 00 00 00 04 00 90 03 8A 00 00 00 04 00 90 03 8A 00 00 00 1E 01 FF FF"))

    tile_map = TileMap.from_bytes(input_bytes)

    tile_map.debug()

    from renderer import render_tile_map_image
    render_tile_map_image(tile_map)

    output_bytes = tile_map.to_bytes()

    assert input_bytes == output_bytes

    print("TileMap working")


if __name__ == "__main__":
    test()
