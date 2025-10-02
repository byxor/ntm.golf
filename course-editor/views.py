from dataclasses import dataclass

@dataclass
class GroundView:
    # TODO: properly deserialize/serialize.

    __data: bytes

    @classmethod
    def from_bytes(cls, data):
        return GroundView(data)

    def to_bytes(self):
        return self.__data

@dataclass
class RiverView:
    # TODO: properly deserialize/serialize.

    __data: bytes

    @classmethod
    def from_bytes(cls, data):
        return GroundView(data)

    def to_bytes(self):
        return self.__data