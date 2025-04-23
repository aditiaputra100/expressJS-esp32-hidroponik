import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

const env = process.env.NODE_ENV || 'development';
dotenv.config({path: `.env.${env}`})

const sequelize = new Sequelize(
  {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dialect: 'mysql'
  }
);

export default sequelize