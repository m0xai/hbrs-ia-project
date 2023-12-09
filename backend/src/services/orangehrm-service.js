const axios = require('axios');
const qs = require('querystring');

let accessToken = null;

const orangeHRMBaseURL = 'sepp-hrm.inf.h-brs.de/symfony/web/index.php';

const body = qs.stringify({
  client_id: 'api_oauth_id',
  client_secret: 'oauth_secret',
  grant_type: 'password',
  username: 'zopcuk',
  password: '*Safb02da42Demo$'
});
const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
  }
};
const res = await axios.post(`${orangeHRMBaseURL}/oauth/issueToken`, body, config);
if (res.data.error) {
  throw Error(res.data.error);
}

exports.login = async function() {
  try {
    const response = await axios.post(orangeHRMBaseURL + '/api/v1/login');
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

// accessToken = res.data['access_token'];