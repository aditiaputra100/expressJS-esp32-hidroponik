import Sensor from '../models/sensor.js';

export const getSensorData = async (req, res) => {
  const deviceId = req.params.id;
  const where = deviceId ? { deviceId } : {};

  try {
    const data = await Sensor.findAll({ where });

    if (data.length == 0) {
      return res.status(404).json({
        message: "ID tidak ditemukan"
      })
    }

    return res.json(data.map((el) => {
      return {
        time: el.id,
        ph: el.pH,
        ppm: el.ppm
      }
    }));
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }

};