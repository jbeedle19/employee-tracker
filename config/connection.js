const mysql = require('mysql2');
const util = require('util');
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
});

connection.query = util.promisify(connection.query);

module.exports = connection;