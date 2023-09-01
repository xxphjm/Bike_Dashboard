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
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
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
  // const [isScanning, setIsScanning] = useState(false);
  // const [permissionStatus, setPermissionStatus] = useState(null);
  // useEffect(() => {
  //   // turn on bluetooth if it is not on
  //   BleManager.enableBluetooth().then(() => {
  //     console.log('Bluetooth is turned on!');
  //   });


  //   BleManager.start({ showAlert: false }).then(() => {
  //     console.log('BleManager initialized');
  //   });
  //   let stopListener = BleManagerEmitter.addListener(
  //     'BleManagerStopScan',
  //     () => {
  //       setIsScanning(false);
  //       handleGetConnectedDevices()
  //       console.log('Scan is stopped');
  //     },
  //   );
  //   checkBluetoothPermission();
  // }, []);

  // const checkBluetoothPermission = async () => {
  //   const status = await check(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
  //   if (status !== 'granted') {
  //     status = await request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
  //   }
  //   else {

  //     setPermissionStatus(status);
  //   }
  //   console.log(status);
  // };


  // const startScan = () => {
  //   if (!isScanning) {

  //     BleManager.scan([], 5, true)
  //       .then((e) => {

  //         console.log('Scanning...');
  //         // setIsScanning(true);
  //       })
  //       .catch(error => {
  //         console.log('error');
  //         console.error(error);
  //       });
  //   }
  // };
  // const handleGetConnectedDevices = () => {
  //   BleManager.getConnectedPeripherals([]).then(results => {
  //     if (results.length == 0) {
  //       console.log('No connected bluetooth devices');
  //     } else {
  //       for (let i = 0; i < results.length; i++) {
  //         let peripheral = results[i];
  //         peripheral.connected = true;
  //         peripherals.set(peripheral.id, peripheral);
  //         setConnected(true);
  //         setBluetoothDevices(Array.from(peripherals.values()));
  //       }
  //     }
  //   });
  // };

  // useEffect(() => {
  //   // ...其他初始化代碼
  
  //   // 設置接收通知的監聽器
  //   const notificationListener = BleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', data => {
  //     console.log('Received data:', data.value);
  //     // 在這裡處理接收到的數據
  //   });
  
  //   // 返回一個清理函數，以便在組件卸載時刪除監聽器
  //   return () => {
  //     notificationListener.remove();
  //   };
  // }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.navbar} >
        <Navbar />
      </View>
      <View style={styles.content} >
        <Content />
        <Mqttserver message={'kjhkh'} />
        {/* <Button title="訂閱" onPress={sendMessage} /> */}
        {/* <Button title="搜尋" onPress={startScan} /> */}
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