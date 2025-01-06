const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('water_management', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;