const axios = require("axios");
const qs = require("querystring");

let accessToken = null;

const orangeHRMBaseURL = "https://sepp-hrm.inf.h-brs.de/symfony/web/index.php";
exports.getOrangeHRMBaseURL = function() {
  return orangeHRMBaseURL;
};

const body = qs.stringify({
  client_id: "api_oauth_id",
  client_secret: "oauth_secret",
  grant_type: "password",
  username: "zopcuk",
  password: "*Safb02da42Demo$"
});
const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Accept": "application/json"
  }
};


async function sendLoginRequest() {
  const res = await axios.post(`${orangeHRMBaseURL}/oauth/issueToken`, body, config);
  if (res.data.error) {
    throw Error(res.data.error);
  }
  return res;
}


exports.loginOrangeHRM = async function() {
  try {
    const response = await sendLoginRequest();
    console.log(response.data);
    setAccessToken(response.data["access_token"]);
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

function setAccessToken(token) {
  accessToken = token;

  // Set the token for all future axios requests
  axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return token;
}

exports.getAccessToken = function() {
  return accessToken;
};
