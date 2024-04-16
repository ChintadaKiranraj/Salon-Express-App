
const { DataTypes } = require('sequelize');
const {sequences} = require('../config/pg');


const User = sequences.define('user', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    confirm_password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
    },
    registration_date: {
        type: DataTypes.STRING,
        allowNull: true
    },
    profile_photo: {
        type: DataTypes.BLOB,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'express_user',
    schema: 'public',
    timestamps: false,
});

User.sync({ alter: true })
    .then(() => {
        console.log('user table synchronized successfully');
    })
    .catch((err) => {
        console.error('Error synchronizing user table:', err);
    });

module.exports = { User };