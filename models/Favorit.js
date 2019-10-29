const Sequelize = require('sequelize');
const sequelize = require('../databases/database').sequelize;
const Op = require('../databases/database').Op;

const Favorit = sequelize.define('favorits', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    useremail: {
        type: Sequelize.STRING(50),
    },
    created_at: {
        type: Sequelize.DATE
    },
    postid: {
        type: Sequelize.INTEGER
    },
}, {
    timestamps: false,
});
module.exports = Favorit;