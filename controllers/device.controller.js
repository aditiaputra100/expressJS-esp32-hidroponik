import { where } from 'sequelize';
import Device from '../models/device.js';
import mqttClient from '../mqtt/mqttClient.js';

export const addDevice = async (req, res) => {
  const { id, fcmToken } = req.body;
  try {
    const device = await Device.create({id, fcmToken});
    mqttClient.subscribe(`${id}`);
    return res.status(201).json(device);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDevice = async (req, res) => {
  const deviceId = req.params.id
  try {
    const device = await Device.findByPk(deviceId);
    if (!device) {
      return res.status(404).json({message: "ID tidak ditemukan"})
    }
  
    // mqttClient.subscribe(`${deviceId}`);
    return res.json(device);

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }

};

export const updateToken = async (req, res) => {
  const deviceId = req.params.id
  const {fcmToken} = req.body

  const where = {
    where: {
      id: deviceId
    }
  }

  try {
    await Device.update({fcmToken}, where)

    res.json({message: "Token telah diperbarui"})
  } catch (error) {
    console.log(`Error: ${error}`)
    res.status(500).json({message: "Token gagal diperbarui"})
  }

}

export const updateParameter = async (req, res) => {
  const deviceId = req.params.id
  const {minPh, maxPh, minPPM, maxPPM} = req.body
  const where = {
    where: {
      id: deviceId
    }
  }
  try {
    await Device.update({minPh, maxPh, minPPM, maxPPM}, where)

    res.json({
      message: "Parameter telah berhasil diubah"
    })
  } catch (error) {
    console.log(`Error ${error}`)
    res.status(500).json({message: "Parameter gagal diubah"})
  }
}