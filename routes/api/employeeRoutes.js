const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Department, Employee, Role } = require('../../models');

// GET all employees
router.get('/', async (req, res) => {
  try {
    const employeeData = await Employee.findAll({
      // include: [{ model: Department }, { model: Role }],
      // attributes: {
      //   include: [
      //     [
      //       // Use plain SQL to add up the total mileage
      //       sequelize.literal(
      //         '(SELECT SUM(mileage) FROM car WHERE car.driver_id = driver.id)'
      //       ),
      //       'totalMileage',
      //     ],
      //   ],
      // },
    });
    res.status(200).json(employeeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single employee
router.get('/:id', async (req, res) => {
  try {
    const employeeData = await Employee.findByPk(req.params.id, {

    });

    if (!employeeData) {
      res.status(404).json({ message: 'No driver found with that id!' });
      return;
    }

    res.status(200).json(employeeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
