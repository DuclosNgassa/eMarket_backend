const Sequelize = require('sequelize');
const sequelize = require('../databases/database').sequelize;
const Op = require('../databases/database').Op;

const Post = require('./Post');

const Categorie = sequelize.define('categories', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING(50),
    },
    parentid: {
        type: Sequelize.INTEGER
    },
    icon: {
        type: Sequelize.STRING(50),
    }
}, {
        timestamps: false,
    });

Categorie.hasMany(Categorie, { foreignKey: 'parentid', sourceKey: 'id' });
Categorie.belongsTo(Categorie, { foreignKey: 'parentid', targetKey: 'id' });

Categorie.hasMany(Post, { foreignKey: 'categorieid', sourceKey: 'id' });
Post.belongsTo(Categorie, { foreignKey: 'categorieid', targetKey: 'id' });

module.exports = Categorie;