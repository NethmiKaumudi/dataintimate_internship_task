require('dotenv').config();
const mysql = require('mysql2');

const db=mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})
db.connect();
module.exports=db;
// // dbConnection.js
//
// const mysql = require('mysql2');
//
// // Create a connection pool
// const pool = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE,
//     connectionLimit: 10,
// });
//
// // Function to acquire a connection from the pool
// const getConnection = () => {
//     return new Promise((resolve, reject) => {
//         pool.getConnection((error, connection) => {
//             if (error) {
//                 reject(error);
//             } else {
//                 resolve(connection);
//             }
//         });
//     });
// };
//
// module.exports = getConnection;
