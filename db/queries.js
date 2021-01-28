const connection = require('../config/connection');

module.exports = { 
    getAllDep: () => connection.query(`SELECT * FROM department;`),
    getAllRole: () => connection.query(`SELECT role.id, title, salary, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id ORDER BY role.id ASC;`),
    getAllEmployee: () => connection.query(`SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON d.id = r.department_id LEFT JOIN employee m ON m.id = e.manager_id;`),
    // The above needs work, how to connect table to itself to show manager
    addDep: (dep) => connection.query(`INSERT INTO department (name) VALUES (?)`, [dep]),
    addRole: (role, salary, id) => connection.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [role, salary, id]),
    addEmp: (firstName, lastName, role, manager) => connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [firstName, lastName, role, manager]),
    updateEmp: (role, id) => connection.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [role, id])
}