from dataclasses import dataclass
from typing import Any


class ByteSequence:
    
    __data: bytearray

    def __init__(self, data: bytes = None):
        if data is None:
            data = []
        self.__data = bytearray(data)

    def read_ui8_be(self, index: int) -> int:
        return self.__data[index]

    def read_ui8_le(self, index: int) -> int:
        return self.__data[index]

    def read_ui16_be(self, index: int) -> int:
        return (self.__data[index] << 8) | self.__data[index + 1]

    def read_ui16_le(self, index: int) -> int:
        return self.__data[index] | (self.__data[index + 1] << 8)

    def read_ui32_be(self, index: int) -> int:
        return (
            (self.__data[index] << 24)
            | (self.__data[index + 1] << 16)
            | (self.__data[index + 2] << 8)
            | self.__data[index + 3]
        )

    def read_ui32_le(self, index: int) -> int:
        return (
            self.__data[index]
            | (self.__data[index + 1] << 8)
            | (self.__data[index + 2] << 16)
            | (self.__data[index + 3] << 24)
        )

    def write_ui8_be(self, index: int, value: int):
        self.__data[index] = value & 0xFF

    def write_ui8_le(self, index: int, value: int):
        self.__data[index] = value & 0xFF

    def write_ui16_be(self, index: int, value: int):
        self.__data[index] = (value >> 8) & 0xFF
        self.__data[index + 1] = value & 0xFF

    def write_ui16_le(self, index: int, value: int):
        self.__data[index] = value & 0xFF
        self.__data[index + 1] = (value >> 8) & 0xFF

    def write_ui32_be(self, index: int, value: int):
        self.__data[index] = (value >> 24) & 0xFF
        self.__data[index + 1] = (value >> 16) & 0xFF
        self.__data[index + 2] = (value >> 8) & 0xFF
        self.__data[index + 3] = value & 0xFF

    def write_ui32_le(self, index: int, value: int):
        self.__data[index] = value & 0xFF
        self.__data[index + 1] = (value >> 8) & 0xFF
        self.__data[index + 2] = (value >> 16) & 0xFF
        self.__data[index + 3] = (value >> 24) & 0xFF

    def append_ui8_be(self, value: int):
        index = len(self.__data)
        self.__grow_by(1)
        self.write_ui8_be(index, value)

    def append_ui8_le(self, value: int):
        index = len(self.__data)
        self.__grow_by(1)
        self.write_ui8_le(index, value)

    def append_ui16_be(self, value: int):
        index = len(self.__data)
        self.__grow_by(2)
        self.write_ui16_be(index, value)

    def append_ui16_le(self, value: int):
        index = len(self.__data)
        self.__grow_by(2)
        self.write_ui16_le(index, value)

    def append_ui32_be(self, value: int):
        index = len(self.__data)
        self.__grow_by(4)
        self.write_ui32_be(index, value)

    def append_ui32_le(self, value: int):
        # print("before", self.__data)
        # print(" (append)", value)
        index = len(self.__data)
        self.__grow_by(4)
        self.write_ui32_le(index, value)
        # print("after", self.__data)

    def append_bytes(self, data: bytes):
        self.__data.extend(data)

    def find(self, pattern: bytes) -> int:
        return self.__data.find(pattern)

    def rfind(self, pattern: bytes) -> int:
        return self.__data.rfind(pattern)

    def __grow_by(self, n: int):
        self.__data.extend([0] * n)

    def __getitem__(self, key):
        return self.__data[key]

    def __setitem__(self, key, value):
        self.__data[key] = value

    def __contains__(self, item):
        return self.find(item) != -1

    def __len__(self):
        return len(self.__data)

    def overwrite_bytes_at_index(self, index: int, new_bytes: bytes) -> bytes:
        if index < 0 or index + len(new_bytes) > len(self.__data):
            raise IndexError("Replacement would go out of bounds")

        print("--------------------------")
        print(f"Overwriting bytes at index {index}")
        message = _hex(self.__data[index:index + len(new_bytes)]) + "\n" + _hex(new_bytes)
        # import pyperclip
        # pyperclip.copy(message)
        print(message)

        self.__data[index:index + len(new_bytes)] = new_bytes

    def as_bytes(self):
        return bytes(self.__data)


@dataclass
class Pointer:
    object: Any = None
    address: int = 0
    __initial_data: bytes = b""

    @property
    def capacity(self) -> int:
        return len(self.__initial_data)

    # def write_to(self, data: ):

def _hex(data):
    return ' '.join(f'{b:02x}' for b in data)