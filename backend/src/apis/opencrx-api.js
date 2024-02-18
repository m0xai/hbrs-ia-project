const openCRXService = require("../services/opencrx-service");

/**
 * Fetch all accounts from OpenCRX
 * @return void
 * */
exports.getAccounts = function(req, res) {
  openCRXService.getAccounts().then(resp => {
    const legalAccounts = resp.objects.filter((account) => {
      return account["@type"] == "org.opencrx.kernel.account1.LegalEntity";
    });
    res.send(legalAccounts);
  }).catch(err => {
    res.status(500).send(err);
  });
};

/**
 * Handles the GET-Request for accounts of salesmen from OpenCRX
 * @return void
 * */
exports.listSalesmenAccounts = (req, res) => {
  openCRXService.listSalesmanAccounts()
    .then(value => res.send(value))
    .catch(value => res.send(`ERROR CODE ${value}`));
};

/**
 * Handles the GET-Request for an account of salesman from OpenCrx
 * @return void
 * */
exports.getSalesmanAccount = (req, res) => {
  openCRXService.getAccountOfSalesmanFromOpenCRX(req.params.id)
    .then(value => res.send(value))
    .catch(value => res.send(`ERROR CODE ${value}`));
};

/**
 * Handles the GET-Request for account of customers from OpenCrx
 * @return void
 * */
exports.listCustomerAccounts = (req, res) => {
  openCRXService.listCustomerAccounts()
    .then(value => res.send(value))
    .catch(value => res.send(`ERROR CODE ${value}`));
};

/**
 * Handles the GET-Request for an account of customer from OpenCrx
 * @return void
 * */
exports.getCustomerAccount = (req, res) => {
  openCRXService.getCustomerAccountFromOpenCRX(req.params.id)
    .then(value => res.send(value))
    .catch(value => res.send(`ERROR CODE ${value}`));
};

/**
 * Handles the GET-Request for assigned contracts of a salesman from OpenCrx
 * @return void
 * */
exports.getSalesmanAssignedContracts = (req, res) => {
  openCRXService.getSalesmanAssignedContractsFromOpenCRX(req.params.id)
    .then(value => res.send(value))
    .catch(() => res.status(500).send());
};

/**
 * Handles the GET-Request for sales orders from OpenCrx
 * @return void
 * */
exports.getSalesOrders = (req, res) => {
  openCRXService.listSalesOrders()
    .then(value => res.send(value))
    .catch(value => res.send(`ERROR CODE ${value}`));
};

/**
 * Handles the GET-Request for a specific sales order from OpenCrx
 * @return void
 * */
exports.getSalesOrder = (req, res) => {
  openCRXService.getSalesOrderByContractID(req.params.id)
    .then(value => res.send(value))
    .catch(value => res.send(`ERROR CODE ${value}`));
};

/**
 * Handles the GET-Request for positions of a sales order from OpenCrx
 * @return void
 * */
exports.getPositionsOfOneSalesOrder = (req, res) => {
  openCRXService.getPositionsOfSalesOrder(req.params.id)
    .then(value => res.send(value))
    .catch(() => res.send([]));
};

/**
 * Handles the GET-Request for products of OpenCrx
 * @return void
 * */
exports.getProducts = (req, res) => {
  openCRXService.listProducts()
    .then(value => res.send(value))
    .catch(value => res.send(`ERROR CODE ${value}`));
};

/**
 * Handles the GET-Request for a product of OpenCrx
 * @return void
 * */
exports.getProduct = (req, res) => {
  openCRXService.getProductByID(req.params.id)
    .then(value => res.send(value))
    .catch(value => res.send(`ERROR CODE ${value}`));
};