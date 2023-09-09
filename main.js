const inquirer = require("inquirer");
const { viewDepartment, viewRoles } = require("./queries");

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
            new inquirer.Separator(),

            "Logout",
            new inquirer.Separator()
        ]
    }
]


function init() {
    inquirer.prompt(questions).then(response => {
        let answer = response.options;
        if (answer === "View all departments") {
            viewDepartment();
        }
        if (answer === "View all roles") {
            viewRoles();
        }
    })
};

init();

