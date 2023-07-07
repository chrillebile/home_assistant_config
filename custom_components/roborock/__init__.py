"""The Roborock component."""
from __future__ import annotations

import asyncio
import logging
from datetime import timedelta

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import ConfigEntryError, ConfigEntryNotReady
from homeassistant.helpers.integration_platform import (
    async_process_integration_platform_for_component,
)
from roborock import RoborockException
from roborock.api import RoborockApiClient
from roborock.cloud_api import RoborockMqttClient
from roborock.containers import HomeData, HomeDataProduct, UserData
from roborock.local_api import RoborockLocalClient
from roborock.protocol import RoborockProtocol

from .const import (
    CONF_CLOUD_INTEGRATION,
    CONF_HOME_DATA,
    CONF_INCLUDE_SHARED,
    DOMAIN,
    PLATFORMS,
    VACUUM,
)
from .coordinator import RoborockDataUpdateCoordinator
from .domain import DomainData
from .roborock_typing import ConfigEntryData, DeviceNetwork, RoborockHassDeviceInfo

SCAN_INTERVAL = timedelta(seconds=30)

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up roborock from a config entry."""
    _LOGGER.debug("Integration async setup entry: %s", entry.as_dict())
    await async_process_integration_platform_for_component(hass, DOMAIN)
    hass.data.setdefault(DOMAIN, {})

    data: ConfigEntryData = entry.data
    user_data = UserData.from_dict(data.get("user_data"))
    base_url = data.get("base_url")
    username = data.get("username")
    vacuum_options = entry.options.get(VACUUM, {})
    integration_options = entry.options.get(DOMAIN, {})
    cloud_integration = integration_options.get(CONF_CLOUD_INTEGRATION, False)
    include_shared = (
        vacuum_options.get(CONF_INCLUDE_SHARED, True)
    )

    device_network = data.get("device_network", {})
    try:
        api_client = RoborockApiClient(username, base_url)
        _LOGGER.debug("Requesting home data")
        home_data = await api_client.get_home_data(user_data)
        hass.config_entries.async_update_entry(
            entry, data={CONF_HOME_DATA: home_data.as_dict(), **data}
        )
        if home_data is None:
            raise ConfigEntryError("Missing home data. Could not found it in cache")
    except Exception as e:
        conf_home_data = data.get("home_data")
        home_data = HomeData.from_dict(conf_home_data) if conf_home_data else None
        if home_data is None:
            raise e

    _LOGGER.debug("Got home data %s", home_data)

    platforms = [platform for platform in PLATFORMS if entry.options.get(platform, True)]

    domain_data: DomainData = hass.data.setdefault(DOMAIN, {}).setdefault(
        entry.entry_id,
        DomainData(coordinators=[], platforms=platforms)
    )
    coordinators = domain_data["coordinators"]

    devices = (
        home_data.devices + home_data.received_devices
        if include_shared
        else home_data.devices
    )
    if not cloud_integration:
        devices_without_ip = [_device for _device in devices if _device.duid not in device_network.keys()]
        if len(devices_without_ip) > 0:
            device_network.update(await get_local_devices_info())
    for _device in devices:
        device_id = _device.duid
        try:
            product: HomeDataProduct = next(
                product
                for product in home_data.products
                if product.id == _device.product_id
            )

            device_info = RoborockHassDeviceInfo(
                device=_device,
                model=product.model,
            )

            map_client = RoborockMqttClient(user_data, device_info)

            if not cloud_integration:
                network = device_network.get(device_id)
                if network is None:
                    networking = await map_client.get_networking()
                    network = {"ip": networking.ip}
                    hass.config_entries.async_update_entry(
                        entry, data={"device_network": device_network, **data}
                    )
                device_info.host = network.get("ip")

                main_client = RoborockLocalClient(device_info)
            else:
                main_client = map_client
            data_coordinator = RoborockDataUpdateCoordinator(
                hass, main_client, map_client, device_info, home_data.rooms
            )
            coordinators.append(data_coordinator)
        except RoborockException:
            _LOGGER.warning(f"Failing setting up device {device_id}")

    await asyncio.gather(
        *(_coordinator.async_config_entry_first_refresh() for _coordinator in coordinators),
        return_exceptions=True
    )

    success_coordinators = []
    for _coordinator in coordinators:
        if not _coordinator.last_update_success:
            _coordinator.release()
        else:
            success_coordinators.append(_coordinator)

    if len(success_coordinators) == 0:
        # Don't start if no coordinators succeeded.
        raise ConfigEntryNotReady("There are no devices that can currently be reached.")

    domain_data["coordinators"] = success_coordinators

    for platform in platforms:
        hass.async_create_task(
            hass.config_entries.async_forward_entry_setup(entry, platform)
        )

    entry.async_on_unload(entry.add_update_listener(async_reload_entry))
    return True


async def get_local_devices_info() -> dict[str, DeviceNetwork]:
    """Get local device info."""
    discovered_devices = await RoborockProtocol(timeout=10).discover()

    devices_network = {
        discovered_device.duid: DeviceNetwork(ip=discovered_device.ip, mac="")
        for discovered_device in discovered_devices
    }

    return devices_network


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Handle removal of an entry."""
    data: DomainData = hass.data[DOMAIN].get(
        entry.entry_id
    )
    unloaded = all(
        await asyncio.gather(
            *[
                hass.config_entries.async_forward_entry_unload(entry, platform)
                for platform in data.get("platforms")
            ]
        )
    )
    if unloaded:
        hass.data[DOMAIN].pop(entry.entry_id)
        for data_coordinator in data.get("coordinators"):
            data_coordinator.release()

    return unloaded


async def async_reload_entry(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Reload config entry."""
    await async_unload_entry(hass, entry)
    await async_setup_entry(hass, entry)
