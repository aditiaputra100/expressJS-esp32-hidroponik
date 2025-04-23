import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';  
import Device from './device.js';  

const Sensor = sequelize.define('Sensor', {
  id: {
    type: DataTypes.DATE,
    allowNull: false,
    primaryKey: true,
  },
  pH: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  ppm: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  deviceId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Device',  
      key: 'id',
    },
  }
}, {
  tableName: 'sensor',  
  timestamps: true,      
});

Sensor.belongsTo(Device, { foreignKey: 'deviceId' }); 
Device.hasMany(Sensor, { foreignKey: 'deviceId' });

export default Sensor;