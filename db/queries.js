const connection = require('../config/connection');

module.exports = { 
    getAllDep: () => connection.query(`SELECT * FROM department;`),
    getAllRole: () => connection.query(`SELECT * FROM role;`),
    addDep: (dep) => connection.query(`INSERT INTO department (name) VALUES (?)`, [dep]),
    addRole: (role, salary, id) => connection.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [role, salary, id]),
}