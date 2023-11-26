const employeeService = require('../services/employee-service');

exports.get = function(req, res) {
  const db = req.app.get('db');
  //! Employee ID as param accessible, but can't find one in collection
  employeeService.get(db, req.body._id).then(employee => {
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

exports.list = function(req, res) {
  const db = req.app.get("db")

  employeeService.list(db).then(employeeList => {
    console.log(employeeList);
    res.send(employeeList)
  })
}