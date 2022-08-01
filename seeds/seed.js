const sequelize = require('../config/connection');
const cTable = require('console.table');
const { Employee, Department, Role } = require('../models');

const employeeSeedData = require('./employeeSeedData.json');
const roleSeedData = require('./roleSeedData.json');
const departmentSeedData = require('./departmentSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const departments = await Department.bulkCreate(departmentSeedData);
  const roles = await Role.bulkCreate(roleSeedData);
  const employees = await Employee.bulkCreate(employeeSeedData);

  // for (const { id } of drivers) {
  //   const newLicense = await License.create({
  //     driver_id: id,
  //   });
  // }

  // for (const employee of employeeSeedData) {
  //   const newEmployee = await Employee.create({
  //     ...employee
  //   });
  // }

  console.table("Department Seed Data: ", departmentSeedData);
  console.table("Role Seed Data: ", roleSeedData);
  console.table("Employee Seed Data: ", employeeSeedData);
  process.exit(0);
};

seedDatabase();
