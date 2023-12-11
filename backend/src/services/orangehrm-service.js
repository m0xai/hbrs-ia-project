const {login, getAccessToken, getOrangeHRMBaseURL} = require('./orangehrm-service-helpers');
const axios = require('axios');

const configObj = {
  headers: {
    'Authorization': `Bearer ${getAccessToken()}`,
    'Content-Typ': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
  }
};

exports.getAllEmployees = async function() {
  const request = await axios.get(getOrangeHRMBaseURL() + '/api/v1/employee/search', configObj);
  return request.data;
};

exports.getEmployee = async function(id) {
  const request = await axios.get(getOrangeHRMBaseURL() + '/api/v1/employee/' + id, configObj);
  return request.data;
};

exports.updateEmployee = async function(id, employee) {
  const response = await axios.put(getOrangeHRMBaseURL() + '/api/v1/employee/' + id, employee, configObj);
  return response.data;
};
