import requests
from io import clean_old_files, write_file, write_binary_file

@service
def get_ikea_ota(url=None):
    # Get new updates
    resp = task.executor(requests.get, url, verify=False)
    if(resp.status_code != 200):
        print(f"Request for following failed: {url}")
        return

    # Write version info down
    write_file("/config/zigpy_ota/version_info.json", resp.text)

    json_resp = resp.json()
    updates = json_resp["updates"]

    # Cleanup
    to_download = set(clean_old_files("/config/zigpy_ota/ota", [update["name"] for update in updates if "DIRIGERA" not in update["name"]]))

    # Download all fw
    for update in updates:
        if update["name"] not in to_download:
            continue

        r = task.executor(requests.get, update["url"], verify=False)
        if(resp.status_code != 200):
            print(f"Request for following failed: {update['name']}")
            continue

        write_binary_file(f"/config/zigpy_ota/ota/{update['name']}", r.content)
