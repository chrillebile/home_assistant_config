import os

@pyscript_compile
def write_file(filename: str, content):
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    with open(filename, "w") as f:
        f.write(content)

@pyscript_compile
def write_binary_file(filename: str, content):
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    with open(filename, "wb") as f:
        f.write(content)

@pyscript_compile
def clean_dir(dir_path: str):
    # Check that dir extists
    if not os.path.isdir(dir_path):
        return

    # Remove dir
    try:
        os.rmdir(dir_path)
    except OSError as x:
        print("Error occured: %s : %s" % (path, x.strerror))