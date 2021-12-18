"""
This component provides support for Home Automation Manager (HAM).
For more details about this component, please refer to the documentation at
https://home-assistant.io/components/edgeos/
"""
import asyncio
import json
import logging
import re
from typing import Optional
from urllib.parse import urlparse

import aiohttp

from homeassistant.helpers.aiohttp_client import async_create_clientsession

from ..helpers.const import *
from ..models.config_data import ConfigData

REQUIREMENTS = ["aiohttp"]

_LOGGER = logging.getLogger(__name__)


class EdgeOSWebSocket:
    def __init__(self, hass, config_manager, topics, edgeos_callback):
        self._config_manager = config_manager
        self._last_update = datetime.now()
        self._edgeos_callback = edgeos_callback
        self._hass = hass
        self._session_id = None
        self._topics = topics
        self._session = None
        self._ws = None
        self._pending_payloads = []
        self.shutting_down = False
        self._is_connected = False

    @property
    def config_data(self) -> Optional[ConfigData]:
        if self._config_manager is not None:
            return self._config_manager.data

        return None

    @property
    def ws_url(self):
        url = urlparse(self.config_data.url)

        ws_url = WEBSOCKET_URL_TEMPLATE.format(url.netloc)

        return ws_url

    async def initialize(self, cookies, session_id):
        _LOGGER.debug("Initializing WS connection")

        try:
            self._is_connected = False
            self.shutting_down = False

            self._session_id = session_id
            if self._hass is None:
                self._session = aiohttp.client.ClientSession(cookies=cookies)
            else:
                self._session = async_create_clientsession(
                    hass=self._hass, cookies=cookies
                )

        except Exception as ex:
            _LOGGER.warning(f"Failed to create session of EdgeOS WS, Error: {str(ex)}")

        try:
            async with self._session.ws_connect(
                self.ws_url,
                origin=self.config_data.url,
                ssl=False,
                autoclose=True,
                max_msg_size=MAX_MSG_SIZE,
                timeout=SCAN_INTERVAL_WS_TIMEOUT,
            ) as ws:

                self._is_connected = True

                self._ws = ws
                await self.listen()

        except Exception as ex:
            if self._session is not None and self._session.closed:
                _LOGGER.info(f"WS Session closed")
            else:
                _LOGGER.warning(f"Failed to connect EdgeOS WS, Error: {ex}")

        self._is_connected = False

        _LOGGER.info("WS Connection terminated")

    @property
    def is_initialized(self):
        is_initialized = self._session is not None and not self._session.closed

        return is_initialized

    @property
    def last_update(self):
        result = self._last_update

        return result

    def parse_message(self, message):
        parsed = False

        try:
            message = message.replace(NEW_LINE, EMPTY_STRING)
            message = re.sub(BEGINS_WITH_SIX_DIGITS, EMPTY_STRING, message)

            if len(self._pending_payloads) > 0:
                message_previous = "".join(self._pending_payloads)
                message = f"{message_previous}{message}"

            if len(message) > 0:
                payload_json = json.loads(message)

                self._edgeos_callback(payload_json)
                parsed = True
            else:
                _LOGGER.debug("Parse message skipped (Empty)")

        except Exception as ex:
            _LOGGER.debug(f"Parse message failed due to partial payload, Error: {ex}")

        finally:
            if parsed or len(self._pending_payloads) > MAX_PENDING_PAYLOADS:
                self._pending_payloads = []
            else:
                self._pending_payloads.append(message)

    async def async_send_heartbeat(self):
        _LOGGER.debug(f"Keep alive message sent")

        data = self.get_keep_alive_data()

        if self._is_connected:
            await self._ws.send_str(data)

    async def listen(self):
        _LOGGER.info(f"Starting to listen connected")

        subscription_data = self.get_subscription_data()
        await self._ws.send_str(subscription_data)

        _LOGGER.info("Subscribed to WS payloads")

        async for msg in self._ws:
            continue_to_next = self.handle_next_message(msg)

            if (
                not continue_to_next
                or not self.is_initialized
                or not self._is_connected
            ):
                break

        _LOGGER.info(f"Stop listening")

    def handle_next_message(self, msg):
        _LOGGER.debug(f"Starting to handle next message")
        result = False

        if msg.type in (
            aiohttp.WSMsgType.CLOSE,
            aiohttp.WSMsgType.CLOSED,
            aiohttp.WSMsgType.CLOSING,
        ):
            _LOGGER.info("Connection closed (By Message Close)")

        elif msg.type == aiohttp.WSMsgType.ERROR:
            _LOGGER.warning(f"Connection error, Description: {self._ws.exception()}")

        else:
            if self.config_data.log_incoming_messages:
                _LOGGER.debug(f"New message received: {str(msg)}")

            self._last_update = datetime.now()

            if msg.data == "close":
                result = False
            else:
                self.parse_message(msg.data)

                result = True

        return result

    def disconnect(self):
        self._is_connected = False

    async def close(self):
        _LOGGER.info("Closing connection to WS")

        self._session_id = None
        self._is_connected = False

        if self._ws is not None:
            await self._ws.close()

            await asyncio.sleep(DISCONNECT_INTERVAL)

        self._ws = None

    @staticmethod
    def get_keep_alive_data():
        content = "{CLIENT_PING}"

        _LOGGER.debug(f"Keep alive data to be sent: {content}")

        return content

    def get_subscription_data(self):
        topics_to_subscribe = [{WS_TOPIC_NAME: topic} for topic in self._topics]
        topics_to_unsubscribe = []

        data = {
            WS_TOPIC_SUBSCRIBE: topics_to_subscribe,
            WS_TOPIC_UNSUBSCRIBE: topics_to_unsubscribe,
            WS_SESSION_ID: self._session_id,
        }

        content = json.dumps(data, separators=(STRING_COMMA, STRING_COLON))
        content_length = len(content)
        data = f"{content_length}\n{content}"

        _LOGGER.debug(f"Subscription data to be sent: {data}")

        return data
