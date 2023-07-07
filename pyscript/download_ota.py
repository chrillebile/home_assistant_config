import requests
from io import clean_dir, write_file, write_binary_file

@service
def get_ikea_ota(url=None):
    # Get new updates
    resp = task.executor(requests.get, url, verify=False)
    if(resp.status_code != 200):
        print(f"Request for following failed: {url}")
        return

    # Cleanup
    clean_dir("/config/zigpy_ota/ota")

    # Write version info down
    write_file("/config/zigpy_ota/version_info.json", resp.text)

    # Download all fw
    json_resp = resp.json()
    updates = json_resp["updates"]
    for update in updates:
        if "DIRIGERA" in update["name"]:
            continue

        r = task.executor(requests.get, update["url"], verify=False)
        if(resp.status_code != 200):
            print(f"Request for following failed: {update['name']}")
            continue

        write_binary_file(f"/config/zigpy_ota/ota/{update['name']}", r.content)
