from contextlib import contextmanager
from tkinter import Tk
from typing import Any, Generator


@contextmanager
def gui_context() -> Generator[Tk, Any, None]:
    root = Tk()
    # context.tk_root.withdraw()
    root.attributes('-topmost', True)
    root.after(0, root.attributes, '-topmost', False)

    try:
        yield root
    finally:
        if root:
            root.destroy()