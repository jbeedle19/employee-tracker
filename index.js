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
                    type: 'list',
                    name: 'roleDepartment',
                    message: 'Which department does this role belong to?',
                    // show all available departments to choose from
                    choices: ['Here is where', 'the existing departments', 'should appear', 'to choose from']
                }
            ])
            // Role is added to DB
            .then((data) => {
                // Add to DB 
                promptInitialChoices();
            });
        } else if (initialChoices === 'Add an employee') {
            // Prompted to enter the employee's first name, last name, role, and manager.
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'empFirstName',
                    message: 'What is the first name of the employee?',
                    default: 'Karen',
                    validate: empFirstNameInput => {
                        if (empFirstNameInput) {
                            return true;
                        } else {
                            console.log("Please enter the employee's first name!");
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'empLastName',
                    message: 'What is the last name of the employee?',
                    default: 'Filippelli',
                    validate: empLastNameInput => {
                        if (empLastNameInput) {
                            return true;
                        } else {
                            console.log("Please enter the employee's last name!");
                            return false;
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'empRole',
                    message: "What is the employee's role?",
                    // Show all the available roles to choose from
                    choices: ['Here is where', 'the existing roles', 'should appear', 'to choose from']
                },
                {
                    type: 'list',
                    name: 'empManager',
                    message: "Who is the employee's manager?",
                    // Show all the available employees to choose from
                    choices: ['Here is where', 'the existing employees', 'should appear', 'to choose from']
                }
            ])
            // Employee is added to DB
            .then((data) => {
                // Add to DB 
                promptInitialChoices();
            });
        } else if (initialChoices === 'Update an employee') {
            // Prompted to select an employee (list all avail) to update
            // Prompted to select a (new) role (list all avail). 
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'empChoices',
                    message: 'Which employee would you like to update?',
                    // show all available employees to choose from
                    choices: ['Here is where', 'the existing employees', 'should appear', 'to choose from']
                },
                {
                    type: 'list',
                    name: 'roleChoices',
                    message: "What is the employee's new role?",
                    // show all available roles to choose from
                    choices: ['Here is where', 'the existing employees', 'should appear', 'to choose from']
                }
            ])
            // Their new role is updated in the DB
            .then((data) => {
                // Add to DB
                promptInitialChoices();
            });
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