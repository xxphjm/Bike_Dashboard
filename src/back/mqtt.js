/* @flow */
import React, { Component, useState, useEffect, useRef } from 'react';
import { Button, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import init from 'react_native_mqtt';
// 先前的程式碼保留，這裡省略
init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {}
});

const options = {
  host: '139.99.89.162',
  port: 8083,
  path: '/bike_data',
  id: 'react-native-ibsms'
};

const Mqttserver = (message) => {

  //mqtt相關程式
  const clientRef = useRef(null); // 使用 useRef 宣告 client
  // 狀態管理
  const topic = 'bike_data';
  const [subscribedTopic, setSubscribedTopic] = useState('');

  const [status, setStatus] = useState('');

  // 連接成功的處理函數
  const onConnect = () => {
    console.log('連接成功');
    setStatus('connected');
    subscribeTopic()

  };

  // 連接失敗的處理函數
  const onFailure = (err) => {
    console.log('連接失敗！');
    console.log(err);
    setStatus('failed');
    connect()

  };

  // 連接 MQTT 伺服器
  const connect = () => {
    if (status !== 'connected') {

      clientRef.current.connect({
        onSuccess: onConnect,
        useSSL: false,
        timeout: 10,
        onFailure: onFailure,
        userName: 'ibsms',
        password: 'nkust1234',
      })
    }

  };
  // 收到消息的處理函數
  const onMessageArrived = (message) => {
    console.log('收到消息：' + message.payloadString);

  };

  // 訂閱主題
  const subscribeTopic = () => {
    setSubscribedTopic(topic);
    clientRef.current.subscribe(topic, { qos: 2 });
    console.log('訂閱主題：' + topic);

  };

  // 發送消息的處理函數
  const sendMessage = () => {

    if (status === 'connected') { // 確保在連接成功的情況下才發送消息
      const jsonData = JSON.stringify({ dataToSend: message });
      const mqttMessage = new Paho.MQTT.Message(jsonData);
      mqttMessage.destinationName = subscribedTopic;
      clientRef.current.send(mqttMessage);

    }

  };

  useEffect(() => {
    // 初始化 mqtt
    clientRef.current = new Paho.MQTT.Client(options.host, options.port, options.id);
    clientRef.current.onMessageArrived = onMessageArrived;
    connect()
    return () => {
      clientRef.current.unsubscribe(subscribedTopic);
      clientRef.current.disconnect();
    };


  }, []);
  return (
    <Button title="送出" onPress={() => sendMessage(message)} />
  )
};

// 其他樣式保留，這裡省略

export default Mqttserver;




