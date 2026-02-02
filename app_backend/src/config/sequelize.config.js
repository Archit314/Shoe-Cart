// src/app/config/sequelize.config.js

import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';

export default {
  development: {
    username: process.env.DB_USER,       // should be 'username', not 'user'
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: true,
        ca: fs.readFileSync('./ca.pem').toString()
      }
    }
  },

  production: {
    username: process.env.DB_USER,       // should be 'username', not 'user'
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: true,
        ca: fs.readFileSync('./ca.pem').toString()
      }
    }
  }
};
