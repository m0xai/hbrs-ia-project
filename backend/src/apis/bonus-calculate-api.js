const salesmanService = require("../services/salesman-service");
const Bonus = require("../models/Bonus");

/**
 * Create Bonus Salary of Salesman
 * @return void
 * */
exports.postVerifiedBonusSalary = (req, res) => {
  const bonusSalary = new Bonus(req.params.id, req.body.year, req.body.value, req.body.remark, req.body.verified);

  salesmanService.postApprovedBonusSalaryForSalesman(req.app.get("db"), bonusSalary)
    .then((value) => res.send(value))
    .catch(value => res.send(`ERROR CODE ${value}`));
};

/**
 * Creates unverified Bonus Salary of Salesman
 * @return void
 * */
exports.createUnverifiedBonusSalary = (req, res) => {
  const bonusSalary = new Bonus(req.params.id, req.body.year, req.body.value, req.body.remark, req.body.verified);

  salesmanService.createUnverifiedBonusSalaryForSalesman(req.app.get("db"), bonusSalary)
    .then((value) => res.send(value))
    .catch(value => res.send(`ERROR CODE ${value}`));
};

/**
 * Fetches single Bonus Salary of Salesman
 * @return void
 * */
exports.getBonusOfSalesman = (req, res) => {
  salesmanService.getBonusSalaryOfSalesman(req.params.id)
    .then(value => res.send(value))
    .catch(() => res.send(`{}`));
};

/**
 * Fetches single Bonus Salary of Salesman
 * @return void
 * */
exports.getBonusOfSalesmanFromMongoDB = (req, res) => {
  salesmanService.getBonusSalaryOfSalesmanFromMongoDB(req.app.get("db"), req.params.id)
    .then(value => res.status(200).send(value))
    .catch(() => res.send(`{}`));
};

/**
 * Fetches all Bonus Salaries
 * @return void
 * */
exports.getBonuses = (req, res) => {
  salesmanService.getAllBonusesFromMongoDB(req.app.get("db"))
    .then(value => res.send(value))
    .catch(() => res.send(`{}`));
};

/**
 * Deletes a Bonus Salaries by id
 * @return void
 * */
exports.deleteBonusFromOrangeHRM = (req, res) => {
  salesmanService.deleteBonusSalaryOfSalesmanInOrangeHRM(req.params.id, req.body.year, req.body.value)
    .then(value => res.send(value))
    .catch(() => res.status(500).send());
};

/**
 * Deletes a Bonus Salaries by id
 * @return void
 * */
exports.deleteBonusFromMongoDB = (req, res) => {
  salesmanService.deleteBonusSalaryOfSalesmanInMongoDB(req.app.get("db"), req.params.id, req.body.year)
    .then(value => res.send(value))
    .catch(value => res.send(`ERROR CODE ${value}`));
};
