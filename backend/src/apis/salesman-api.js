const salesmanService = require("../services/salesman-service");
const Salesman = require("../models/Salesman");

/**
 * Creates a Salesman entity into MongoDB
 * @return void
 * */
exports.addSalesman = (req, res) => {
  const salesman = new Salesman(req.body.governmentid, req.body.employeeid, req.body.firstname, req.body.lastname, req.body.unit);

  salesmanService.createSalesman(req.app.get("db"), salesman)
    .then(() => {
      res.status(200).send(`Salesman created: ${salesman.toString()}`);
    })
    .catch((err) => {
      res.status(500).send(`An error occurred: ${err}`);
    });
};

/**
 * Lists all Salesmen from OrangeHRM
 * @return void
 * */
exports.getSalesmen = (req, res) => {
  salesmanService.listSalesmenFromOrangeHRM()
    .then((value) => {
      res.send(value);
    })
    .catch((err) => {
      res.status(500).send(`An error occurred: ${err}`);
    });
};

/**
 * Handles the GET-Request for Salesman from OrangeHRM
 * @return void
 * */
exports.getSalesman = (req, res) => {
  salesmanService.getSalesmanFromOrangeHRM(req.params.id)
    .then(value => res.send(value))
    .catch((err) => {
      res.send("User doesn't exists!");
    }); // → OrangeHRM
};
/**
 * Handles the DELETE-Request for Salesman from OrangeHRM
 * @return void
 * */
exports.deleteSalesman = (req, res) => {
  salesmanService.deleteSalesmanFromDB(req.app.get("db"), req.params.id)
    .then(() => {
      res.send(`The Salesman with the ID: ${req.params.id} has been successfully deleted!`);
    })
    .catch(() => {
      res.send(`An error occurred while deleting a Salesman with ID: ${req.params.id}.`);
    });
};
