import fs from 'fs'
import mqtt from 'mqtt';
import { handleSensorMessage } from './messageHandler.js';
import Device from '../models/device.js';

const ca = fs.readFileSync("hivemq-ca.pem")

const mqttClient =  mqtt.connect(process.env.MQTT_BROKER, {username: process.env.MQTT_USERNAME, password: process.env.MQTT_PASSWORD, ca:ca});

mqttClient.on('connect', async () => {
    console.log('Connected to MQTT broker');

    try {
        const devices = await Device.findAll();
    
        devices.forEach((device) => {
            mqttClient.subscribe(device.id, (error) => {
                if (error) {
                    console.error(`Failed to subscribe to device/${device.id}`);
                } else {
                    console.log(`Subscribed to device/${device.id}`);
                }
            })
        })
    } catch (error) {
        console.error('Error fetching devices from DB:', err);
    }
});

mqttClient.on('message', handleSensorMessage);

// export const subscribeAllDevices = async () => {
//     const devices = await Device.findAll();
//     devices.forEach(device => {
//       const topic = `esp32/sensors/${device.id}`;
//       mqttClient.subscribe(topic, () => {
//         console.log(`Subscribed to topic: ${topic}`);
//       });
//     });
// };

export default mqttClient;