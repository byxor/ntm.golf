from dataclasses import dataclass
from typing import List

from hole import Hole

@dataclass
class Course:
    name: str
    holes: List[Hole]

    def find_in(self, program_rom: bytes):
        for hole in self.holes:
            hole.find_in(program_rom)

    def hole(self, number):
        hole = self.holes[number - 1]
        hole.course_name = self.name
        return hole


@dataclass
class Courses:
    germany: Course
    japan: Course
    australia: Course
    usa: Course

    def find_in(self, program_rom: bytes):
        for course in [self.germany, self.japan, self.australia, self.usa]:
            course.find_in(program_rom)

    def __iter__(self):
        return [self.germany, self.japan, self.australia, self.usa]

@dataclass
class CourseTable:
    pass
