import Sensor from '../models/sensor.js';

export const getSensorData = async (req, res) => {
  const { deviceId } = req.query;
  const where = deviceId ? { deviceId } : {};
  const data = await Sensor.findAll({ where });
  res.json(data);
};