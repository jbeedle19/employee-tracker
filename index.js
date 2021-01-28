// Requirements
const inquirer = require('inquirer');
const cTable = require('console.table');
const connection = require('./config/connection');
const db = require('./db/queries');
// Arrays that will house current choices when you need to list choices out in prompt 
let depChoices = [];
let roleChoices = [];
let empChoices = [];
let managerChoices = [];

// Connect to DB and run program
connection.connect(err => {
    if (err) throw err;
    console.log('Connected as id ' + connection.threadId + '\n');
    promptInitialChoices();
});

// Prompt user
const promptInitialChoices = () => {
    // put functions here to update array so that each time the main menu is returned it updates
    updateDeptArray();
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
            viewAllDep();
        } else if (initialChoices === 'View ALL roles') {
            viewAllRoles();
        } else if (initialChoices === 'View ALL employees') {
            viewAllEmployees();
        } else if (initialChoices === 'Add a department') {
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
                addADepartment(data);
            });
        } else if (initialChoices === 'Add a role') {
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
                    choices: depChoices
                }
            ])
            .then((data) => {
                console.log(data);
                addARole(data);
            });
        } else if (initialChoices === 'Add an employee') {
            db.getAllRole().then(res => {
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
            .then((data) => {
                addAnEmployee(data);
            });
            })
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
            .then((data) => {
                updateAnEmployee(data);
            });
        } else {
            console.log('Goodbye!');
            connection.end();
            return;
        }
    });
};

// DB query functions
// Function to view all departments in a table
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

// Function to view all roles in a table
viewAllRoles = () => {
    db.getAllRole()
        .then(res => {
            console.table(res);
            promptInitialChoices();
        })
        .catch(err => {
            if (err) throw err;
        });
};

// Function to view all employees in a table
viewAllEmployees = () => {
    db.getAllEmployee()
        .then(res => {
            console.table(res);
            promptInitialChoices();
        })
        .catch(err => {
            if (err) throw err;
        });
};

// Function to add a department to the DB
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

// Function to add a role to the DB
addARole = ({roleName, salary, roleDepartment}) => {
    db.addRole(roleName, salary, roleDepartment)
        .then(res => {
            console.log('Role added!');
            promptInitialChoices();
        })
        .catch((err) => {
            if (err) throw err;
        });
};

// Function to add an employee to the DB
addAnEmployee = ({empFirstName, empLastName, empRole, empManager}) => {
    db.addEmp(empFirstName, empLastName, empRole, empManager)
        .then(res => {
            console.log('Employee added!');
            promptInitialChoices();
        })
        .catch((err) => {
            if (err) throw err;
        });
};

// Function to update an employee's role in the DB
updateAnEmployee = ({empChoices, roleChoices}) => {
    db.updateEmp(empChoices, roleChoices)
        .then(res => {
            console.log('Employee Updated!');
            promptInitialChoices();
        })
        .catch((err) => {
            if (err) throw err;
        });
};

updateDeptArray = () => {
    db.getDepChoices()
        .then(res => {
            depChoices = [];
            for (let i = 0; i < res.length; i++) {
                depChoices.push({
                    name: res[i].name,
                    value: res[i].id
                })
            }
        })
        .catch((err) => {
            if (err) throw err;
        });
};

//old set up
/* db.getAllDep().then(res => {
    const depChoices = [];
    for (let i = 0; i < res.length; i++) {
        depChoices.push({
            name: res[i].name,
            value: res[i].id
        })
    } */