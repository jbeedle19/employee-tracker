const connection = require('../config/connection');

module.exports = { 
    // Functions based on which prompt was selected
    getAllDep: () => connection.query(`SELECT * FROM department;`),
    getAllRole: () => connection.query(`SELECT role.id, title, salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id ORDER BY role.id ASC;`),
    getAllEmployee: () => connection.query(`SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON d.id = r.department_id LEFT JOIN employee m ON m.id = e.manager_id;`),
    addDep: (dep) => connection.query(`INSERT INTO department (name) VALUES (?)`, [dep]),
    addRole: (role, salary, id) => connection.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [role, salary, id]),
    addEmp: (firstName, lastName, role, manager) => connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [firstName, lastName, role, manager]),
    updateEmp: (role, id) => connection.query(`UPDATE employee SET employee.role_id = ? WHERE employee.id = ?`, [role, id]),
    // Functions for updating choice arrays
    getDepChoices: () => connection.query(`SELECT * FROM department;`),
    getRoleChoices: () => connection.query(`SELECT id, title FROM role;`),
    getEmpChoices: () => connection.query(`SELECT id, CONCAT(first_name,' ',last_name) AS name FROM employee;`),
    getManagerChoices: () => connection.query(`SELECT id, CONCAT(first_name,' ',last_name) AS name FROM employee;`)
}