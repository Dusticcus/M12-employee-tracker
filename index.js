const sequelize = require('./config/connection');
const cTable = require('console.table');

const { QueryTypes } = require('sequelize');
const inquirer = require('inquirer');

const Employee = require('./models/Employee');
const Department = require('./models/Department');
const Role = require('./models/Role');


// --------Get Employee Data-------------
async function getEmployees() {
    var employees = [];
    const empData = [];
    employees = await Employee.findAll()
        .then(function (employees) {
            for (i = 0; i < employees.length; i++) {
                empData.push(employees[i].dataValues);
            }
        })
        .then(() => {
            console.table(empData);
            viewAllOptions();
        });
}
// ------------------------------

// ---- Create Employee Data------
async function createEmployee() {
    inquirer
        .prompt([
            {
                name: "newEmployeeFirstName",
                type: "input",
                message: "Enter Employee First Name",
            },
            {
                name: "newEmployeeLastName",
                type: "input",
                message: "Enter Employee Last Name",
            },
            {
                name: "newEmployeeJobTitle",
                type: "number",
                message: "Enter Employee Role Title ID",
            },
        ])
        .then((answers) => {
            Employee.create({
                first_name: answers.newEmployeeFirstName,
                last_name: answers.newEmployeeLastName,
                role_id: answers.newEmployeeJobTitle
            })
                .then(() => {
                    getEmployees();
                });
        })
}
// ------------------------------

// ---- UPDATE Employee Data------
function updateEmployee() {
    inquirer
        .prompt([
            {
                name: "updateEmployeeById",
                type: "number",
                message: "Enter the Employee ID of whom you want to update information",
            },
            {
                name: "updateEmployeeFirstName",
                type: "input",
                message: "Enter Employee First Name",
            },
            {
                name: "updateEmployeeLastName",
                type: "input",
                message: "Enter Employee Last Name",
            },
            {
                name: "updateEmployeeJobTitle",
                type: "number",
                message: "Enter Employee Role Title ID",
            },
        ])
        .then((answers) => {
            Employee.update(
                {
                    first_name: answers.updateEmployeeFirstName,
                    last_name: answers.updateEmployeeLastName,
                    role_id: answers.updateEmployeeJobTitle
                },
                {
                    where: { id: answers.updateEmployeeById },
                }
            )
                .then(() => {
                    getEmployees();
                });
        })
}
// ------------------------------

// ------Get Department Data----
async function getDepartments() {
    var departments = [];
    const deptData = [];
    departments = await Department.findAll()
        .then(function (departments) {
            for (i = 0; i < departments.length; i++) {
                deptData.push(departments[i].dataValues);
            }
        })
        .then(() => {
            console.table(deptData);
            viewAllOptions();
        });
}
// -----------------------------

// ---- Create Department Data------
async function createDepartment() {
    inquirer
        .prompt([
            {
                name: "newDepartmentName",
                type: "input",
                message: "Enter Department Name",
            }
        ])
        .then((answers) => {
            Department.create({
                name: answers.newDepartmentName
            })
                .then(() => {
                    getDepartments();
                });
        })
}
// ------------------------------

// ---- UPDATE Department Data------
function updateDepartment() {
    inquirer
        .prompt([
            {
                name: "updateDepartmentById",
                type: "number",
                message: "Enter the Depoartment ID of whom you want to update information",
            },
            {
                name: "updateDepartmentName",
                type: "input",
                message: "Enter Department Name",
            }
        ])
        .then((answers) => {
            Department.update(
                {
                    name: answers.updateDepartmentName
                },
                {
                    where: { id: answers.updateDepartmentById },
                }
            )
                .then(() => {
                    getDepartments();
                });
        })
}
// ------------------------------

// -------Get Role Data-----
async function getRoles() {
    var roles = [];
    const rolesData = [];
    roles = await Role.findAll()
        .then(function (roles) {
            for (i = 0; i < roles.length; i++) {
                rolesData.push(roles[i].dataValues);
            }
        })
        .then(() => {
            console.table(rolesData);
            viewAllOptions();
        });
}
// ----------------------

// ---- Create Role Data------
async function createRole() {
    inquirer
        .prompt([
            {
                name: "newRoleTitle",
                type: "input",
                message: "Enter Role Title",
            },
            {
                name: "newRoleSalary",
                type: "number",
                message: "Enter Role Salary",
            },
            {
                name: "newRoleDepartmentId",
                type: "input",
                message: "Enter Department ID this Role/Title belongs to",
            },
        ])
        .then((answers) => {
            Role.create({
                title: answers.newRoleTitle,
                salary: answers.newRoleSalary,
                department_id: answers.newRoleDepartmentId
            })
                .then(() => {
                    getRoles();
                });
        })
}
// ------------------------------

// ---- UPDATE Department Data------
function updateRole() {
    inquirer
        .prompt([
            {
                name: "updateRoleById",
                type: "number",
                message: "Enter the Role ID you want to update",
            },
            {
                name: "updateRoleTitle",
                type: "input",
                message: "Enter Role/Title Name",
            },
            {
                name: "updateRoleSalary",
                type: "number",
                message: "Enter Role Salary",
            },
            {
                name: "updateRoleDepartmentId",
                type: "number",
                message: "Enter Department ID",
            }
            
        ])
        .then((answers) => {
            Role.update(
                {
                    title: answers.updateRoleTitle,
                    salary: answers.updateRoleSalary,
                    department_id: answers.updateRoleDepartmentId,
                },
                {
                    where: { id: answers.updateRoleById },
                }
            )
                .then(() => {
                    getRoles();
                });
        })
}
// ------------------------------

// ----Start Prompt and View All Options----
function viewAllOptions() {
    const viewAllOptionsTerminal = new Promise((resolve, reject) => {
        inquirer
            .prompt([
                {
                    name: "viewAllOptions",
                    type: "list",
                    message: "Please choose an option below:",
                    choices: ["View All Employees", "View All Departments", "View All Roles", "Create New Employee", "Create New Department", "Create New Role", "Update Existing Employee", "Update Existing Department", "Update Existing Role"]
                }
            ])
            .then((answers) => {
                if (answers.viewAllOptions === "View All Employees") {
                    resolve(getEmployees());
                }
                else if (answers.viewAllOptions === "View All Departments") {
                    resolve(getDepartments());
                }
                else if (answers.viewAllOptions === "View All Roles") {
                    resolve(getRoles());
                }
                else if (answers.viewAllOptions === "Create New Employee") {
                    resolve(createEmployee());
                }
                else if (answers.viewAllOptions === "Create New Department") {
                    resolve(createDepartment());
                }
                else if (answers.viewAllOptions === "Create New Role") {
                    resolve(createRole());
                }
                else if (answers.viewAllOptions === "Update Existing Employee") {
                    resolve(updateEmployee());
                }
                else if (answers.viewAllOptions === "Update Existing Department") {
                    resolve(updateDepartment());
                }
                else if (answers.viewAllOptions === "Update Existing Role") {
                    resolve(updateRole());
                }
                else {
                    reject();
                }
            })
    })
}
// ----------------------

// Start Program
viewAllOptions();
// -------------