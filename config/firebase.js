import dotenv from 'dotenv'
import { initializeApp } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import pkg from 'firebase-admin';
import fs from 'fs';
import serviceAccountKey from '../path/to/serviceAccountKey.js'
import Device from '../models/device.js';

const {credential} = pkg

const env = process.env.NODE_ENV || 'development';
dotenv.config({path: `.env.${env}`})


const firebaseConfig = {
    credential: credential.cert(serviceAccountKey),
    apiKey: process.env.FIREBASE_API_KEY,
    databaseURL: process.env.FIREBASE_DB_URL,
};

const app = initializeApp(firebaseConfig)
export const realtimeDB = getDatabase(app);

export const sendNotification = async (token, title, body, data = {}) => {
    const message = {
        token, 
        notification: {
            title,
            body,
        },
        data: data
    }

    try {
        const response = await pkg.messaging().send(message)
        console.log('Successfully sent message:', response)
    } catch (error) {
        console.error('Error sending message:', error)

        if (error.code === 'messaging/registration-token-not-registered') {
            console.warn('Token tidak valid. Hapus token dari database.');

            await Device.update({fcmToken: null}, {
                where: {
                    fcmToken: token
                }
            })
        }
    }
}
