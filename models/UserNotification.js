const Sequelize = require('sequelize');
const sequelize = require('../databases/database').sequelize;

const UserNotification = sequelize.define('usernotification', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: Sequelize.STRING(50),
    },
    message: {
        type: Sequelize.STRING(500),
    },
    useremail: {
        type: Sequelize.STRING(50)
    },
    created_at: {
        type: Sequelize.DATE
    },
}, {
    timestamps: false,
});
module.exports = UserNotification;