const db = require("./config/connection");


// viewRoles() { };
// addDepartment() { };
// addRole() { };
// addEmployee() { };
// updateEmployeeRole() { };


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


module.exports = { viewDepartment, viewRoles };