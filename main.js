const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection(
    {
        host: "127.0.0.1",
        user: process.env.DB_USER, //MySQL username
        password: process.env.DB_PASSWORD, //MySQL password
        database: process.env.DB_NAME
    },
    console.log("connected")
);



const questions = [
    {
        type: "list",
        name: "options",
        message: "Welcome",
        choices: [
            "View all departments",
            new inquirer.Separator(),

            "View all roles",
            new inquirer.Separator(),

            "Add a department",
            new inquirer.Separator(),

            "Add a role",
            new inquirer.Separator(),

            "Add an employee",
            new inquirer.Separator(),

            "Update an employee role",
            new inquirer.Separator()
        ]
    }
]

inquirer.prompt(questions).then(response => {
    console.log(response);
})

