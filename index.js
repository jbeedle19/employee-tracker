// Requirements
const inquirer = require('inquirer');
const cTable = require('console.table');
const connection = require('./config/connection');
const db = require('./db/queries');

// Connect to DB and run program
connection.connect(err => {
    if (err) throw err;
    console.log('Connected as id ' + connection.threadId + '\n');
    promptInitialChoices();
});

// Salvage sql query from this for view all employees
/* testFunction = () => {
    console.log('Hola!');
    console.log('Welcome to Employee Tracker!');
    //promptInitialChoices();
    //connection.end();
    const employeeQuery = connection.query(
        `SELECT id, CONCAT(first_name,' ',last_name) AS name, role_id AS role, manager_id AS manager FROM employee;`,
        function(err, res) {
            if (err) throw err;
            console.table(res);
                connection.end();
        }
    )
}; */

// Prompt user
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
            // Show formatted table with department names and ids
            viewAllDep();
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
                addADepartment(data);
            });
        } else if (initialChoices === 'Add a role') {
            db.getAllDep().then(res => {
                const depChoices = [];
                for (let i = 0; i < res.length; i++) {
                    depChoices.push({
                        name: res[i].name,
                        value: res[i].id
                    })
                }
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
                    choices: depChoices
                }
            ])
            // Role is added to DB
            .then((data) => {
                db.addRole(data.roleName, data.salary, data.roleDepartment)
                .then(res => {
                    console.log('Role Added!');
                    promptInitialChoices();
                })
                .catch((err) => {
                    if (err) throw err;
                });
            });
            })
            /* db.getAllDep().then(res => {
                const depChoices = res.map(depRow => {
                return {
                    name: depRow.name,
                    value: depRow.id
                }});
            }); */
            // prompted to enter the name, salary, and department for the role.
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
            connection.end();
            return;
        }
    });
};

// DB query functions
viewAllDep = () => {
    db.getAllDep()
        .then(res => {
            console.table(res);
            promptInitialChoices();
        })
        .catch(err => {
            if (err) throw err;
        });
};

viewAllRoles = () => {
    db.getAllRoles()
        .then(res => {
            console.table(res);
            promptInitialChoices();
        })
        .catch(err => {
            if (err) throw err;
        });
};

addADepartment = ({departmentName}) => {
    db.addDep(departmentName)
    .then(res => {
        console.log('Department added!');
        promptInitialChoices();
    })
    .catch((err) => {
        if (err) throw err;
    });
};