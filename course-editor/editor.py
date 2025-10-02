import copy
from dataclasses import dataclass
from tkinter import Tk, messagebox

from course_data import DEFAULT_COURSES, SCOTLAND_12, SCOTLAND_8
from courses import Courses
from gameobjects import GameObjectId, GameObject, ObjectMap
from gui import gui_context
from hole import Hole
from pins import PinMap
from rom import ROM
from tiles import Tile
from renderer import render_tile_map_image
from views import GroundView


@dataclass
class Context:
    version: str = "v0.0.0"

    tk_root: Tk = None
    rom: ROM = None

    courses: Courses = None

def main():
    context = Context()

    with gui_context() as tk_root:
        context.tk_root = tk_root
        with ROM.open_zip("turfmast.original.zip", tk_root) as rom:
            context.rom = rom
            run(context)


def run(context: Context):
    # Load courses
    load_courses(context)

    # Make some edits
    # _hack_make_training_course(context)
    edit_courses(context)
    edit_courses_backwards(context)

    # Write the output
    context.rom.write_zip("C:/Users/Brandon/Documents/Fightcade/emulator/fbneo/ROMs/turfmast.zip")
    beep()

def load_courses(context: Context):
    context.courses = copy.deepcopy(DEFAULT_COURSES)
    context.courses.find_in(context.rom.program_rom)

"""This just exists to give me some savestates with unibios at various distances in a straight line to the pin"""
def _hack_make_training_course(context: Context):
    # Germany 1
    course = context.courses.germany
    hole = course.hole(1)
    tile_map = hole.tile_map
    object_map = hole.object_map
    pin_map = hole.pin_map

    # Extend Fairway
    for y in range(23, 123):
        tile_map.set_tile_at(17, y, Tile.FAIRWAY.id_)

    for y in range(23, 127):
        tile_map.set_tile_at(16, y, Tile.FAIRWAY.id_)

    for y in range(23, 127):
        tile_map.set_tile_at(18, y, Tile.FAIRWAY.id_)

    for y in range(23, 127):
        tile_map.set_tile_at(19, y, Tile.FAIRWAY.id_)

    for y in range(23, 127):
        tile_map.set_tile_at(20, y, Tile.FAIRWAY.id_)

    for y in range(22, 65):
        tile_map.set_tile_at(21, y, Tile.FAIRWAY.id_)

    for y in range(22, 65):
        tile_map.set_tile_at(22, y, Tile.FAIRWAY.id_)

    for y in range(22, 65):
        tile_map.set_tile_at(23, y, Tile.FAIRWAY.id_)

    for x in range(23, 27):
        for y in range(23, 28):
            tile_map.set_tile_at(x, y, Tile.FAIRWAY.id_)

    for y in range(21, 96):
        tile_map.set_tile_at(15, y, Tile.FAIRWAY.id_)
        tile_map.set_tile_at(14, y, Tile.FAIRWAY.id_)

    for y in range(22, 105):
        tile_map.set_tile_at(21, y, Tile.FAIRWAY.id_)
        # tile_map.set_tile_at(13, y, Tile.FAIRWAY.id_)

    # Remove trees and bunkers from objects
    object_map.objects = [
        object
        for object in object_map
        if object.id_ != GameObjectId.CONIFER_TREE
           and object.id_ != GameObjectId.FAIRWAY_BUNKER
    ]

    # for object in object_map:
    #     if object.id_ == GameObjectId.GREEN:
    #
    #         beep()

    # Move pins to X middle green

    # Align tee ground with pins

    tee_ground_index = 0
    for object in object_map:
        if object.id_ == GameObjectId.TEE_GROUND:
            tee_ground_x = object.x
            break
        tee_ground_index += 1
    else:
        tee_ground_index = -1

    print("\n".join(str(pin) for pin in pin_map))



    green_index = 0
    for object in object_map:
        if object.id_ == GameObjectId.GREEN:
            green_x = object.x
            break
        green_index += 1
    else:
        green_index = -1

    green_x = object_map[green_index].x
    green_y = object_map[green_index].y

    pin_type = "front_of_green"
    for i in range(0, len(pin_map)):
        pin_map[i].x = green_x
        if pin_type == "back_of_green":
            pin_map[i].y = green_y - 50 - 10
        elif pin_type == "front_of_green":
            pin_map[i].y = green_y + 50 + 10

    object_map.objects[tee_ground_index].x = green_x
    # object_map.objects[tee_ground_index].y = 0

    render_tile_map_image(tile_map)

    write_hole_to_program_rom(context, hole)

def edit_courses_par3_only():
    pass

"""This is another fun hack. Doing USA backwards (ASU course),"""
def edit_courses_backwards(context: Context):
    is_tee = lambda object: object.id_ in [GameObjectId.TEE_GROUND, GameObjectId.TEE_GROUND_2, GameObjectId.TEE_GROUND_3]
    is_green = lambda object: object.id_ in [GameObjectId.GREEN, GameObjectId.GREEN_2, GameObjectId.GREEN_3]

    def _move_tee_to_green(object_map: ObjectMap, tee_offset: (int, int)):
        tee_object_id = None
        tee_object_copy = None

        green_object_id = None
        green_object_copy = None

        tee_offset_x, tee_offset_y = tee_offset

        for i in range(len(object_map)):
            object = object_map[i]
            if is_tee(object):
                tee_object_id = i
                tee_object_copy = copy.deepcopy(object)
            elif is_green(object):
                green_object_id = i
                green_object_copy = copy.deepcopy(object)

        if tee_object_id == None:
            print("TEE NOT FOUND")
        if green_object_id == None:
            print("GREEN NOT FOUND")

        object_map[tee_object_id].x = green_object_copy.x + tee_offset_x
        object_map[tee_object_id].y = green_object_copy.y + tee_offset_y


    def _flip_tee_and_green(object_map: ObjectMap, pin_map: PinMap, pin_offset: (int, int) = (0, 0), tee_offset: (int, int) = (0, 0)):
        tee_object_id = None
        tee_object_copy = None

        green_object_id = None
        green_object_copy = None

        pin_offset_x, pin_offset_y = pin_offset
        tee_offset_x, tee_offset_y = tee_offset

        for i in range(len(object_map)):
            object = object_map[i]
            if is_tee(object):
                tee_object_id = i
                tee_object_copy = copy.deepcopy(object)
            elif is_green(object):
                green_object_id = i
                green_object_copy = copy.deepcopy(object)

        if tee_object_id == None:
            print("TEE NOT FOUND")
        if green_object_id == None:
            print("GREEN NOT FOUND")

        object_map[tee_object_id].x = green_object_copy.x + tee_offset_x
        object_map[tee_object_id].y = green_object_copy.y + tee_offset_y

        object_map[green_object_id].x = tee_object_copy.x + pin_offset_x
        object_map[green_object_id].y = tee_object_copy.y + pin_offset_y

        for pin in pin_map:
            pin.x = tee_object_copy.x + pin_offset_x
            pin.y = tee_object_copy.y + pin_offset_y

    def _usa_1():
        course = context.courses.usa
        hole = course.hole(1)
        tile_map = hole.tile_map
        object_map = hole.object_map
        pin_map = hole.pin_map
        tile_map.set_tiles_between(24, 2, 43, 6, Tile.OOB.id_)
        _flip_tee_and_green(object_map, pin_map, (-10, -150))
        tile_map.set_tile_at(22, 129, Tile.GREEN_FRINGE_1.id_)
        render_tile_map_image(hole.tile_map)
        write_hole_to_program_rom(context, hole)

    def _usa_2():
        course = context.courses.usa
        hole = course.hole(2)
        tile_map = hole.tile_map
        object_map = hole.object_map
        pin_map = hole.pin_map
        tile_map.set_tiles_between(2, 2, 5, 36, Tile.OOB.id_)
        _flip_tee_and_green(object_map, pin_map, (6, 30))
        tile_map.set_tile_at(21, 135, Tile.GREEN_FRINGE_7.id_)
        tile_map.set_tile_at(20, 135, Tile.GREEN_FRINGE_7.id_)
        render_tile_map_image(hole.tile_map)
        write_hole_to_program_rom(context, hole)

    def _usa_3_fucked_up():
        course = context.courses.usa
        hole = course.hole(3)
        tile_map = hole.tile_map
        object_map = hole.object_map
        pin_map = hole.pin_map

        # _make_0y_hole(object_map, pin_map)

        # tile_map.set_tiles_between(2, 2, 37, 7, Tile.OOB.id_)
        # _flip_tee_and_green(object_map, pin_map, (0, -230), (0, 100))
        # tile_map.set_tile_at(20, 135, Tile.GREEN_FRINGE_7.id_)

        # # Left
        # tile_map.set_tiles_between(12, 14, 12, 21, Tile.FAIRWAY.id_)
        # tile_map.set_tiles_between(13, 13, 12, 22, Tile.FAIRWAY.id_)
        #
        # # Right
        # tile_map.set_tiles_between(21, 14, 21, 21, Tile.FAIRWAY.id_)
        # tile_map.set_tiles_between(20, 13, 20, 22, Tile.FAIRWAY.id_)
        # tile_map.set_tiles_between(19, 13, 19, 22, Tile.FAIRWAY.id_)
        #
        # # Bottom
        # tile_map.set_tiles_between(13, 22, 19, 22, Tile.FAIRWAY.id_)
        # tile_map.set_tiles_between(13, 21, 19, 21, Tile.FAIRWAY.id_)
        # tile_map.set_tiles_between(13, 20, 19, 20, Tile.FAIRWAY.id_)
        # tile_map.set_tiles_between(13, 19, 19, 19, Tile.FAIRWAY.id_)
        _move_tee_to_green(object_map, (0, -230))

        render_tile_map_image(hole.tile_map)
        write_hole_to_program_rom(context, hole)

    def _usa_4():
        course = context.courses.usa
        hole = course.hole(4)
        tile_map = hole.tile_map
        object_map = hole.object_map
        pin_map = hole.pin_map
        tile_map.set_tiles_between(42, 5, 43, 7, Tile.OOB.id_)
        _flip_tee_and_green(object_map, pin_map, (-9, 9))
        tile_map.set_tile_at(35, 186, Tile.GREEN_FRINGE_7.id_)
        render_tile_map_image(hole.tile_map)
        write_hole_to_program_rom(context, hole)

    def _usa_5():
        course = context.courses.usa
        hole = course.hole(5)
        tile_map = hole.tile_map
        object_map = hole.object_map
        pin_map = hole.pin_map
        tile_map.set_tiles_between(3, 2, 33, 7, Tile.OOB.id_)
        _flip_tee_and_green(object_map, pin_map, (-9, 9))
        tile_map.set_tile_at(43, 110, Tile.GREEN_FRINGE_6.id_)
        render_tile_map_image(hole.tile_map)
        write_hole_to_program_rom(context, hole)

    def _usa_6():
        course = context.courses.usa
        hole = course.hole(6)
        tile_map = hole.tile_map
        object_map = hole.object_map
        pin_map = hole.pin_map
        tile_map.set_tiles_between(32, 8, 47, 8, Tile.OOB.id_)
        _flip_tee_and_green(object_map, pin_map, (14, -82))
        # tile_map.set_tile_at(25, 128, Tile.ROUGH.id_)
        tile_map.set_tile_at(25, 129, tile_map.get_tile_at(35, 17))
        # tile_map.set_tiles_between(21, 132, 24, 132, Tile.FAIRWAY.id_)
        render_tile_map_image(hole.tile_map)
        write_hole_to_program_rom(context, hole)

    def _usa_7():
        course = context.courses.usa
        hole = course.hole(7)
        tile_map = hole.tile_map
        object_map = hole.object_map
        pin_map = hole.pin_map
        tile_map.set_tiles_between(3, 2, 39, 6, Tile.OOB.id_)
        _flip_tee_and_green(object_map, pin_map, (-46, -45))
        tile_map.set_tile_at(17, 108, Tile.GREEN_FRINGE_6.id_)
        render_tile_map_image(hole.tile_map)
        write_hole_to_program_rom(context, hole)

    def _usa_8_buggy_flag_render_because_of_hill():
        course = context.courses.usa
        hole = course.hole(8)
        tile_map = hole.tile_map
        object_map = hole.object_map
        pin_map = hole.pin_map
        tile_map.set_tiles_between(2, 21, 2, 21, Tile.OOB.id_)
        _flip_tee_and_green(object_map, pin_map, (-25, -35))
        tile_map.set_tile_at(32, 161, Tile.GREEN_FRINGE_1.id_)
        render_tile_map_image(hole.tile_map)
        write_hole_to_program_rom(context, hole)

    def _usa_9():
        course = context.courses.usa
        hole = course.hole(9)
        tile_map = hole.tile_map
        object_map = hole.object_map
        pin_map = hole.pin_map
        tile_map.set_tiles_between(3, 2, 48, 6, Tile.OOB.id_)
        _flip_tee_and_green(object_map, pin_map, (-15, -35))
        tile_map.set_tile_at(22, 82, Tile.GREEN_FRINGE_6.id_)
        render_tile_map_image(hole.tile_map)
        write_hole_to_program_rom(context, hole)

    def _usa_10():
        course = context.courses.usa
        hole = course.hole(10)
        tile_map = hole.tile_map
        object_map = hole.object_map
        pin_map = hole.pin_map
        tile_map.set_tiles_between(25, 2, 26, 9, Tile.OOB.id_)
        _flip_tee_and_green(object_map, pin_map, (9, 9))
        tile_map.set_tile_at(26, 103, Tile.GREEN_FRINGE_6.id_)
        render_tile_map_image(hole.tile_map)
        write_hole_to_program_rom(context, hole)

    def _usa_11():
        course = context.courses.usa
        hole = course.hole(11)
        tile_map = hole.tile_map
        object_map = hole.object_map
        pin_map = hole.pin_map
        tile_map.set_tiles_between(55, 2, 57, 10, Tile.OOB.id_)
        _flip_tee_and_green(object_map, pin_map, (5, 20))
        tile_map.set_tile_at(19, 169, Tile.GREEN_FRINGE_6.id_)
        render_tile_map_image(hole.tile_map)
        write_hole_to_program_rom(context, hole)

    def _usa_12_messed_up():
        course = context.courses.usa
        hole = course.hole(12)
        tile_map = hole.tile_map
        object_map = hole.object_map
        pin_map = hole.pin_map
        # tile_map.set_tiles_between(55, 2, 57, 10, Tile.OOB.id_)
        # _flip_tee_and_green(object_map, pin_map, (0, 0))
        # tile_map.set_tile_at(19, 169, Tile.GREEN_FRINGE_6.id_)

        _move_tee_to_green(object_map, (0, -240))

        render_tile_map_image(hole.tile_map)
        write_hole_to_program_rom(context, hole)

    def _usa_13():
        course = context.courses.usa
        hole = course.hole(13)
        tile_map = hole.tile_map
        object_map = hole.object_map
        pin_map = hole.pin_map
        tile_map.set_tiles_between(44, 2, 54, 12, Tile.OOB.id_)
        _flip_tee_and_green(object_map, pin_map, (8, 14))
        tile_map.set_tile_at(12, 129, Tile.GREEN_FRINGE_6.id_)
        render_tile_map_image(hole.tile_map)
        write_hole_to_program_rom(context, hole)

    def _usa_14():
        course = context.courses.usa
        hole = course.hole(14)
        tile_map = hole.tile_map
        object_map = hole.object_map
        pin_map = hole.pin_map
        tile_map.set_tiles_between(2, 2, 38, 6, Tile.OOB.id_)
        _flip_tee_and_green(object_map, pin_map, (12, 5))
        tile_map.set_tile_at(24, 115, Tile.GREEN_FRINGE_6.id_)
        render_tile_map_image(hole.tile_map)
        write_hole_to_program_rom(context, hole)

    def _usa_15():
        course = context.courses.usa
        hole = course.hole(15)
        tile_map = hole.tile_map
        object_map = hole.object_map
        pin_map = hole.pin_map
        tile_map.set_tiles_between(2, 2, 47, 6, Tile.WATER.id_)
        _flip_tee_and_green(object_map, pin_map, (-5, +5))#(12, 5))
        tile = tile_map.get_tile_at(20, 18) #Tile.GREEN_FRINGE_6.id_
        tile_map.set_tile_at(15, 71, tile)
        render_tile_map_image(hole.tile_map)
        write_hole_to_program_rom(context, hole)

    def _usa_16():
        course = context.courses.usa
        hole = course.hole(16)
        tile_map = hole.tile_map
        object_map = hole.object_map
        pin_map = hole.pin_map
        tile_map.set_tiles_between(2, 2, 39, 7, Tile.OOB.id_)
        _flip_tee_and_green(object_map, pin_map, (-5, +39))#(12, 5))
        tile_map.set_tile_at(19, 126, Tile.ROUGH_FAIRWAY_BOUNDARY_6.id_)
        tile_map.set_tile_at(19, 127, Tile.GREEN_FRINGE_6.id_)
        print(hole.unknown)
        # hole.unknown = 0 # trying to fix flag offset, doesnt work
        render_tile_map_image(hole.tile_map)
        write_hole_to_program_rom(context, hole)

    def _usa_17():
        course = context.courses.usa
        hole = course.hole(17)
        tile_map = hole.tile_map
        object_map = hole.object_map
        pin_map = hole.pin_map
        tile_map.set_tiles_between(2, 2, 54, 7, Tile.OOB.id_)
        _flip_tee_and_green(object_map, pin_map, (6, -2))#(12, 5))
        tile = tile_map.get_tile_at(16, 14) # Tile.GREEN_FRINGE_6.id_)
        tile_map.set_tile_at(39, 183,tile)
        render_tile_map_image(hole.tile_map)
        write_hole_to_program_rom(context, hole)

    def _usa_18():
        course = context.courses.usa
        hole = course.hole(18)
        tile_map = hole.tile_map
        object_map = hole.object_map
        pin_map = hole.pin_map
        tile_map.set_tiles_between(2, 2, 38, 6, Tile.OOB.id_)
        _flip_tee_and_green(object_map, pin_map, (25, -69))#(12, 5))
        tile = tile_map.get_tile_at(16, 18)
        tile_map.set_tile_at(14, 94, tile)
        render_tile_map_image(hole.tile_map)
        write_hole_to_program_rom(context, hole)

    def _aus_1():
        course = context.courses.australia
        hole = course.hole(1)
        tile_map = hole.tile_map
        object_map = hole.object_map
        pin_map = hole.pin_map
        tile_map.set_tiles_between(31, 2, 43, 8, Tile.OOB.id_)
        _flip_tee_and_green(object_map, pin_map, (0, 0))#(12, 5))
        # tile = tile_map.get_tile_at(16, 14) # Tile.GREEN_FRINGE_6.id_)
        tile_map.set_tile_at(18, 118, Tile.GREEN_FRINGE_7.id_)
        render_tile_map_image(hole.tile_map)
        write_hole_to_program_rom(context, hole)

    _usa_1()
    _usa_2()
    _usa_3_fucked_up()
    _usa_4()
    _usa_5()
    _usa_6()
    _usa_7()
    _usa_8_buggy_flag_render_because_of_hill()
    _usa_9()
    _usa_10()
    _usa_11()
    _usa_12_messed_up()
    _usa_13()
    _usa_14()
    _usa_15()
    _usa_16()
    _usa_17()
    _usa_18()

    _aus_1()
    # _aus_2()
    # _aus_3()
    # _aus_4()
    # _aus_5()
    # _aus_6()
    # _aus_7()
    # _aus_8()
    # _aus_9()
    # _aus_10()
    # _aus_11()
    # _aus_12()
    # _aus_13()
    # _aus_14()
    # _aus_15()
    # _aus_16()
    # _aus_17()
    # _aus_18()



def edit_courses(context: Context):
    # _hack_make_training_course(context)
    # return
    edit_germany_1(context)
    edit_germany_2(context)
    edit_germany_3(context)
    edit_germany_4(context)
    edit_germany_5(context)
    edit_germany_6(context)
    edit_germany_7(context)
    edit_germany_8(context)
    edit_germany_9(context)

    # render_tile_map(DEFAULT_COURSES.australia.hole(16).tile_map)

def edit_germany_1(context: Context):
    course = context.courses.germany
    hole = course.hole(1)
    tile_map = hole.tile_map
    object_map = hole.object_map

    # Simplify fairway/rough edges for extra space
    for y in range(29, 53):
        tile_map.set_tile_at(17, y, Tile.FAIRWAY.id_)
    for y in range(92, 96):
        tile_map.set_tile_at(20, y, Tile.FAIRWAY.id_)
    for y in range(88, 104):
        tile_map.set_tile_at(21, y, Tile.FAIRWAY.id_)
    fairway_rough_boundary = tile_map.get_tile_at(28, 32)
    for y in range(85,110):
        tile_map.set_tile_at(22, y, fairway_rough_boundary)

    # Put water hazard in front of green
    japan_3_tile_map = DEFAULT_COURSES.japan.hole(3).tile_map
    upper_water_hazard_1 = japan_3_tile_map.get_tile_at(20, 25)
    upper_water_hazard_2 = japan_3_tile_map.get_tile_at(21, 25)
    upper_water_hazard_3 = japan_3_tile_map.get_tile_at(22, 25)
    upper_water_hazard_4 = japan_3_tile_map.get_tile_at(23, 25)
    upper_water_hazard_5 = japan_3_tile_map.get_tile_at(24, 25)

    mid_water_hazard_1 = japan_3_tile_map.get_tile_at(22, 36)
    mid_water_hazard_2 = japan_3_tile_map.get_tile_at(23, 36)

    lower_water_hazard_1 = japan_3_tile_map.get_tile_at(20, 37)
    lower_water_hazard_2 = japan_3_tile_map.get_tile_at(21, 37)
    lower_water_hazard_3 = japan_3_tile_map.get_tile_at(22, 37)
    lower_water_hazard_4 = japan_3_tile_map.get_tile_at(23, 37)
    lower_water_hazard_5 = japan_3_tile_map.get_tile_at(24, 37)

    tile_map.set_tile_at(17, 22, upper_water_hazard_1)
    tile_map.set_tile_at(18, 22, upper_water_hazard_2)
    tile_map.set_tile_at(19, 22, upper_water_hazard_3)
    tile_map.set_tile_at(20, 22, upper_water_hazard_4)
    tile_map.set_tile_at(21, 22, upper_water_hazard_5)
    # tile_map.set_tile_at(22, 22, upper_water_hazard_1)
    # tile_map.set_tile_at(23, 22, upper_water_hazard_2)
    # tile_map.set_tile_at(24, 22, upper_water_hazard_3)
    # tile_map.set_tile_at(25, 22, upper_water_hazard_4)
    # tile_map.set_tile_at(26, 22, upper_water_hazard_5)

    tile_map.set_tile_at(17, 23, mid_water_hazard_1)
    tile_map.set_tile_at(18, 23, mid_water_hazard_2)
    tile_map.set_tile_at(19, 23, mid_water_hazard_1)
    tile_map.set_tile_at(20, 23, mid_water_hazard_2)
    tile_map.set_tile_at(21, 23, mid_water_hazard_1)
    # tile_map.set_tile_at(22, 23, lower_water_hazard_2)
    # tile_map.set_tile_at(23, 23, lower_water_hazard_1)
    # tile_map.set_tile_at(24, 23, lower_water_hazard_1)
    # tile_map.set_tile_at(25, 23, lower_water_hazard_2)
    # tile_map.set_tile_at(26, 23, lower_water_hazard_1)

    tile_map.set_tile_at(17, 24, lower_water_hazard_1)
    tile_map.set_tile_at(18, 24, lower_water_hazard_2)
    tile_map.set_tile_at(19, 24, lower_water_hazard_3)
    tile_map.set_tile_at(20, 24, lower_water_hazard_4)
    tile_map.set_tile_at(21, 24, lower_water_hazard_5)

    # Move trees around
    new_tree_position_index = 0
    new_tree_positions = [
        (233, 200),
        (266, 200),
        (300, 200),

        (300, 390),

        (390, 400),
        (420, 400),
        (410, 408),

        (345, 428),
        (255, 437),
    ]
    for object in object_map:
        if new_tree_position_index >= len(new_tree_positions):
            break
        if object.id_ == GameObjectId.CONIFER_TREE:
            old_pos = (object.x, object.y)

            new_tree_position = new_tree_positions[new_tree_position_index]

            object.x = new_tree_position[0]
            object.y = new_tree_position[1]

            new_pos = (object.x, object.y)
            print("Moving tree", old_pos, new_pos)

            if new_tree_position_index == 7 or new_tree_position_index == 8:
                print("Making tree giant!")
                object.id_ = GameObjectId.LARGE_CONIFER_TREE

            new_tree_position_index += 1

    unused_tree_positions = len(new_tree_positions[new_tree_position_index:])
    print(f"{unused_tree_positions} unused tree positions")

    foo = 0
    for object in object_map:
        if object.id_ == GameObjectId.CONIFER_TREE:
            if foo == 0:
                object.id_ = GameObjectId.LARGE_CONIFER_TREE
            foo = (foo + 1) % 3

    # Crashes...
    # hole.object_map.objects.insert(
    #     -1,
    #     GameObject(
    #         GameObjectId.CONIFER_TREE,
    #         200,
    #         800
    #     )
    # )



    objects = hole.object_map.objects
    pass


    # render_tile_map(japan_3_tile_map)
    # render_tile_map(tile_map)


    write_hole_to_program_rom(context, hole)

def edit_germany_2(context: Context):
    course = context.courses.germany
    hole = course.hole(2)
    tile_map = hole.tile_map
    object_map = hole.object_map

    # Delete some cartpath outside the map for space
    for x in range(2, 11):
        for y in range(2, 25):
            tile_map.set_tile_at(x, y, Tile.OOB.id_)

    # """flatten bottom hills on green"""
    # for x in range(15, 22):
    #     for y in range(14, 18):
    #         tile_map.set_tile_at(x, y, Tile.GREEN.id_)

    bubble_1 = tile_map.get_tile_at(17, 12)
    bubble_2 = tile_map.get_tile_at(18, 12)
    bubble_3 = tile_map.get_tile_at(19, 12)
    bubble_4 = tile_map.get_tile_at(17, 13)
    bubble_5 = tile_map.get_tile_at(18, 13)
    bubble_6 = tile_map.get_tile_at(19, 13)

    # tile_map.set_tile_at(15, 14, bubble_1)
    # tile_map.set_tile_at(16, 14, bubble_2)
    # tile_map.set_tile_at(17, 14, bubble_3)
    # tile_map.set_tile_at(15, 15, bubble_4)
    # tile_map.set_tile_at(16, 15, bubble_5)
    # tile_map.set_tile_at(17, 15, bubble_6)

    # tile_map.set_tile_at(19, 15, bubble_1)
    # tile_map.set_tile_at(20, 15, bubble_2)
    # tile_map.set_tile_at(21, 15, bubble_3)
    # tile_map.set_tile_at(19, 16, bubble_4)
    # tile_map.set_tile_at(20, 16, bubble_5)
    # tile_map.set_tile_at(21, 16, bubble_6)

    tile_map.set_tile_at(17, 15, bubble_1)
    tile_map.set_tile_at(18, 15, bubble_2)
    tile_map.set_tile_at(19, 15, bubble_3)
    tile_map.set_tile_at(17, 16, bubble_4)
    tile_map.set_tile_at(18, 16, bubble_5)
    tile_map.set_tile_at(19, 16, bubble_6)

    # tile_map.set_tile_at(16, 17, bubble_1)
    # tile_map.set_tile_at(17, 17, bubble_2)
    # tile_map.set_tile_at(18, 17, bubble_3)
    # tile_map.set_tile_at(16, 18, bubble_4)
    # tile_map.set_tile_at(17, 18, bubble_5)
    # tile_map.set_tile_at(18, 18, bubble_6)

    i = 0

    tempx = 0
    tempy = 0
    for object in object_map:
        if object.id_ == GameObjectId.CONIFER_TREE:
            if i == 5:
                object.x -= 98
                object.y += 20
                tempx = object.x
                tempy = object.y
            if i == 6:
                object.x = tempx - 40
                object.y = tempy + 100
            if i != 5 and id != 6: # accidentally wrote 'id' instead of 'i' but it's nice to have the extra large conifer
                object.id_ = GameObjectId.LARGE_CONIFER_TREE
            if i == 4:
                object.y += 25
            i += 1

    # consider putting a river after the tee (up to near the bunker)
    # can put cartpath on it if you want

    write_hole_to_program_rom(context, hole)

def edit_germany_3(context: Context):
    course = context.courses.germany
    hole = course.hole(3)
    tile_map = hole.tile_map
    object_map = hole.object_map

    # consider changing shape of map to make it longer and thinner (to put the tee further back)
    # or just put the tee further back... lol
    for object in object_map:
        if object.id_ == GameObjectId.TEE_GROUND:
            object.y += 140

    tree = 0
    tempx = 0
    tempy = 0
    for object in object_map:
        if object.id_ == GameObjectId.CONIFER_TREE:
            if tree != 0 and tree != 1 and tree != 8 and tree != 9:
                object.id_ = GameObjectId.LARGE_CONIFER_TREE
            if tree == 9:
                object.x -= 60
                tempx = object.x
                tempy = object.y
            tree += 1

    object_map.objects[5].id_ = GameObjectId.WATER_ROCK
    object_map.objects[5].x = tempx + 15
    object_map.objects[5].y = tempy - 30

    # Clear some cartpath to save space
    tile_map.set_tiles_between(27, 2, 36, 24, Tile.OOB.id_)

    # todo: Add rock to tilemap
    aus_3_tile_map = DEFAULT_COURSES.australia.hole(3).tile_map
    rock_chunk = aus_3_tile_map.get_tiles_between(15, 43, 23, 50)

    tile_map.set_tiles_between(14, 32, 14+8, 32+7, rock_chunk)

    render_tile_map_image(tile_map)
    write_hole_to_program_rom(context, hole)

def edit_germany_4(context: Context):
    course = context.courses.germany
    hole = course.hole(4)
    tile_map = hole.tile_map
    object_map = hole.object_map

    # hole.par = 9

    for object in object_map:
        if object.id_ == GameObjectId.TEE_GROUND:
            object.x -= 100
            object.y += 100

    fairway_blocking_tree_ids = [12, 13, 14]


    dat_x = 0
    dat_y = 0

    tree = 0
    for object in object_map:
        if object.id_ == GameObjectId.CONIFER_TREE:
            if tree == 7:
                object.id_ = GameObjectId.LARGE_CONIFER_TREE
                # object.y += 100
            if tree == 12:
                dat_y = object.y + 200
                dat_x = object.x - 60
                object.x = dat_x
                object.y = dat_y
            elif tree == 13:
                object.x = dat_x + 25
                object.y = dat_y
            elif tree == 14:
                object.x = dat_x + 50
                object.y = dat_y
            # n1 = 12
            # w = 3
            # lower = n1
            # upper = n1 + w
            # if tree >= lower and tree < upper:
                # just to identify those 3 trees near the back of the fairway (that block the 2nd shot)
                # object.id_ = GameObjectId.LARGE_CONIFER_TREE
                # cuz I want to put them in a horizontal line
            tree += 1


            rough_bunker = 0
            for object in object_map:
                if object.id_ == GameObjectId.ROUGH_BUNKER:
                    if rough_bunker == 1:
                        object.x = 270
                    rough_bunker += 1
            # object_map.objects = [object for object in object_map if object.id_ != GameObjectId.ROUGH_BUNKER]

            # fill in old rough bunker
            for x in range(21, 25):
                for y in range(30, 34):
                    tile_map.set_tile_at(x, y, Tile.ROUGH.id_)


            # add new rough bunker to fairway
            b1 = tile_map.get_tile_at(17, 76)
            b2 = tile_map.get_tile_at(18, 76)
            b3 = tile_map.get_tile_at(19, 76)
            b4 = tile_map.get_tile_at(20, 76)

            b5 = tile_map.get_tile_at(17, 77)
            b6 = tile_map.get_tile_at(18, 77)
            b7 = tile_map.get_tile_at(19, 77)
            b8 = tile_map.get_tile_at(20, 77)

            b9 = tile_map.get_tile_at(17, 78)
            b10 = tile_map.get_tile_at(18, 78)
            b11 = tile_map.get_tile_at(19, 78)
            b12 = tile_map.get_tile_at(20, 78)

            b13 = tile_map.get_tile_at(17, 79)
            b14 = tile_map.get_tile_at(18, 79)
            b15 = tile_map.get_tile_at(19, 79)
            b16 = tile_map.get_tile_at(20, 79)

            tile_map.set_tile_at(14, 30, b1)
            tile_map.set_tile_at(15, 30, b2)
            tile_map.set_tile_at(16, 30, b3)
            tile_map.set_tile_at(17, 30, b4)

            tile_map.set_tile_at(14, 31, b5)
            tile_map.set_tile_at(15, 31, b6)
            tile_map.set_tile_at(16, 31, b7)
            tile_map.set_tile_at(17, 31, b8)

            tile_map.set_tile_at(14, 32, b9)
            tile_map.set_tile_at(15, 32, b10)
            tile_map.set_tile_at(16, 32, b11)
            tile_map.set_tile_at(17, 32, b12)

            tile_map.set_tile_at(14, 33, b13)
            tile_map.set_tile_at(15, 33, b14)
            tile_map.set_tile_at(16, 33, b15)
            tile_map.set_tile_at(17, 33, b16)

            # bunker = 0




            # for object in object_map:
            #     if object.id_ == GameObjectId.FAIRWAY_BUNKER:
            #         if bunker == 0 or bunker == 1:
            #             object.id_ = GameObjectId.CONIFER_TREE
            #         bunker += 1

    # render_tile_map(tile_map)
    write_hole_to_program_rom(context, hole)

def edit_germany_5(context: Context):
    course = context.courses.germany
    hole = course.hole(5)
    tile_map = hole.tile_map
    object_map = hole.object_map

    # clear cartpath for space
    tile_map.set_tiles_between(2, 2, 12, 58, Tile.OOB.id_)
    tile_map.set_tiles_between(13, 30, 14, 54, Tile.OOB.id_)
    tile_map.set_tiles_between(13, 2, 16, 7, Tile.OOB.id_)
    tile_map.set_tiles_between(2, 69, 8, 140, Tile.OOB.id_)
    tile_map.set_tiles_between(8, 134, 30, 140, Tile.OOB.id_)

    # clear some rough for space
    tile_map.set_tiles_between(19, 49, 19, 60, Tile.FAIRWAY.id_)

    river_chunk = tile_map.get_tiles_between(2, 59, 45, 71)

    # new_river_y = 110
    # tile_map.set_tiles_between(2, new_river_y, 45, new_river_y + 12 - 3, river_chunk)

    bridge_1 = tile_map.get_tile_at(3, 62)
    bridge_2 = tile_map.get_tile_at(4, 62)

    bridge_connector_upper_1 = tile_map.get_tile_at(3, 59)
    bridge_connector_upper_2 = tile_map.get_tile_at(4, 59)
    bridge_connector_upper_3 = tile_map.get_tile_at(3, 60)
    bridge_connector_upper_4 = tile_map.get_tile_at(4, 60)

    bridge_connector_upper_chunk = [
        bridge_connector_upper_1,
        bridge_connector_upper_3,
        bridge_connector_upper_2,
        bridge_connector_upper_4
    ]
    # tile_map.set_tiles_between(24, 61, 25, 62, bridge_connector_upper_chunk)

    tile_map.set_tile_at(18, 62, bridge_connector_upper_3)
    tile_map.set_tile_at(19, 62, bridge_connector_upper_4)

    tile_map.set_tile_at(21, 62, bridge_connector_upper_3)
    tile_map.set_tile_at(22, 62, bridge_connector_upper_4)

    tile_map.set_tile_at(24, 62, bridge_connector_upper_3)
    tile_map.set_tile_at(25, 62, bridge_connector_upper_4)

    tile_map.set_tile_at(27, 62, bridge_connector_upper_3)
    tile_map.set_tile_at(28, 62, bridge_connector_upper_4)

    tile_map.set_tile_at(30, 62, bridge_connector_upper_3)
    tile_map.set_tile_at(31, 62, bridge_connector_upper_4)

    for y in range(63, 67):
        tile_map.set_tile_at(18, y, bridge_1)
        tile_map.set_tile_at(19, y, bridge_2)

        tile_map.set_tile_at(21, y, bridge_1)
        tile_map.set_tile_at(22, y, bridge_2)

        tile_map.set_tile_at(24, y, bridge_1)
        tile_map.set_tile_at(25, y, bridge_2)

        tile_map.set_tile_at(27, y, bridge_1)
        tile_map.set_tile_at(28, y, bridge_2)

        tile_map.set_tile_at(30, y, bridge_1)
        tile_map.set_tile_at(31, y, bridge_2)

    bridge_connector_lower_1 = tile_map.get_tile_at(3, 67)
    bridge_connector_lower_2 = tile_map.get_tile_at(4, 67)

    tile_map.set_tile_at(18, 67, bridge_connector_lower_1)
    tile_map.set_tile_at(19, 67, bridge_connector_lower_2)

    tile_map.set_tile_at(21, 67, bridge_connector_lower_1)
    tile_map.set_tile_at(22, 67, bridge_connector_lower_2)

    tile_map.set_tile_at(24, 67, bridge_connector_lower_1)
    tile_map.set_tile_at(25, 67, bridge_connector_lower_2)

    tile_map.set_tile_at(27, 67, bridge_connector_lower_1)
    tile_map.set_tile_at(28, 67, bridge_connector_lower_2)

    tile_map.set_tile_at(30, 67, bridge_connector_lower_1)
    tile_map.set_tile_at(31, 67, bridge_connector_lower_2)

    good_lower_connector_patch = tile_map.get_tile_at(23, 67)
    tile_map.set_tile_at(20, 67, good_lower_connector_patch)
    tile_map.set_tile_at(29, 67, good_lower_connector_patch)

    good_upper_connector_patch = tile_map.get_tile_at(23, 62)
    tile_map.set_tile_at(20, 62, good_upper_connector_patch)
    tile_map.set_tile_at(26, 62, good_upper_connector_patch)

    # Tried to extend river vertically but it crashes
    # fixme_chunk = tile_map.get_tiles_between(34, 60, 45, 66)
    # bottom_river_chunk = tile_map.get_tiles_between(2, 63, 45, 71)
    # tile_map.set_tiles_between(2, 64, 45, 72, bottom_river_chunk)
    # tile_map.set_tiles_between(34, 60, 45, 66, fixme_chunk)

    render_tile_map_image(tile_map)
    write_hole_to_program_rom(context, hole)

def edit_germany_6(context: Context):
    course = context.courses.germany
    hole = course.hole(6)
    tile_map = hole.tile_map
    object_map = hole.object_map
    pin_map = hole.pin_map

    # Free up some memory in the tile map
    tile_map.set_tiles_between(32, 87, 46, 114, Tile.OOB.id_)
    tile_map.set_tiles_between(2, 4, 8, 133, Tile.OOB.id_)

    # Flatten the green and place bubble hills
    bubble_hill_tiles = DEFAULT_COURSES.germany.hole(2).tile_map.get_tiles_between(17, 12, 19, 13)
    tile_map.set_tiles_between(22, 14, 26, 17, Tile.GREEN.id_)
    tile_map.set_tiles_between(26, 12, 28, 13, bubble_hill_tiles)
    tile_map.set_tiles_between(27, 14, 29, 15, bubble_hill_tiles)
    tile_map.set_tiles_between(27, 16, 29, 17, bubble_hill_tiles)
    tile_map.set_tiles_between(26, 18, 28, 19, bubble_hill_tiles)
    tile_map.set_tiles_between(23, 17, 25, 18, bubble_hill_tiles)
    tile_map.set_tiles_between(23, 12, 25, 13, bubble_hill_tiles)
    tile_map.set_tiles_between(23, 10, 25, 11, bubble_hill_tiles)
    tile_map.set_tiles_between(27, 10, 29, 11, bubble_hill_tiles)

    # Set the pin positions
    pin_positions = [
        (456, 210),
        (457, 170),
        (389, 166),
        (422, 189),
        (468, 300),
        (462, 270),
    ]
    i = 0
    for pin in pin_map:
        (x, y) = pin_positions[i%len(pin_positions)]
        pin.x = x
        pin.y = y
        i += 1

    # Add some bunkers
    bunker_tiles = tile_map.get_tiles_between(13, 94, 16, 97)
    tile_map.set_tiles_between(28, 57, 31, 60, bunker_tiles)
    tile_map.set_tiles_between(26, 29, 29, 32, bunker_tiles)

    existing_fairway_bunker_object = object_map.find(GameObjectId.FAIRWAY_BUNKER)
    hole.object_map.objects.append(
        GameObject(
            GameObjectId.FAIRWAY_BUNKER,
            existing_fairway_bunker_object.x + 75,
            existing_fairway_bunker_object.y - 50
        )
    )

    existing_rough_bunker_object = object_map.find(GameObjectId.ROUGH_BUNKER)
    hole.object_map.objects.append(
        GameObject(
            GameObjectId.FAIRWAY_BUNKER,
            existing_rough_bunker_object.x + 80,
            existing_rough_bunker_object.y + 110
        )
    )

    # Update the trees
    tree = 0
    for object in object_map:
        if object.id_ == GameObjectId.CONIFER_TREE:
            if tree == 0:
                object.id_ = GameObjectId.PALM_TREE
                object.x -= 148
                object.y -= 103
            if tree == 1 or tree == 3 or tree == 5 or tree == 7:
                object.id_ = GameObjectId.PALM_TREE
            if tree >= 15:
                object.id_ = GameObjectId.LARGE_CONIFER_TREE
            tree += 1

    # render_tile_map_image(tile_map)
    write_hole_to_program_rom(context, hole)

def edit_germany_7(context: Context):
    course = context.courses.germany
    hole = course.hole(7)
    tile_map = hole.tile_map
    object_map = hole.object_map
    pin_map = hole.pin_map

    columns = []
    for x in range(tile_map.width):
        column = []
        for y in range(tile_map.height):
            column.append(tile_map.get_tile_at(x, y))
        columns.append(column)

    new_tiles = []
    for column in columns[::-1]:
        for tile in column[::-1]:
            new_tiles.append(tile)

    # tile_map.tiles = new_tiles

    da_tee = None
    da_green = None

    for object in object_map:
        if object.id_ == GameObjectId.TEE_GROUND:
            da_tee = copy.copy(object)
            # beep()
        elif object.id_ == GameObjectId.GREEN:
            da_green = copy.copy(object)
            # beep()

    for object in object_map:
        if object.id_ == GameObjectId.TEE_GROUND:
            object.x = da_green.x
            object.y = da_green.y
        elif object.id_ == GameObjectId.GREEN:
            object.x = da_tee.x + 20
            object.y = da_tee.y - 76

    # tile_map.set_tiles_between(28, 143, 29, 145, Tile.GREEN.id_)
    tile_map.set_tiles_between(35, 2, 53, 13, Tile.OOB.id_)

    tile_map.set_tile_at(29, 148, Tile.GREEN_FRINGE_1.id_)

    for pin in pin_map:
        pin.x = da_tee.x + 23
        pin.y = da_tee.y - 54


    render_tile_map_image(hole.tile_map)

    write_hole_to_program_rom(context, hole)

def edit_germany_8(context: Context):
    course = context.courses.germany
    hole = course.hole(8)
    # tile_map = hole.tile_map
    # object_map = hole.object_map

    scotland_hole = copy.deepcopy(SCOTLAND_8)

    hole.unknown = scotland_hole.unknown
    hole.tile_map = scotland_hole.tile_map
    hole.object_map = scotland_hole.object_map
    hole.ground_view = scotland_hole.ground_view
    hole.river_view = scotland_hole.river_view
    hole.pin_map = scotland_hole.pin_map

    write_hole_to_program_rom(context, hole)

def edit_germany_9(context: Context):
    course = context.courses.germany
    hole = course.hole(9)
    tile_map = hole.tile_map
    object_map = hole.object_map
    pin_map = hole.pin_map

    da_tee = None
    da_green = None

    for object in object_map:
        if object.id_ == GameObjectId.TEE_GROUND:
            da_tee = copy.copy(object)
            beep()
        elif object.id_ == GameObjectId.GREEN_2:
            da_green = copy.copy(object)
            beep()

    for object in object_map:
        if object.id_ == GameObjectId.TEE_GROUND:
            object.x = da_green.x
            object.y = da_green.y
        elif object.id_ == GameObjectId.GREEN_2:
            object.x = da_tee.x - 29
            object.y = da_tee.y - 41

    for pin in pin_map:
        pin.x = da_tee.x - 29
        pin.y = da_tee.y - 41

    tile_map.set_tile_at(21, 127, Tile.GREEN_FRINGE_2.id_)

    tile_map.set_tiles_between(29, 86, 39, 105, Tile.OOB.id_)

    tile_map.set_tile_at(27, 83, Tile.OOB.id_)

    render_tile_map_image(tile_map)
    write_hole_to_program_rom(context, hole)


def _hex(data):
    return ' '.join(f'{b:02x}' for b in data)

def beep():
    import winsound
    frequency = 2500
    duration = 50
    winsound.Beep(frequency, duration)

def write_hole_to_program_rom(context: Context, hole: Hole):
    hole.recalculate_locations()
    new_hole_bytes = hole.to_bytes()

    if len(new_hole_bytes) > hole.initial_capacity:
        title = "Warning: hole capacity exceeded"
        message = f"{hole.course_name} {hole.number} exceeds memory capacity.\n\n(old size = {hole.initial_capacity} bytes)\n(new size = {len(new_hole_bytes)} bytes).\n\nThis will corrupt the ROM."
        messagebox.showwarning(title, message, parent=context.tk_root)
        print(message)

    if len(new_hole_bytes) < hole.initial_capacity:
        saved = hole.initial_capacity - len(new_hole_bytes)
        print(f"{hole.course_name} {hole.number} saved {saved} bytes!")

    context.rom.program_rom.overwrite_bytes_at_index(hole.base_pointer, new_hole_bytes)

    print(f"Wrote {hole.course_name} {hole.number} to ROM.")

if __name__ == "__main__":
    main()