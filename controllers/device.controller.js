import Device from '../models/device.js';
import mqttClient from '../mqtt/mqttClient.js';

export const addDevice = async (req, res) => {
  const { id } = req.body;
  try {
    const device = await Device.create({id});
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