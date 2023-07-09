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
def clean_old_files(directory: str, file_list: []) -> []:
    file_set = set(file_list)
    files_in_directory = set(os.listdir(directory))

    not_found_files = []

    for filename in files_in_directory:
        file_path = os.path.join(directory, filename)
        if os.path.isfile(file_path):
            if filename not in file_set:
                os.remove(file_path)
                print(f"Deleted file: {file_path}")
        else:
            print(f"Ignored: {file_path} (not a file)")

    for filename in file_set:
        if filename not in files_in_directory:
            not_found_files.append(filename)

    return not_found_files
