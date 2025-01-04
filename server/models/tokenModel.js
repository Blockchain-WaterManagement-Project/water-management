const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const NFT = sequelize.define('NFT', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tokenData: {
        type: DataTypes.JSON,
        allowNull: false
    },
    metadata: {
        type: DataTypes.JSON,
        allowNull: true
    }
});

module.exports = { NFT };