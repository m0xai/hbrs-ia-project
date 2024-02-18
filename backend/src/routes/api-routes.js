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


/** Bravo6 App Services API */
const performanceRecordAPI = require("../apis/performance-record-api");
const salesmanAPI = require("../apis/salesman-api");
const bonusAPI = require("../apis/bonus-calculate-api");
const ordersAPI = require("../apis/opencrx-api");

// Salesman
router.post("/salesman/create/", salesmanAPI.addSalesman);
router.get(`/salesman`, salesmanAPI.getSalesmen);
router.get(`/salesman/:id`, salesmanAPI.getSalesman);
router.delete("/salesman/delete/:id", salesmanAPI.deleteSalesman);

// Bonus-Salary
router.post("/salesman/:id/bonussalary", bonusAPI.postVerifiedBonusSalary);
router.post("/salesman/:id/unverified/bonussalary", bonusAPI.createUnverifiedBonusSalary);
router.get(`/salesman/:id/bonussalary`, bonusAPI.getBonusOfSalesman);
router.get(`/bonussalary`, bonusAPI.getBonuses);
router.get(`/bonussalary/:id`, bonusAPI.getBonusOfSalesmanFromMongoDB);
router.delete("/salesman/:id/bonussalary/orangeHRM", bonusAPI.deleteBonusFromOrangeHRM);
router.delete("/salesman/:id/bonussalary/mongoDB", bonusAPI.deleteBonusFromMongoDB);

// Performance Record
router.post("/performancerecord/create", performanceRecordAPI.addOrUpdatePerformanceRecord);
router.get("/performancerecord/:id", performanceRecordAPI.getPerformanceRecord);
router.get("/performancerecord", performanceRecordAPI.getPerformanceRecords);
router.delete("/performancerecord/delete/:id", performanceRecordAPI.deletePerformanceRecord);

// Orders Evaluation
// Accounts
router.get("/orders/accounts", ordersAPI.getAccounts);
router.get("/orders/accounts/salesman", ordersAPI.listSalesmenAccounts);
router.get("/orders/accounts/customer", ordersAPI.listCustomerAccounts);
router.get("/orders/accounts/salesman/:id", ordersAPI.getSalesmanAccount);
router.get("/orders/accounts/customer/:id", ordersAPI.getCustomerAccount);
router.get("/orders/accounts/salesman/:id/contracts", ordersAPI.getSalesmanAssignedContracts);
// SalesOrders
router.get("/orders/salesOrder/", ordersAPI.getSalesOrders);
router.get("/orders/salesOrder/:id", ordersAPI.getSalesOrder);
router.get("/orders/salesOrder/:id/position", ordersAPI.getPositionsOfOneSalesOrder);
// Products
router.get("/orders/products", ordersAPI.getProducts);
router.get("/orders/products/:id", ordersAPI.getProduct);

module.exports = router;