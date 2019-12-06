const Sequelize = require('sequelize');
const sequelize = require('../databases/database').sequelize;

const Post = require('./Post');
const Favorit = require('./Favorit');
const Message = require('./Message');
const UserNotification = require('./UserNotification');

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
        type: Sequelize.STRING(50),
    },
    phone_number: {
        type: Sequelize.STRING(50),
    },
    device_token: {
        type: Sequelize.STRING(200),
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

User.hasMany(Post, { foreignKey: 'useremail', sourceKey: 'email' });
Post.belongsTo(User, { foreignKey: 'useremail', targetKey: 'email' });

User.hasMany(Favorit, { foreignKey: 'useremail', sourceKey: 'email' });
Favorit.belongsTo(User, { foreignKey: 'useremail', targetKey: 'email' });

User.hasMany(Message, { foreignKey: 'sender', sourceKey: 'email' });
Message.belongsTo(User, { foreignKey: 'sender', targetKey: 'email' });

User.hasMany(Message, { foreignKey: 'receiver', sourceKey: 'email' });
Message.belongsTo(User, { foreignKey: 'receiver', targetKey: 'email' });

User.hasMany(UserNotification, { foreignKey: 'useremail', sourceKey: 'email' });
UserNotification.belongsTo(User, { foreignKey: 'useremail', targetKey: 'email' });

module.exports = User;