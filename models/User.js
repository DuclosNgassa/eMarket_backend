const Sequelize = require('sequelize');
const sequelize = require('../databases/database').sequelize;
const Op = require('../databases/database').Op;

const Post = require('./Post');

const User = sequelize.define('users', {
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
    created_at: {
        type: Sequelize.DATE
    },
    rating: {
        type: Sequelize.INTEGER
    },
    user_status: {
        type: Sequelize.ENUM('active', 'blocked')
    },
}, {
    timestamps: false,
});

User.hasMany(Post, { foreignKey: 'userid', sourceKey: 'id' });
Post.belongsTo(User, { foreignKey: 'userid', targetKey: 'id' });

module.exports = User;