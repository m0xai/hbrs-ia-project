const employeeService = require('../services/employee-service');

exports.list = function(req, res) {
  const db = req.app.get('db');

  employeeService.list(db).then(employeeList => {
    console.log(employeeList);
    res.send(employeeList);
  });
};

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
  const db = req.app.get('db');

  employeeService.create(db, req.body).then(employee => {
    console.log(employee);
    res.send(employee);
  });
};

exports.update = function(req, res) {
  const db = req.app.get('db');
// Note: Pass id always as param, somehow finds mongose that way the objects
  employeeService.update(db, req.params._id, req.body).then(employee => {
    console.log('Updated: ', employee);
    res.send(employee);
  });
};

exports.delete = function(req, res) {
  const db = req.app.get('db');

  employeeService.delete(db, req.params._id).then(employee => {
    res.send({message: 'Employee with ID: ' + employee.id + ' successfully deleted.'});
  });
};