const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

//Server configuration
/*
const sequelize = new Sequelize(
        process.env.DB_NAME_SERVER, // db name
        process.env.DB_USER_NAME_SERVER, // username
        process.env.DB_PASSWORD_SERVER,
        {
            dialect: process.env.DIALECT_SERVER,
            schema: process.env.SCHEMA_SERVER,
            host: process.env.HOST_SERVER,
            port: process.env.PORT_SERVER,
            pool: {
                max: 5,
                min: 0,
                require: 30000,
                idle: 10000
            }
        }
    );
*/

// Local configuration
const sequelize = new Sequelize(
    process.env.DB_NAME_LOCAL, // db name
    process.env.DB_USER_NAME_LOCAL, // username
    process.env.DB_PASSWORD_LOCAL,
    {
        dialect: process.env.DIALECT_LOCAL,
        schema: process.env.SCHEMA_LOCAL,
        host: process.env.HOST_LOCAL,
        pool: {
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        }
    }
);

const Op = Sequelize.Op;
module.exports = {
    sequelize,
    Op
};