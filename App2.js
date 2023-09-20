import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  NativeModules,
  NativeEventEmitter,
  Button,
  Alert,
} from 'react-native';

import Navbar from "./src/pages/navbar";
import Content from "./src/pages/content";
import BleManager from 'react-native-ble-manager';
import Mqttserver from './src/back/mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import init from 'react_native_mqtt';
import { check, request, PERMISSIONS } from 'react-native-permissions';
import Bluetooth from './src/back/bluetooth';
const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);


const App = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState(null);
  useEffect(() => {
    // turn on bluetooth if it is not on
    BleManager.enableBluetooth().then(() => {
      console.log('Bluetooth is turned on!');
    });


    BleManager.start({ showAlert: false }).then(() => {
      console.log('BleManager initialized');
    });
    let stopListener = BleManagerEmitter.addListener(
      'BleManagerStopScan',
      () => {
        setIsScanning(false);
        BleManager.getConnectedPeripherals([]).then((connectedDevices) => {
          console.log('Connected devices:', connectedDevices);
          // Update your state or perform other actions as needed
        }).catch((error) => {
          console.error('Error getting connected devices:', error);
        });
        console.log('Scan is stopped');
      },
    );

    checkBluetoothPermission();
  }, []);

  
  const checkBluetoothPermission = async () => {
    const status = await check(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
    if (status !== 'granted') {
      status = await request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
    }
    else {

      setPermissionStatus(status);
    }
    console.log(status);
  };


  const startScan = () => {
    if (!isScanning) {

      BleManager.scan([], 5, true)
        .then((e) => {

          console.log('Scanning...');
          // setIsScanning(true);
        })
        .catch(error => {
          console.log('error');
          console.error(error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.navbar} >
        <Navbar />
      </View>
      <View style={styles.content} >
        <Content />
        <Mqttserver message={'kjhkh'} />

        <Button title="搜尋" onPress={startScan} />
        {/* <Button title="Check Bluetooth Permission" onPress={checkBluetoothPermission} /> */}
      {/* <Button title="Request Bluetooth Permission" onPress={requestBluetoothPermission} /> */}
        {/* {permissionStatus && <Text>You have {permissionStatus} Bluetooth permission.</Text>} */}
        <Bluetooth />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // 将主轴方向设置为水平方向

  },
  navbar: {
    width: '100%',
    height: '15%',
    backgroundColor: '#D9D9D9',

  },
  content: {
    width: '100%',
    height: '80%',


  },
});

export default App;