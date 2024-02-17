const axios = require("axios");
const {getAccessToken, getOrangeHRMBaseURL} = require("./orangehrm-service-helpers");

const getHeaders = () => ({
  "Authorization": `Bearer ${getAccessToken()}`,
  "Content-Type": "application/x-www-form-urlencoded",
  "Accept": "application/json"
});

/**
 * inserts a new salesman into database
 * @param db target database
 * @param {Salesman} salesman new salesman
 * @return {Promise<any>}
 */
exports.createSalesman = async function(db, salesman) {
  return (await db.collection("salesman").insertOne(salesman)).insertedId; //return unique ID
};

/**
 * retrieves salesman from database by its id
 * @param db source database
 * @param {Integer} id
 * @return {Promise<Salesman>}
 */
exports.getSalesman = async function(db, id) {
  const parseID = parseInt(id);
  return db.collection("salesman").findOne({id: parseID});
};

/**
 * Get Salesman entity from OrangeHRM external source
 * @return {Promise<*>}
 * @param id
 */
exports.getSalesmanFromOrangeHRM = async function(id) {
  return await axios.get(`${getOrangeHRMBaseURL()}/api/v1/employee/${id}`, {
    headers: getHeaders()
  })
    .then(() => {
      return employee_().then((value) => {
        return filterSalesman(value.data["data"]);
      });
    });
};

/**
 * --
 * @return {Promise<*>}
 */
exports.listSalesmenFromOrangeHRM = async function() {
  return await axios.get(`${getOrangeHRMBaseURL()}/api/v1/employee/search`, {
      headers: getHeaders()
    }
  )
    .then((value) => {
      return filterAllSalesman(value.data["data"]);
    });
};

// Architectural Pattern: Transforming / filtering data
function filterSalesman(data) {
  return data["unit"] !== "Sales" ? {unit: "NoSales"} : {
    firstname: data["firstName"],
    lastname: data["lastName"],
    governmentid: parseInt(data["code"]),
    employeeid: data["employeeId"],
    unit: data["unit"]
  };
}

function filterAllSalesman(data) {
  let credentials = [];

  for (let info of data) {
    // Filter the employees to unit 'Sales'
    if (info["unit"] !== "Sales") continue;

    credentials.push({
      firstname: info["firstName"],
      lastname: info["lastName"],
      employeeid: info["employeeId"],
      governmentid: parseInt(info["code"]),
      unit: info["unit"]
    });
  }

  return credentials;
}

/** Bonussalary of Salesman */

/**
 * --
 * @return {Promise<*>}
 * @param db
 * @param bonusSalary
 */
exports.postApprovedBonusSalaryForSalesman = async function(db, bonusSalary) {
  let employee_;
  let accessToken;

  // Update given bonus salary in MongoDB
  await db.collection("bonusSalary").updateOne(
    {sid: bonusSalary.sid, year: bonusSalary.year},
    {
      $set: {
        remark: bonusSalary.remark,
        verified: true
      }
    }
  );

  // Save the verified bonus in OrangeHRM
  return await axios.post(`${getOrangeHRMBaseURL()}/api/v1/employee/${bonusSalary.sid}/bonussalary`,
    {
      year: parseInt(bonusSalary.year),
      value: parseInt(bonusSalary.value)
    },
    {
      headers: getHeaders()
    }
  )
    // At last, return the data as a Promise<> Object
    .then((val) => {
      return val;
    });
};

/**
 * --
 * @return {Promise<*>}
 * @param db
 * @param bonusSalary
 */
exports.postUnverifiedBonusSalaryForSalesman = async function(db, bonusSalary) {
  return (await db.collection("bonusSalary").insertOne(bonusSalary)).insertedId; // return unique ID
};

/**
 * --
 * @return {Promise<*>}
 */
exports.getAllBonusesFromMongoDB = async function(db) {
  return (await db.collection("bonusSalary").find({}).toArray());
};

/**
 * --
 * @return {Promise<*>}
 * @param db
 * @param employeeID
 */
exports.getBonusSalaryOfSalesmanFromMongoDB = async function(db, employeeID) {
  return db.collection("bonusSalary").find({sid: employeeID}).toArray();
};

/**
 * --
 * @return {Promise<*>}
 * @param id
 */
exports.getBonusSalaryOfSalesman = async function(id) {
  return await axios.get(`${getOrangeHRMBaseURL()}/api/v1/employee/${id}/bonussalary`, {
      headers: getHeaders()
    }
  )
    // At last, return the data as a Promise<> Object
    .then(value => {
      return value.data["data"];
    });
};

/**
 * --
 * @return {Promise<*>}
 * @param id
 * @param year
 * @param value
 */
exports.deleteBonusSalaryOfSalesmanInOrangeHRM = async function(id, year, value) {
  return await axios.delete(`${getOrangeHRMBaseURL()}/api/v1/employee/${id}/bonussalary`,
    {
      headers: getHeaders(),
      data: {
        year: year,
        value: value
      }
    }
  )
    // At last, return the data as a Promise<> Object
    .then(value => {
      return value.data["data"];
    });
};

/**
 * Deletes bonus in MongoDB by SID
 * @param db source database
 * @param sid
 * @param year Year of Bonus Evaluation
 */
exports.deleteBonusSalaryOfSalesmanInMongoDB = async function(db, sid, year) {
  await db.collection("bonusSalary").deleteOne({sid: sid, year: year});
};

/**
 * retrieves salesman from database by its id
 * @param db source database
 * @return {Promise<Salesman>}
 */
exports.getAllSalesman = async function(db) {
  return await db.collection("salesman").find({}).toArray();
};

/**
 * deletes salesman from database by its id
 * @param db source database
 * @param {Integer} id
 * @return {Promise<void>}
 */
exports.deleteSalesmanFromMongoDB = async function(db, id) {
  return db.collection("salesman").deleteOne({id: parseInt(id)});
};
;

