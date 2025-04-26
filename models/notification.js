import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/database.js";
import Device from "./device.js";

const Notification = sequelize.define('Notification', {
    id: {
        type: DataTypes.UUIDV4, allowNull: false, primaryKey: true
    },
    deviceId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'Device',
            key: 'id'
        }
    },
    title: {
        type: DataTypes.STRING
    },
    body: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.STRING
    }
}, {timestamps: true, tableName: 'notifications'})

Notification.belongsTo(Device, {foreignKey: 'deviceId'})
Device.hasMany(Notification, {foreignKey: 'deviceId'})

export default Notification