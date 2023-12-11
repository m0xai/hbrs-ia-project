const orangeHRMService = require('../services/orangehrm-service');
const orangehrmServiceHelpers = require('../services/orangehrm-service-helpers');

exports.login = function(req, res) {
  orangehrmServiceHelpers.login().then(userData => {
    res.send(userData);
  });
};

exports.getAllEmployees = function(req, res) {
  orangeHRMService.getAllEmployees().then((employeeList) => {
    res.send(employeeList.data);
  });
};

exports.getEmployee = function(req, res) {

  orangeHRMService.getEmployee(req.params.id).then((employee) => {
    res.send(employee.data);
  });
};

exports.updateEmployee = function(req, res) {

  orangeHRMService.updateEmployee(req.params.id, req.body).then((employee) => {
    res.send(employee.data);
  });
};


