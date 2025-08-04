import mqtt from 'mqtt';

const getTopic = (number: string) => `habit_couple/device${number}`;

export class Mqtt {
  private username: string;
  private password: string;
  private deviceNumber: '1' | '2';
  private client: mqtt.MqttClient;
  private hostURL = 'wss://02b0f45be63c4d3a85325b0f8e21841e.s1.eu.hivemq.cloud:8884/mqtt';

  constructor(username: string, password: string, deviceNumber: '1' | '2') {
    this.username = username;
    this.password = password;
    this.deviceNumber = deviceNumber;
    this.client = mqtt.connect(this.hostURL, { username: this.username, password: this.password });
    this.client.subscribe(deviceNumber === '1' ? getTopic('2') : getTopic('1'));

    this.client.on('connect', () => {
      console.log('mqtt: connected')
    })

    this.client.on('error', function (error) {
      console.log('mqtt:', error);
    });

    this.client.on('message', function (topic, message) {
      console.log('mqtt: received message:', topic, message.toString());
    });

    this.client.on('end', () => {
      console.log("mqtt: ending connection");
    })
  }

  public sendMessage (message: string, callback?: () => void) {
    console.log('mqtt: sending message:', message);
    this.client.publish(getTopic(this.deviceNumber), message, {retain: true}, callback);
  }

  public subscribeToMessages (onMessage: (message: string) => void) {
      this.client.on('message', (_topic, message) => {
        onMessage(message.toString());
      });
  }

  public terminate() {
    this.client.end();
  }
}
