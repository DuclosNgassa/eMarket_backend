const Sequelize = require('sequelize');
const sequelize = require('../databases/database').sequelize;
const Op = require('../databases/database').Op;

const Post = require('./Post');

const Categories = sequelize.define('categories', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING(50),
    },
    parentid: {
        type: Sequelize.INTEGER
    }
}, {
        timestamps: false,
    });

Categories.hasMany(Categories, { foreignKey: 'parentid', sourceKey: 'id' });
Categories.belongsTo(Categories, { foreignKey: 'parentid', targetKey: 'id' });

Categories.hasMany(Post, { foreignKey: 'categorieid', sourceKey: 'id' });
Post.belongsTo(Categories, { foreignKey: 'categorieid', targetKey: 'id' });

module.exports = Categories;