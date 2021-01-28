const connection = require('../config/connection');

module.exports = { 
    getAllDep: () => connection.query(`SELECT * FROM department;`),
    getAllRole: () => connection.query(`SELECT role.id, title, salary, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id ORDER BY role.id ASC;`),
    //getAllEmployee: () => connection.query(`SELECT employee.id, CONCAT(first_name,' ',last_name) AS name, role.title AS role, CONCAT(first_name,' ',last_name) AS manager FROM employee INNER JOIN role ON employee.role_id = role.id ORDER BY employee.id ASC;`),
    // The above needs work, how to connect table to itself to show manager
    addDep: (dep) => connection.query(`INSERT INTO department (name) VALUES (?)`, [dep]),
    addRole: (role, salary, id) => connection.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [role, salary, id]),
    addEmp: (firstName, lastName, role, manager) => connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [firstName, lastName, role, manager]),
    updateEmp: (role, id) => connection.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [role, id])
}