const Sequelize = require('sequelize');
const sequelize = require('../databases/database').sequelize;

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
    body: {
        type: Sequelize.STRING(1000)
    },
    opened: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },

}, {
    timestamps: false,
});
module.exports = Message;