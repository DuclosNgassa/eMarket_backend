const Sequelize = require('sequelize');
const sequelize = require('../databases/database').sequelize;
const Op = require('../databases/database').Op;

const Image = require('./Image');

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
    userid:{
        type: Sequelize.INTEGER
    },
    categorieid:{
        type: Sequelize.INTEGER
    }
},{
    timestamps: false,
});

Post.hasMany(Image, { foreignKey: 'postid', sourceKey: 'id' });
Image.belongsTo(Post, { foreignKey: 'postid', targetKey: 'id' });

module.exports = Post;