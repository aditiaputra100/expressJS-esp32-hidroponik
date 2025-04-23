import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Device = sequelize.define('Device', {
  id: { type: DataTypes.STRING, primaryKey: true },
  
}, {timestamps: true, tableName: 'devices'});

export default Device;