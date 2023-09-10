const inquirer = require("inquirer");
const { viewDepartment, viewRoles, addDepartment, addRole, addEmployee, updateEmployeeRole, logout } = require("./queries");
const db = require("./config/connection");

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


function mainMenu() {
    inquirer.prompt(questions).then(response => {
        let answer = response.options;
        if (answer === "View all departments") {
            viewDepartment();
        }
        if (answer === "View all roles") {
            viewRoles();
        }
        if (answer === "Add a department") {
            departmentQuery();
        }
        if (answer === "Add a role") {
            roleQuery();
        }
        if (answer === "Add an employee") {
            addEmployee();
        }
        if (answer === "Update en employee role") {
            updateEmployeeRole();
        }
        if (answer === "Logout") {
            logout();
        }
    })
};

mainMenu();


function departmentQuery(deptName) {
    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "Enter the new department to add."
        }
    ])
        .then(response => {
            deptName = response.department;
            addDepartment(deptName);
        })
}

function roleQuery() {

    inquirer.prompt([
        {
            type: "input",
            name: "roleTitle",
            message: "Enter role title"
        },
        {
            type: "number",
            name: "salary",
            message: "Enter salary amount"
        }
    ])
        .then(answer => {
            let params = [answer.roleTitle, answer.salary];

            db.query(`SELECT name, id FROM department`, (err, results) => {
                if (err) throw err;
                let department = results.map(({ name, id }) => ({ name: name, value: id }));


                inquirer.prompt([
                    {
                        type: "list",
                        name: "dept",
                        message: "Choose a department for the role",
                        choices: department
                    }
                ])
                    .then(response => {
                        const dept = response.dept;
                        params.push(dept);
                        addRole(params);
                        //console.log(params);
                    })
            })
        });
}