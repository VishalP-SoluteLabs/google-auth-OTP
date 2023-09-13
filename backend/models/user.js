const Sequelize = require('sequelize');

const sequelize = require('../util/dbConnection')


const User = sequelize.define('user', {
    // Model attributes are defined here
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull:false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING
    },
    otp: {
        type: Sequelize.STRING,
        allowNull : true
    },
    isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

module.exports = User