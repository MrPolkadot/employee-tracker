const mysql = require("mysql2");
require("dotenv").config();


const db = mysql.createConnection(
    {
        host: "127.0.0.1",
        //port: 2099,
        user: process.env.DB_USER, //MySQL username
        password: process.env.DB_PASSWORD, //MySQL password
        database: process.env.DB_NAME
    }
);

db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Connected to the database");
});


module.exports = db;