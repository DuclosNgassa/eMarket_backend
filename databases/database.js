const Sequelize = require('sequelize');

var sequelize = null;

if (process.env.DATABASE_URL) {
    // the application is executed on Heroku ... use the postgres database
    //sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_BRONZE_URL, {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        port: match[4],
        host: match[3],
        logging: true //false
    });
} else {
    sequelize = new Sequelize(
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
}

const Op = Sequelize.Op;
module.exports = {
    sequelize,
    Op
};