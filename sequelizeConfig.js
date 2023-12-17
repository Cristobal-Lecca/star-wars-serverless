const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.MYSQL_HOST,
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

const MyModel = sequelize.define('MyModel', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    tableName: 'swapi_test',
});


async function initializeSequelize() {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');

        await MyModel.sync();

        console.log('Models have been synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
    }
}

initializeSequelize();

module.exports = {
    sequelize,
    MyModel,
};
