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

function addDepartment(deptValue) {
    db.query(`INSERT INTO department (name) VALUES ("${deptValue}"); `, function (err, results) {
        console.log("Department added.")
    });

};

function addRole() {

};

function addEmployee() {

};

function updateEmployeeRole() {

}

function logout() {

}


module.exports = { viewDepartment, viewRoles, addDepartment, addRole, addEmployee, updateEmployeeRole, logout };