/* Adds data to the tables  */


INSERT INTO department (name)
VALUES 
    ('Sales'),
    ('Accounting'),
    ('Human Resources'),
    ('Supplier Relations'),
    ('Customer Service'),
    ('Reception'),
    ('Warehouse');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Salesperson', 65000, 1),
    ('Lead Accountant', 60000, 2),
    ('Accountant', 55000, 2),
    ('Receptionist', 40000, 6),
    ('Supplier Relations Rep', 50000, 4),
    ('Quality Assurance Rep', 50000, 4),
    ('Customer Service Rep', 50000, 5),
    ('Human Resources Rep', 55000, 3),
    ('Foreman', 50000, 7),
    ('Temp', 30000, 1),
    ('Manager', 66000, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Michael', 'Scott', 11, null),
    ('Jim', 'Halpert', 1, 1),
    ('Dwight', 'Schrute', 1, 1),
    ('Andy', 'Bernard', 1, 1),
    ('Stanley', 'Hudson', 1, 1),
    ('Phylis', 'Vance', 1, 1),
    ('Ryan', 'Howard', 10, 1),
    ('Darryl', 'Philbin', 9, 1),
    ('Pam', 'Beesly', 4, 1),
    ('Meredith', 'Palmer', 5, 1),
    ('Creed', 'Bratton', 5, 1),
    ('Devon', 'White', 5, 1),
    ('Toby', 'Flenderson', 8, 1),
    ('Kelly', 'Kapoor', 7, 1),
    ('Kevin', 'Malone', 3, 1),
    ('Oscar', 'Martinez', 3, 1),
    ('Angela', 'Martin', 2, 1);