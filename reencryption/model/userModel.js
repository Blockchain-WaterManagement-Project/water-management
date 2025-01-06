const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    publicKey: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    privateKey: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

module.exports = User;