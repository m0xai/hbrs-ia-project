const express = require("express");
const router = express.Router();
const {checkAuthorization} = require("../middlewares/auth-middleware");

/*
    In this file is the routing for the REST-endpoints under /api managed
 */

const authApi = require("../apis/auth-api"); //api-endpoints are loaded from separate files
router.post("/login", authApi.login); //the function decides which request type should be accepted
router.delete("/login", checkAuthorization(), authApi.logout); //middlewares can be defined in parameters
router.get("/login", authApi.isLoggedIn); //the function, which handles requests is specified as the last parameter

const userApi = require("../apis/user-api");
router.get("/user", checkAuthorization(), userApi.getSelf);

const peopleDemoApi = require("../apis/people-demo-api");
router.get("/people", checkAuthorization(), peopleDemoApi.getPeople);

const openCRMApi = require("../apis/opencrx-api");
router.get("/accounts", openCRMApi.getAccounts);

const reportsApi = require("../apis/report-api");
router.get("/reviews/:reportId", checkAuthorization(), reportsApi.getReport);
router.get("/reviews", checkAuthorization(), reportsApi.list);
router.post("/reviews", checkAuthorization(), reportsApi.create);

const employeeApi = require("../apis/employee-api");
router.get("/employees/:employeeId", checkAuthorization(), employeeApi.get);
router.get("/employees", checkAuthorization(), employeeApi.list);
router.post("/employees", checkAuthorization(), employeeApi.create);
router.put("/employees/:employeeId", checkAuthorization(), employeeApi.update);
router.delete("/employees/:employeeId", checkAuthorization(), employeeApi.delete);

const orangeHRMApi = require("../apis/orangehrm-api");
router.post("/orange/login", checkAuthorization(), orangeHRMApi.login);
router.get("/orange/employees", checkAuthorization(), orangeHRMApi.getAllEmployees);
router.get("/orange/employees/:id", checkAuthorization(), orangeHRMApi.getEmployee);
router.put("/orange/employees/:id", checkAuthorization(), orangeHRMApi.updateEmployee);

module.exports = router;