const axios = require('axios');
const qs = require('querystring');

let accessToken = null;

const orangeHRMBaseURL = 'https://sepp-hrm.inf.h-brs.de/symfony/web/index.php';

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

async function sendLoginRequest() {

  const res = await axios.post(`${orangeHRMBaseURL}/oauth/issueToken`, body, config);
  if (res.data.error) {
    throw Error(res.data.error);
  }
  return res;
}

let orange_access_token = '';

exports.login = async function() {
  try {
    const response = await sendLoginRequest();
    console.log(response.data);
    orange_access_token = response.data['access_token'];
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

exports.get_access_token = async function() {
  if (orange_access_token) {
    return orange_access_token;
  } else {
    // If token is invalid, send another request
  }
};