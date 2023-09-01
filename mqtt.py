import paho.mqtt.client as mqtt
import json
import time
import random


def publish_mqtt_message(topic: str, message: str) -> None:
    
    # 設定 MQTT 代理伺服器的連線資訊
    broker = "139.99.89.162"
    port = 1883
    username = "ibsms"
    password = "nkust1234"

    # 設定發布與訊息
    publish_message = json.dumps(message)

    # 定義連線建立時的回呼函式
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            # print("連線成功")
            client.subscribe(topic)
        else:
            print("連線失敗")

    # 定義接收訊息時的回呼函式
    def on_message(client, userdata, msg):
        print("收到主題：", msg.topic)
        print("收到訊息：", msg.payload.decode())

    # 建立 MQTT 用戶端並設定連線回呼函式與訊息接收回呼函式
    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message

    # 設定使用者名稱和密碼
    client.username_pw_set(username, password)

    # 連線到 MQTT 代理伺服器
    client.connect(broker, port)

    # 保持連線（非阻塞函式）
    client.loop_start()

    # 發送訊息
    client.publish(topic, publish_message)
    print("已針對主題 {} 發送訊息：{}".format(topic, publish_message))

    # 等待訊息接收（可根據需要增加迴圈）
    # time.sleep(2)

    # 停止連線
    client.loop_stop()
    client.disconnect()

def round_decimal():
    number = round(random.uniform(0, 1), 2)
    return number

if __name__ == '__main__':

    while True:
        message = {"bike_id": "KKH06726921", "column_name": "seat_rotate", "data": round_decimal()}
        publish_mqtt_message("bike_data", message)
        time.sleep(0.1)