import random
import win32clipboard

from io import BytesIO
from models import *
from tiles import Tile

def render_tile_map_image(tile_map):
    def to_image():
        palette = {tile: (random.randint(0,100), random.randint(0,100), random.randint(0,100)) for tile in set(tile_map._tiles)}

        for tile_id, tile in Tile.glossary().items():
            palette[tile_id] = tile.palette

        image = Image.new('RGB', (tile_map.height, tile_map.width))
        image.putdata([palette[tile] for tile in tile_map._tiles])
        temp = image.transpose(Image.ROTATE_270)
        scale = 10
        return temp.resize((image.height * scale, image.width * scale), Image.NEAREST).transpose(Image.FLIP_LEFT_RIGHT)

    image = to_image()

    def copy_image_to_clipboard(img: Image.Image):
        output = BytesIO()
        img.convert("RGB").save(output, "BMP")
        data = output.getvalue()[14:]  # Strip BMP header
        output.close()

        win32clipboard.OpenClipboard()
        win32clipboard.EmptyClipboard()
        win32clipboard.SetClipboardData(win32clipboard.CF_DIB, data)
        win32clipboard.CloseClipboard()

    copy_image_to_clipboard(image)
    # image.show()


# TODO: def hole_to_image(hole) -> 'Image'