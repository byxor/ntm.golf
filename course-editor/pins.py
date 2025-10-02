import struct

from dataclasses import dataclass, field
from typing import List


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


# TODO: use this instead of a List[PinPosition]
@dataclass
class PinMap:
    pins: List[PinPosition]

    @classmethod
    def from_bytes(cls, data: bytes) -> 'PinMap':
        """Deserialize 32 bytes (8 PinPositions) into a PinMap"""

        pins = [
            PinPosition.from_bytes(data[0:4]),
            PinPosition.from_bytes(data[4:8]),
            PinPosition.from_bytes(data[8:12]),
            PinPosition.from_bytes(data[12:16]),
            PinPosition.from_bytes(data[16:20]),
            PinPosition.from_bytes(data[20:24]),
            PinPosition.from_bytes(data[24:28]),
            PinPosition.from_bytes(data[28:32]),
        ]

        return PinMap(pins)

    def __iter__(self):
        return self.pins.__iter__()

    def __getitem__(self, item):
        return self.pins[item]

    def __len__(self):
        return len(self.pins)

    def to_bytes(self) -> bytes:
        result = bytes()
        for pin in self.pins:
            result += pin.to_bytes()
        return result

# ---------------------------------------------------------------

def test():
    input_bytes = bytes([
        0xd8, 0x00, 0xe8, 0x00,
        0x10, 0x01, 0xc8, 0x00,
        0x10, 0x01, 0x0e, 0x01,
        0xde, 0x00, 0xff, 0x00,
        0xeb, 0x00, 0x23, 0x01,
        0x30, 0x01, 0xf0, 0x00,
        0x08, 0x01, 0xef, 0x00,
        0xf0, 0x00, 0x07, 0x01,
    ])

    pin_map = PinMap.from_bytes(input_bytes)

    output_bytes = pin_map.to_bytes()

    assert input_bytes == output_bytes

    print("PinMap working")


if __name__ == "__main__":
    test()