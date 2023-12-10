const orangehrmService = require('../services/orangehrm-service-helpers');

exports.login = function(req, res) {
  orangehrmService.login().then(userData => {
    res.send(userData);
  });
  console.log(res);
};