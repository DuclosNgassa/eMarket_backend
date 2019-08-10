const Sequelize = require('sequelize');
const sequelize = require('../databases/database').sequelize;
const Op = require('../databases/database').Op;

const Post = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING(50),
    },
    email: {
        type: Sequelize.STRING,
    },
    phone_number: {
        type: Sequelize.STRING,
    },
    createdAt: {
        type: Sequelize.DATE
    },
    rating: {
        type: Sequelize.INTEGER
    },
    status: {
        type: Sequelize.ENUM('active', 'blocked')
    },
}, {
        timestamps: false,
    });
module.exports = User;