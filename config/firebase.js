import dotenv from 'dotenv'
import { initializeApp } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import pkg from 'firebase-admin';
import fs from 'fs';
import serviceAccountKey from '../path/to/serviceAccountKey.js'

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
