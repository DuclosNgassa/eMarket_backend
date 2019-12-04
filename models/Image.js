const Sequelize = require('sequelize');
const sequelize = require('../databases/database').sequelize;

const Image = sequelize.define('images', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    image_url: {
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
module.exports = Image;