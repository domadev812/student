const path = require('path');
require('dotenv').config();

if (process.env.SEQUELIZE_CONFIG_LOADED !== 'true') {
  throw new Error('sequelize/config-env.js must be loaded using config.ts');
}

// Example can be found here: https://github.com/sequelize/express-example
// Initialize database connection

const config = {
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  charset: 'utf8',
  collate: 'utf8_general_ci',
  dialect: 'mysql',
  dialectOptions: {
    decimalNumbers: true,
  },
  pool: {
    max: 100,
    min: 0,
    idle: 10000,
    acquire: 60000,
    evict: 10000,
  },
  logging: process.env.DB_LOGGING === 'true' ? console.log : undefined,
  freezeTableName: true, // By default, sequelize will pluralize model names
  timestamps: true,
  models: [path.resolve(__dirname, '..', 'models', '!(index.*)')],
  seederStorage: 'sequelize',
};

module.exports = config;
