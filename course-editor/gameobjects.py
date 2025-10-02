import struct

from dataclasses import dataclass, field
from typing import List, Optional


class GameObjectId():

    MAP_BOUNDARY = 0x0203

    GREEN = 0x0400
    GREEN_2 = 0x1400
    GREEN_3 = 0x1c00

    TEE_GROUND = 0x1107
    TEE_GROUND_2 = 0x0107 # not sure what the distinction is...
    TEE_GROUND_3 = 0x1907



    SOME_KIND_OF_HILL = 0x0606

    CONIFER_TREE = 0x0205
    PALM_TREE = 0x020a
    LARGE_CONIFER_TREE = 0x020c

    WATER_ROCK = 0x060b

    FAIRWAY_BUNKER = 0x0401
    ROUGH_BUNKER = 0x1401


@dataclass
class GameObject:
    id_: int
    x: int
    y: int

    @staticmethod
    def from_bytes(data: bytes) -> 'GameObject':
        if len(data) != 6:
            raise ValueError("Expected exactly 6 bytes for a GameObject")

        obj_id_int = struct.unpack('>H', data[0:2])[0]

        x = struct.unpack('<H', data[2:4])[0]
        y = struct.unpack('<H', data[4:6])[0]

        return GameObject(id_=obj_id_int, x=x, y=y)

    def to_bytes(self) -> bytes:
        return (
            struct.pack('>H', self.id_) +
            struct.pack('<H', self.x) +
            struct.pack('<H', self.y)
        )


@dataclass
class ObjectMap:
    objects: List[GameObject]

    @classmethod
    def from_bytes(cls, data: bytes) -> 'ObjectMap':
        game_objects = []

        index = 0
        while index < len(data) - 2:
            if data[index] == 0xFF and data[index+1] == 0xFF:
                break
            game_object = GameObject.from_bytes(data[index:index+6])
            game_objects.append(game_object)
            index += 6

        return ObjectMap(game_objects)

    def to_bytes(self) -> bytes:
        result = bytes()
        for game_object in self.objects:
            result += game_object.to_bytes()
        result += bytes([0xFF, 0xFF])
        return result

    def find(self, object_id: int) -> Optional[GameObject]:
        for object_ in self:
            if object_.id_ == object_id:
                return object_
        return None

    def __iter__(self):
        return self.objects.__iter__()

    def __getitem__(self, item):
        return self.objects[item]

    def __len__(self):
        return len(self.objects)


# --------------------------------------------------------------------


def test():

    input_bytes = bytes(bytearray.fromhex("020300000000000401401001110107003008010401018001a0014010040210010160043c001004010005300502007008050200c8009c050201d400f8050200a00110050200a00148050200980198050200ec0198050200bc01d0050200f801d00502020001f4050200bc0208050201fc022c050200ec0240050200bc0278050200b40324050201f40334050200b0036c050200a003a4050200880408050201dc043c050200880440050200a004c0050200a004f80502018805d405020184060c050200b00640050200a006780502018c06840502019806bc050200ec0720050200980728050201a0073405020188076c050200ec0778050200ec07b00502017c07c40d0602000670ffff"))
    
    object_map = ObjectMap.from_bytes(input_bytes)

    output_bytes = object_map.to_bytes()

    print("ObjectMap working")


if __name__ == "__main__":
    test()