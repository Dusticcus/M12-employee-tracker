const Employee = require('./Employee');
const Role = require('./Role');
const Department = require('./Department');

Department.hasMany(Role, {
  foreignKey: 'department_id',
  ondelete: 'CASCADE'
});

Role.belongsTo(Department, {
  foreignKey: 'department_id',
});

Role.hasMany(Employee, {
  foreignKey: 'role_id',
});

Employee.belongsTo(Role, {
  foreignKey: 'role_id',
});

module.exports = {Employee, Department, Role};