const Sequelize = require('sequelize');
const sequelize = require('../databases/database').sequelize;
const Op = require('../databases/database').Op;

const Image = require('./Image');
const Favorit = require('./Favorit');
const Message = require('./Message');

const Post = sequelize.define('posts', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: Sequelize.STRING(50),
    },
    created_at: {
        type: Sequelize.DATE
    },
    post_typ: {
        type: Sequelize.ENUM('offer', 'search', 'all')
    },
    description: {
        type: Sequelize.STRING(1000)
    },
    fee: {
        type: Sequelize.NUMBER
    },
    fee_typ: {
        type: Sequelize.ENUM('negotiable', 'fixed', 'gift')
    },
    city: {
        type: Sequelize.STRING(50)
    },
    quartier: {
        type: Sequelize.STRING(50)
    },
    status: {
        type: Sequelize.ENUM('done', 'created')
    },
    rating: {
        type: Sequelize.INTEGER
    },
    useremail:{
        type: Sequelize.STRING(100)
    },
    categorieid:{
        type: Sequelize.INTEGER
    },
    phone_number: {
        type: Sequelize.STRING,
    },
},{
    timestamps: false,
});

Post.hasMany(Image, { foreignKey: 'postid', sourceKey: 'id' });
Image.belongsTo(Post, { foreignKey: 'postid', targetKey: 'id' });

Post.hasMany(Favorit, { foreignKey: 'postid', sourceKey: 'id' });
Favorit.belongsTo(Post, { foreignKey: 'postid', targetKey: 'id' });

Post.hasMany(Message, { foreignKey: 'postid', sourceKey: 'id' });
Message.belongsTo(Post, { foreignKey: 'postid', targetKey: 'id' });

module.exports = Post;