const Sequelize = require('sequelize');

const sequelize = new Sequelize(
        'postgres', // db name
        'postgres', // username
        'Ichbin1postgres',
        {
            dialect: 'postgres',
            schema: 'emarket',
            host: 'localhost',
            pool: {
                max: 5,
                min: 0,
                require: 30000,
                idle: 10000
            }
        }
    );
/*
const sequelize = new Sequelize(
        'postgres', // db name
        'armelduclosndanjingassa', // username
        '123456',
        {
            dialect: 'postgres',
            schema: 'emarket',
            host: 'localhost',
            pool: {
                max: 5,
                min: 0,
                require: 30000,
                idle: 10000
            }
        }
    );
*/

const Op = Sequelize.Op;
module.exports = {
    sequelize,
    Op
};