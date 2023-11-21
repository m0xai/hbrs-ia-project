const axios = require('axios');

// OrangeHRM API endpoint for retrieving employees
const openCRXAccount = 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account';

const credentials = {
    username: "guest",
    password: "guest"
}

const config = {
    headers: {
    'Accept': 'application/json'
    },
    auth: credentials,
};
// Function to retrieve employees from OrangeHRM 
exports.getAccounts = async function() {
  try {
    const response = await axios.get(openCRXAccount, config);
    return response.data
  } catch (error) {
    console.error('Error fetching openCRX Account:', error.message);
  }
}
