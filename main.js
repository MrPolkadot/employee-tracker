//Import packages and other modules
const inquirer = require("inquirer");
const db = require("./config/connection");
const asTable = require("as-table").configure({ delimiter: ' | ' }) //Package that formats the table data

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
        prefix: "（╹◡╹）",
        name: "options",
        message: "Choose a task =>",
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
const main = () => {

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




function departmentQuery(deptName) {
    inquirer.prompt([
        {
            type: "input",
            prefix: "( ◠ ‿ ◠ )/", //Customizes the cursor symbol
            name: "department",
            message: "Enter the new department to add:"
        }
    ])
        .then(response => {
            deptName = response.department; //saves the input 
            addDepartment(deptName); //runs this function and uses the input to insert into the table
        })

}

function roleQuery() {

    inquirer.prompt([
        {
            type: "input",
            prefix: "◆",
            name: "roleTitle",
            message: "Enter role title"
        },
        {
            type: "number",
            prefix: "$",
            name: "salary",
            message: "Enter salary amount"
        }
    ])
        .then(answer => {
            let params = [answer.roleTitle, answer.salary]; //saves both inputs

            db.query(`SELECT name, id FROM department`, (err, results) => { //Queries our database to grab columns from department table
                if (err) throw err;
                let department = results.map(({ name, id }) => ({ name: name, value: id })); //creates an array of objects from the table data that assigns the name and id values from the table as key/value pairs

                inquirer.prompt([
                    {
                        type: "list",
                        prefix: "◆",
                        name: "dept",
                        message: "Choose a department for the role",
                        choices: department //uses the array of objects and displays each of the name properties
                    }
                ])
                    .then(response => {
                        const dept = response.dept; //Saves our choice
                        params.push(dept); //Then adds it to our params array [title, salary, dept]
                        addRole(params); //runs function and uses the params array to insert them as values to the table
                    })
            })
        });
}

function addEmployeeQuery() { //Same concept as the roleQuery function
    inquirer.prompt([
        {
            type: "input",
            prefix: "◆",
            name: "firstName",
            message: "Enter first name"
        },
        {
            type: "input",
            prefix: "◆",
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
                        prefix: "♪(´ε｀ )",
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
                                    prefix: "(・.・?)",
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
                prefix: "(~_~;)",
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
                            prefix: "◆",
                            name: "role",
                            message: "Assign new role to employee",
                            choices: role
                        }
                    ])
                        .then(response => {
                            const selectRole = response.role;
                            param.push(selectRole);

                            db.query(`SELECT * FROM employee`, (err, results) => {
                                if (err) throw err;
                                const manager = results.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));

                                inquirer.prompt([
                                    {
                                        type: "list",
                                        prefix: "ᕦ(ò_óˇ)ᕤ",
                                        name: "manager",
                                        message: "Who is the manager of the employee?",
                                        choices: manager
                                    }
                                ])
                                    .then(answer => {
                                        const selectManager = answer.manager;
                                        param.push(selectManager);
                                        updateEmployeeRole(param);
                                    })
                            })
                        })
                })
            })
    })
}




function viewDepartment() {
    db.query(`SELECT id, name AS Department FROM department`, function (err, results) {
        console.log(asTable(results,));
        newLine();
        returnToMain();
    })

}


function viewRoles() {
    db.query(`SELECT role.title AS Role, role.id AS role_id, department.name AS Department, role.salary FROM role INNER JOIN department ON role.department_id=department.id`, function (err, results) {
        console.log(asTable(results));
        newLine();
        returnToMain();
    });
}


function viewEmployees() {

    db.query(`SELECT employee.id, 
    employee.first_name, 
    employee.last_name, 
    role.title, 
    department.name AS department,
    role.salary, 
    CONCAT (manager.first_name, " ", manager.last_name) AS manager
FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id;` , (err, results) => {
        if (err) throw err;
        console.log(asTable(results));
        newLine(); //Creates new line for spacing
        returnToMain(); //returns to main menu
    })
}



function addDepartment(deptValue) { //uses the input from the departmentQuery function as a value for our table
    db.query(`INSERT INTO department (name) VALUES ("${deptValue}"); `, function (err, results) {
        console.log("Department added.");
        viewDepartment();
    });
};

function addRole(deptArr) { //Uses the array data from roleQuery()
    db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${deptArr[0]}", "${deptArr[1]}", "${deptArr[2]}")`, (err, results) => {
        if (err) throw err;
        console.log("Role added.");
        viewRoles();
    });
}

function addEmployee(dataArr) { //Uses the array data from addEmployeeQuery()
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${dataArr[0]}","${dataArr[1]}", ${dataArr[2]}, ${dataArr[3]})`, (err, results) => {
        if (err) throw err;
        console.log("Employee added.");
        viewEmployees(dataArr);
    })
};

function updateEmployeeRole(employeeData) {
    db.query(`UPDATE employee SET role_id = ${employeeData[1]}, manager_id = ${employeeData[2]} WHERE id = ${employeeData[0]}`, (err, results) => {
        if (err) throw err;
        console.log("Employee has been updated.");
        viewEmployees();
    })
}

function logout() { //Terminates our connection
    db.end();
    console.log("Logging out... (-.-)zZzZ");
}

main();

function newLine() {
    console.log("\n");
}

let returnToMain = () => { return main() }; //Reruns our main menu prompt

