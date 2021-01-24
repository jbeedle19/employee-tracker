// Requirements
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const promptInitialChoices = () => {
    inquirer.prompt({
        type: 'list',
        name: 'initialChoices',
        message: 'What would you like to do?',
        choices: ['View ALL departments', 'View ALL roles', 'View ALL employees', 
                    'Add a department', 'Add a role', 'Add an employee', 
                    'Update an employee', 'Exit']
    })
    .then(({ initialChoices }) => {
        if (initialChoices === 'View ALL departments') {
            console.log('Choice Selected!');
            promptInitialChoices();
            // Show formatted table with department names and ids
        } else if (initialChoices === 'View ALL roles') {
            console.log('Choice Selected!');
            promptInitialChoices();
            // Show formatted table with role id, job title, 
            // the department that role belongs to, and the salary for that role
        } else if (initialChoices === 'View ALL employees') {
            console.log('Choice Selected!');
            promptInitialChoices();
            // Show formatted table with employee ids, first names, 
            // last names, job titles, departments, salaries, and manager of that employee
        } else if (initialChoices === 'Add a department') {
            // prompt department name
            inquirer.prompt({
                type: 'input',
                name: 'departmentName',
                message: 'What is the name of the department?',
                default: 'Party Planning Committee (PCP)',
                validate: departmentNameInput => {
                    if (departmentNameInput) {
                        return true;
                    } else {
                        console.log("Please enter the department's name!");
                        return false;
                    }
                }
            })
            .then((data) => {
                // Add to DB 
                promptInitialChoices();
            });
        } else if (initialChoices === 'Add a role') {
            // prompted to enter the name, salary, and department for the role.
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'roleName',
                    message: 'What is the name of the role?',
                    default: 'Assistant to the Regional Manager',
                    validate: roleNameInput => {
                        if (roleNameInput) {
                            return true;
                        } else {
                            console.log("Please enter the role's name!");
                            return false;
                        }
                    }
                },
                {
                    type: 'number',
                    name: 'salary',
                    message: 'What is the salary for this role?',
                    default: 65000,
                    validate: departmentNameInput => {
                        if (departmentNameInput) {
                            return true;
                        } else {
                            console.log("Please enter the role's salary!");
                            return false;
                        }
                    }
                },
                {
                    type: 'choice',
                    name: 'roleDepartment',
                    message: 'Which department does this role belong to?',
                    
                },
            ])
            .then((data) => {
                // Add to DB 
                promptInitialChoices();
            });
            // Role is added to DB
        } else if (initialChoices === 'Add an employee') {
            console.log('Choice Selected!');
            promptInitialChoices();
            // Prompted to enter the employee's first name, last name, role, and manager. 
            // Employee is added to DB
        } else if (initialChoices === 'Update an employee') {
            console.log('Choice Selected!');
            promptInitialChoices();
            // Prompted to select an employee (list all avail) to update
            // Prompted to select a (new) role (list all avail). 
            // Their new role is updated in the DB
        } else {
            console.log('Bye!');
            return;
        }
    });
};

// Function to initialize app
function init() {
    console.log('Welcome to Employee Tracker!');
    promptInitialChoices();
}

init();