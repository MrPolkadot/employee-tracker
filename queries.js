const db = require("./config/connection");

function viewDepartment() {
    db.query(`SELECT * FROM department`, function (err, results) {
        console.log("Retrieved departments")
        console.table(results);

    });
}

function viewRoles() {
    db.query(`SELECT * FROM role`, function (err, results) {
        console.log("Retrieved roles")
        console.table(results);
    });
}


function viewEmployees(currentEmployee) {

    if (currentEmployee) {
        db.query(`SELECT * FROM employee WHERE first_name = "${currentEmployee[0]}"`, (err, results) => {
            if (err) throw err;
            console.table(results);
        })
    } else {
        db.query(`SELECT * FROM employee`, (err, results) => {
            if (err) throw err;
            console.table(results);
        })
    }
}



function addDepartment(deptValue) {
    db.query(`INSERT INTO department (name) VALUES ("${deptValue}"); `, function (err, results) {
        console.log("Department added.");
        viewDepartment();
    });
};

function addRole(deptArr) {
    db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${deptArr[0]}", "${deptArr[1]}", "${deptArr[2]}")`, (err, results) => {
        if (err) throw err;
        console.log("Role added.");
        viewRoles();
    });
}

function addEmployee(dataArr) {
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${dataArr[0]}","${dataArr[1]}", ${dataArr[2]}, ${dataArr[3]})`, (err, results) => {
        if (err) throw err;
        console.log("Employee added.");
        viewEmployees(dataArr);
    })
};

function updateEmployeeRole(employeeData) {
    db.query(`UPDATE employee SET role_id = ${employeeData[1]}, manager_id = ${employeeData[2]} WHERE id = ${employeeData[0]}`, (err, results) => {
        if (err) throw err;
        console.log("Employee has been updated.")
    })
}

function logout() {
    db.end()
}


module.exports = { viewDepartment, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole, logout };