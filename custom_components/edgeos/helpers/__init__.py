import logging
import sys

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from ..managers.home_assistant import EdgeOSHomeAssistant
from ..managers.password_manager import PasswordManager
from .const import *

_LOGGER = logging.getLogger(__name__)


def clear_ha(hass: HomeAssistant, name):
    if DATA_EDGEOS not in hass.data:
        hass.data[DATA_EDGEOS] = dict()

    del hass.data[DATA_EDGEOS][name]


def get_ha(hass: HomeAssistant, name):
    ha_data = hass.data.get(DATA_EDGEOS, dict())
    ha = ha_data.get(name)

    return ha


async def async_set_ha(hass: HomeAssistant, entry: ConfigEntry):
    initialized = False
    try:
        if DATA_EDGEOS not in hass.data:
            hass.data[DATA_EDGEOS] = dict()

        if PASSWORD_MANAGER_EDGEOS not in hass.data:
            hass.data[PASSWORD_MANAGER_EDGEOS] = PasswordManager(hass)

        password_manager = hass.data[PASSWORD_MANAGER_EDGEOS]

        if entry.entry_id in hass.data[DATA_EDGEOS]:
            _LOGGER.info(f"EdgeOS {entry.title} already defined")
        else:
            ha = EdgeOSHomeAssistant(hass, password_manager)

            hass.data[DATA_EDGEOS][entry.entry_id] = ha

            await ha.async_init(entry)

            initialized = True
    except Exception as ex:
        exc_type, exc_obj, tb = sys.exc_info()
        line_number = tb.tb_lineno

        _LOGGER.error(f"Failed to async_set_ha, error: {ex}, line: {line_number}")

    return initialized


async def handle_log_level(hass: HomeAssistant, entry: ConfigEntry):
    log_level = entry.options.get(CONF_LOG_LEVEL, LOG_LEVEL_DEFAULT)

    if log_level == LOG_LEVEL_DEFAULT:
        return

    log_level_data = {f"custom_components.{DOMAIN}": log_level.lower()}

    await hass.services.async_call(DOMAIN_LOGGER, SERVICE_SET_LEVEL, log_level_data)
