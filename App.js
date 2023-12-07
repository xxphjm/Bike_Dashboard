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
  Button,
  Alert,
  TextInput
} from 'react-native';

import Navbar from "./src/pages/navbar";
import Content from "./src/pages/content";

import Geolocation from '@react-native-community/geolocation';
import Request from './src/back/request';
import Qs from 'qs';



const App = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [time, setTime] = useState(null);
  const [speedTest, setSpeed] = useState(0);
  const [urlString, setUrlString] = useState('172.20.10.8');
  const [url, setUrl] = useState('172.20.10.8')
  const [messages, setMessages] = useState('');
  useEffect(() => {
    const intervalId = setInterval(() => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude, speed } = position.coords;
          console.log(position);
          setLatitude(latitude);
          setLongitude(longitude);
          setTime(position.timestamp)
          setSpeed(speed*3.6.toFixed(2));
          let data = {
            latitude: latitude,
            longitude: longitude,
            speed: speed*3.6.toFixed(2),
          }
 
          Request(url).post('/data', JSON.stringify(data)).then(res => {
            // setMessages(JSON.stringify(res.data));


          }).catch(err => {
            setMessages(JSON.stringify(err));
            console.log(JSON.stringify(err));
          })
        },
        error => {
          console.error(error);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [url]);
  const handleButtonPress = () => {
    setUrl(urlString);
  }
  console.log(speedTest);
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.navbar} >
        <Navbar />
      </View>
      <View style={styles.content} >
        <Content speed={speedTest} />
        {/* <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10 }}
          placeholder="輸入url"
          value={urlString}
          onChangeText={(e) => setUrlString(e)}
        // ref={(input) => setUrl(input)}
        />
        <Button
          title="送出"
          onPress={handleButtonPress}
        /> */}
        {/* <Text>message:{messages}</Text> */}
        {/* <Mqttserver message={'kjhkh'} /> */}

        {/* <Button title="搜尋" onPress={startScan} /> */}
        {/* <Button title="Check Bluetooth Permission" onPress={checkBluetoothPermission} /> */}
        {/* <Button title="Request Bluetooth Permission" onPress={requestBluetoothPermission} /> */}
        {/* {permissionStatus && <Text>You have {permissionStatus} Bluetooth permission.</Text>} */}
        {/* <Bluetooth /> */}
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