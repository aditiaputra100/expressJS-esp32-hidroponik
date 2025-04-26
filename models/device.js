import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Device = sequelize.define('Device', {
  id: { type: DataTypes.STRING, primaryKey: true },
  minPh: {
    type: DataTypes.DOUBLE, allowNull: false, defaultValue: 5.5
  },
  maxPh: {
    type: DataTypes.DOUBLE, allowNull: false, defaultValue: 6.5
  },
  minPPM: {
    type: DataTypes.INTEGER, allowNull: false, defaultValue: 560
  },
  maxPPM: {
    type: DataTypes.INTEGER, allowNull: false, defaultValue: 840
  },
  fcmToken: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Firebase Cloud Messaging token for push notifications'
  }
  
}, {timestamps: true, tableName: 'devices'});

export default Device;