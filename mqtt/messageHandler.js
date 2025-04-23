import Sensor from '../models/sensor.js'
import { realtimeDB } from '../config/firebase.js';
import Device from '../models/device.js';

export const handleSensorMessage = async (topic, message) => {
    console.log(`Message arrive on topic ${topic}`)
    console.log(`Message: ${message}`)

    try {
        const device = await Device.findByPk(topic);

        if (device) {
            const messageString = message.toString()
        
            const data = JSON.parse(messageString)
            
            const ph = data.ph
            const ppm = data.ppm

            realtimeDB.ref(device.id).set({
                ph,
                ppm,
                updatedAt: Date.now()
            }, (error) => {
                if (error) {
                    console.log(`Failed to write data for ${device.id}:`, error);
                } else {
                    console.log(`Data for ${device.id} updated successfully.`);
                }
            })
            await Sensor.create({id: Date.now(), pH: ph, ppm:ppm, deviceId: device.id})
        }
    } catch (error) {
        console.log(`Error: ${error}`)
    }
    
}