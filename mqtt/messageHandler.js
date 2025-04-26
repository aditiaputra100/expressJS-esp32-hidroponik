import Sensor from '../models/sensor.js'
import { realtimeDB, sendNotification } from '../config/firebase.js';
import Device from '../models/device.js';
import Notification from "../models/notification.js"

const deviceStatus = {};

export const handleSensorMessage = async (topic, message) => {
    console.log(`Message arrive on topic ${topic}`)
    console.log(`Message: ${message}`)

    
    try {
        const device = await Device.findByPk(topic);
        
        if (device) {

            // Mencatat status sensor device
            if (!deviceStatus[device.id]) {
                deviceStatus[device.id] = {
                    isPhNormal: true,
                    isPPMNormal: true,
                }
            }

            const messageString = message.toString()
        
            const data = JSON.parse(messageString)
            
            const ph = data.ph
            const ppm = data.ppm

            // Send sensor data
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
            // And save to database
            await Sensor.create({id: Date.now(), pH: ph, ppm:ppm, deviceId: device.id})

            // Cek apakah sensor melebihi batas
            // PH
            if (ph < device.minPh || ph > device.maxPh) {
                if (deviceStatus[device.id].isPhNormal) {
                    await sendNotification(device.fcmToken, 'Peringatan PH', `Nilai PH: ${ph}`)
                    await Notification.create({deviceId: device.id, title: 'Peringatan PH', body: `Nilai PH: ${ph}` , type: 'error'})
                }
                deviceStatus[device.id].isPhNormal = false
            } else {
                if (!deviceStatus[device.id].isPhNormal) {
                    await sendNotification(device.fcmToken, 'PH Normal', `Nilai PH kembali normal: ${ph}`)
                    await Notification.create({deviceId: device.id, title: 'PH Normal', body: `Nilai PH kembali normal: ${ph}` , type: 'normal'})

                }
                deviceStatus[device.id].isPhNormal = true;
            }
            
            // PPM
            if (ppm < device.minPPM || ppm > device.maxPPM) {
                if (deviceStatus[device.id].isPPMNormal) {
                    await sendNotification(device.fcmToken, 'Peringatan PPM', `Nilai PPM: ${ph}`)
                    await Notification.create({deviceId: device.id, title: 'Peringatan PPM', body: `Nilai PPM: ${ph}` , type: 'error'})
                }
                deviceStatus[device.id].isPPMNormal = false
            } else {
                if (!deviceStatus[device.id].isPPMNormal) {
                    await sendNotification(device.fcmToken, 'PPM Normal', `Nilai PPM kembali normal: ${ppm}`)
                    await Notification.create({deviceId: device.id, title: 'PPM Normal', body: `Nilai PPM kembali normal: ${ph}` , type: 'normal'})

                }
                deviceStatus[device.id].isPPMNormal = true;
            }
        }
    } catch (error) {
        console.log(`Error: ${error}`)
    }
    
}