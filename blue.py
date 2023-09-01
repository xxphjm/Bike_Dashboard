import asyncio
from bleak import BleakScanner, BleakClient

async def send_message(device_name, service_uuid, characteristic_uuid, message):
    devices = await BleakScanner.discover()

    for device in devices:
        if device.name == device_name:
            async with BleakClient(device) as client:
                await client.connect()  # Connect to the device
                await client.write_gatt_char(characteristic_uuid, message.encode())
                await client.disconnect()  # Disconnect from the device
                print("Message sent successfully!")
                return

loop = asyncio.get_event_loop()

# Replace these with the actual UUIDs of your device's service and characteristic
service_uuid = "00000007-09DA-4BED-9652-F507366FCFC5"
characteristic_uuid = "00000009-09DA-4BED-9652-F507366FCFC5"

loop.run_until_complete(send_message("Redmi K30 Pro", service_uuid, characteristic_uuid, "Hello, BLE Device!"))
