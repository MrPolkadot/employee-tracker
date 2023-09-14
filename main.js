//Import packages and other modules
const inquirer = require("inquirer");
const { viewDepartment, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole, logout } = require("./queries");
const db = require("./config/connection");

console.log(`

 ____  ____  ____  ____  ____  ____  ____  ____  _________  ____  ____  ____  ____  ____  ____  ____ 
||E ||||M ||||P ||||L ||||O ||||Y ||||E ||||E ||||       ||||T ||||R ||||A ||||C ||||K ||||E ||||R ||
||__||||__||||__||||__||||__||||__||||__||||__||||_______||||__||||__||||__||||__||||__||||__||||__||
|/__\\||/__\\||/__\\||/__\\||/__\\||/__\\||/__\\||/__\\||/_______\\||/__\\||/__\\||/__\\||/__\\||/__\\||/__\\||/__\\|

`)
//Main menu
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

            "View employees",
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



//Runs a feature depending on what option the user chooses from the main menu
function mainMenu() {
    inquirer.prompt(questions).then(response => {
        let answer = response.options;
        if (answer === "View all departments") {
            viewDepartment();
        }
        if (answer === "View all roles") {
            viewRoles();
        }
        if (answer === "View employees") {
            viewEmployees();
        }
        if (answer === "Add a department") {
            departmentQuery();
        }
        if (answer === "Add a role") {
            roleQuery();
        }
        if (answer === "Add an employee") {
            addEmployeeQuery();
        }
        if (answer === "Update an employee role") {
            updateEmployeeQuery();
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
                    })
            })
        });
}

function addEmployeeQuery() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "Enter first name"
        },
        {
            type: "input",
            name: "lastName",
            message: "Enter last name"
        }
    ])
        .then(answer => {
            let params = [answer.firstName, answer.lastName];
            db.query(`SELECT id, title FROM role`, (err, results) => {
                if (err) throw err;
                let role = results.map(({ id, title }) => ({ name: title, value: id }));
                inquirer.prompt([
                    {
                        type: "list",
                        name: "role",
                        message: "Assign role to employee",
                        choices: role
                    }
                ])
                    .then(response => {
                        const selectRole = response.role;
                        params.push(selectRole);

                        db.query(`SELECT * FROM employee`, (err, results) => {
                            if (err) throw err;
                            const manager = results.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));

                            inquirer.prompt([
                                {
                                    type: "list",
                                    name: "manager",
                                    message: "Who is the manager of the employee?",
                                    choices: manager
                                }
                            ])
                                .then(answer => {
                                    const selectManager = answer.manager;
                                    params.push(selectManager);
                                    addEmployee(params);
                                })
                        })
                    })
            })
        })
}

function updateEmployeeQuery() {
    db.query(`SELECT * FROM employee`, (err, results) => {
        if (err) throw err;
        const employeeList = results.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));

        inquirer.prompt([
            {
                type: "list",
                name: "employee",
                message: "Which employee do you want to update?",
                choices: employeeList
            }
        ])
            .then(answer => {
                const selectEmployee = answer.employee;
                let param = [];
                param.push(selectEmployee);

                db.query(`SELECT id, title FROM role`, (err, results) => {
                    if (err) throw err;
                    let role = results.map(({ id, title }) => ({ name: title, value: id }));
                    inquirer.prompt([
                        {
                            type: "list",
                            name: "role",
                            message: "Assign new role to employee",
                            choices: role
                        }
                    ])
                        .then(response => {
                            const selectRole = response.role;
                            console.log(selectRole);
                            param.push(selectRole);

                            db.query(`SELECT * FROM employee`, (err, results) => {
                                if (err) throw err;
                                const manager = results.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));

                                inquirer.prompt([
                                    {
                                        type: "list",
                                        name: "manager",
                                        message: "Who is the manager of the employee?",
                                        choices: manager
                                    }
                                ])
                                    .then(answer => {
                                        const selectManager = answer.manager;
                                        param.push(selectManager);
                                        updateEmployeeRole(param);
                                        console.log(param);
                                    })
                            })
                        })
                })
            })
    })
}

