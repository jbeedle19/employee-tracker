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
    console.log(`++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                WELCOME TO EMPLOYEE TRACKER!
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`);
    promptInitialChoices();
});

// Prompt user and refresh arrays everytime menu returns
const promptInitialChoices = () => {
    updateDeptArray();
    updateRoleArray();
    updateEmployeeArray();
    updateManagerArray();
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
                    default: 'Asst to the Rgnl Manager',
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
                addARole(data);
            });
        } else if (initialChoices === 'Add an employee') {
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
                    choices: roleChoices
                },
                {
                    type: 'list',
                    name: 'empManager',
                    message: "Who is the employee's manager?",
                    choices: managerChoices
                }
            ])
            .then((data) => {
                addAnEmployee(data);
            });
        } else if (initialChoices === 'Update an employee') {
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'empChoices',
                    message: 'Which employee would you like to update?',
                    choices: empChoices
                },
                {
                    type: 'list',
                    name: 'roleChoices',
                    message: "What is the employee's new role?",
                    choices: roleChoices
                }
            ])
            .then((data) => {
                console.log(data);
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
            console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n');
            console.table(res);
            console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n');
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
            console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n');
            console.table(res);
            console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n');
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
            console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n');
            console.table(res);
            console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n');
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
            console.log(`++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                    Department Added!
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`);
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
            console.log(`++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                    Role Added!
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`);
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
            console.log(`++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                    Employee Added!
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`);
            promptInitialChoices();
        })
        .catch((err) => {
            if (err) throw err;
        });
};

// Function to update an employee's role in the DB
updateAnEmployee = ({roleChoices, empChoices}) => {
    db.updateEmp(roleChoices, empChoices)
        .then(res => {
            console.log(`++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                    Employee Updated!
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`);
            promptInitialChoices();
        })
        .catch((err) => {
            if (err) throw err;
        });
};

// Functions for updating the arrays
// Update Department array
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

// Update Role array
updateRoleArray = () => {
    db.getRoleChoices()
        .then(res => {
            roleChoices = [];
            for (let i = 0; i < res.length; i++) {
                roleChoices.push({
                    name: res[i].title,
                    value: res[i].id
                })
            }
        })
        .catch((err) => {
            if (err) throw err;
        });
};

// Update Employee array
updateEmployeeArray = () => {
    db.getEmpChoices()
        .then(res => {
            empChoices = [];
            for (let i = 0; i < res.length; i++) {
                empChoices.push({
                    name: res[i].name,
                    value: res[i].id
                })
            }
        })
        .catch((err) => {
            if (err) throw err;
        });
};

// Update Manager array
updateManagerArray = () => {
    db.getManagerChoices()
        .then(res => {
            managerChoices = [];
            for (let i = 0; i < res.length; i++) {
                managerChoices.push({
                    name: res[i].name,
                    value: res[i].id
                })
            }
        })
        .catch((err) => {
            if (err) throw err;
        });
};