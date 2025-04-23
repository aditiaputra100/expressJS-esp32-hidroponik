import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import deviceRoutes from './routes/device.route.js'
import sensorRoutes from './routes/sensor.route.js'
import Device from './models/device.js';
import Sensor from './models/sensor.js';

const env = process.env.NODE_ENV || 'development';
dotenv.config({path: `.env.${env}`})

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/device', deviceRoutes);
app.use('/api/sensor', sensorRoutes);

// Menyinkronkan model ke database
async function syncModels() {
    try {
      await Device.sync();  // Sync tabel Device
      await Sensor.sync();  // Sync tabel Sensor
      console.log("Models synced with database");
    } catch (error) {
      console.error("Error syncing models:", error);
    }
}
  
syncModels();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})