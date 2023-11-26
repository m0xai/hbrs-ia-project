const employeeService = require('../services/employee-service');

exports.get = function(req, res) {
  const db = req.app.get('db');
  employeeService.get(db, req.params.employeeId).then(employee => {
      console.log(employee);
      res.send(employee);
    }
  );
};

exports.create = function(req, res) {
  // TODO: add exception handling to all REST methods
  const db = req.app.get("db")

  employeeService.create(db, req.body).then(employee => {
    console.log(employee);
    res.send(employee)
  })
}