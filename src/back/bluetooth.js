import React, { useState, useEffect } from 'react';
import { View, Text, Button, NativeModules, NativeEventEmitter } from 'react-native';
import BleManager from 'react-native-ble-manager';

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const App = () => {
  const device = 'A0:78:17:6B:A0:BC';
  const [connectedDevice, setConnectedDevice] = useState(null);
  const serviceUUID = '00000007-09DA-4BED-9652-F507366FCFC5'; // Replace with your service UUID
  const characteristicUUID = 'AF0BADB1-5B99-43CD-917A-A77BC549E3CC'; // Replace with your characteristic UUID

  useEffect(() => {
    BleManager.start({ showAlert: false });

    BleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleDataReceived);
    BleManagerEmitter.addListener('BleManagerDidUpdateState', onStateChange);


  }, []);

  const handleDataReceived = (data) => {
    console.log('Received data:', data);
    // 在這裡處理接收到的資料
  };

  const onStateChange = (state) => {
    if (state === 'PoweredOn') {
      startScanning();
    }
  };

  const startScanning = () => {
    BleManager.scan([], 5, true)
      .then(() => {
        console.log('Scanning started');
      })
      .catch((error) => {
        console.error('Scanning error:', error);
      });
  };

  const connectToDevice = (device) => {
    BleManager.connect(device)
      .then(() => {
        console.log('Connected to device:', device);
        setConnectedDevice(device);
      })
      .catch((error) => {
        console.error('Connection error:', error);
      });
  };

  const readCharacteristic = () => {
    if (connectedDevice) {
      BleManager.read(connectedDevice, serviceUUID, characteristicUUID)
        .then((data) => {
          console.log('Read data:', data);
        })
        .catch((error) => {
          console.error('Read error:', error);
        });
    }
  };

  return (
    <View>
      <Text>BLE Example</Text>
      {!connectedDevice && (
        <Button title="Connect to Device" onPress={() => connectToDevice(device)} />
      )}
      {connectedDevice && (
        <Button title="Read Characteristic" onPress={() => readCharacteristic()} />
      )}
    </View>
  );
};

export default App;
