const Sequelize = require('sequelize');
const sequelize = require('../databases/database').sequelize;
const Op = require('../databases/database').Op;

const Message = sequelize.define('messages', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    sender: {
        type: Sequelize.STRING(50),
    },
    receiver: {
        type: Sequelize.STRING(50),
    },
    created_at: {
        type: Sequelize.DATE
    },
    postid: {
        type: Sequelize.INTEGER
    },
    message: {
        type: Sequelize.STRING(1000)
    },

}, {
    timestamps: false,
});
module.exports = Message;