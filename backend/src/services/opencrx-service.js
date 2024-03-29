const axios = require("axios");

// OrangeHRM API endpoint for retrieving employees
const baseUrl = "https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX";
const openCRXAccount = baseUrl + "/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account";


const credentials = {
  username: "guest",
  password: "guest"
};

const config = {
  headers: {
    "Accept": "application/json"
  },
  auth: credentials
};

/**
 * --
 * @return {Promise<*>}
 * */
exports.getAccounts = async function() {
  const contacts = await axios.get(
    `${baseUrl}/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account`,
    config
  );

  const accounts = contacts.data.objects;

  let salesmanAccounts = [],
    customerAccounts = [];

  accounts.map((value) => {
    // Check if @type LegalEntity
    if (value["@type"].endsWith("LegalEntity")) {
      const {
        accountRating,
        fullName
      } = value;

      customerAccounts.push({
        fullName,
        accountRating,
        uid: value["identity"].split("account/")[1],
        type: value["@type"].split("account1.")[1]
      });
    }

    // Check if @jobRole exists, then check if its equal 'Sales'
    if (value["department"] && value["department"] === "Sales") {
      const {
        firstName,
        middleName,
        lastName,
        governmentId,
        department
      } = value;

      salesmanAccounts.push({
        firstName,
        middleName,
        lastName,
        governmentId,
        uid: value["identity"].split("account/")[1],
        type: value["@type"].split("account1.")[1],
        department
      });
    }
  });

  return [salesmanAccounts, customerAccounts];
};

/**
 * --
 * @return {Promise<*>}
 * */
exports.listCustomerAccounts = async function() {
  const accounts = await this.getAccounts();

  return accounts[1];
};

/**
 * --
 * @return {Promise<*>}
 * */
exports.listSalesmanAccounts = async function() {
  let accounts = await this.getAccounts();

  return accounts[0];
};

/**
 * --
 * @return {Promise<*>}
 * */
exports.getCustomerAccountFromOpenCRX = async function(uid) {
  const contact = await axios.get(
    `${baseUrl}/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/${uid}`,
    config
  );

  const {
    accountRating,
    fullName
  } = contact.data;

  return {
    fullName,
    accountRating,
    uid: contact.data["identity"].split("account/")[1],
    type: contact.data["@type"].split("account1.")[1]
  };
};

/**
 * --
 * @return {Promise<*>}
 * */
exports.getAccountOfSalesmanFromOpenCRX = async function(uid) {
  const contact = await axios.get(
    `${baseUrl}/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/${uid}`,
    config
  );

  const {
    firstName,
    middleName,
    lastName,
    governmentId,
    department
  } = contact.data;

  return {
    firstName,
    middleName,
    lastName,
    governmentId,
    department
  };
};

/**
 * --
 * @return {Promise<*>}
 * */
exports.listSalesOrders = async function() {
  const salesOrder = await axios.get(
    `${baseUrl}/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder`,
    config
  );

  const sales = salesOrder.data.objects;

  let orders = [];

  sales.map((value) => {
    const {
      contractNumber,
      name,
      totalAmount
    } = value;

    orders.push({
      name,
      contractNumber,
      totalAmount: totalAmount.split(".")[0],
      contractID: value["@href"].split("salesOrder/")[1],
      createdAt: parseInt(value["createdAt"].split("-")[0]),
      salesmanUID: value["salesRep"]["@href"].split("account/")[1],
      customerUID: value["customer"]["@href"].split("account/")[1],
      salesOrderUID: value["@href"].split("salesOrder/")[1]
    });
  });

  return orders;
};

/**
 * --
 * @return {Promise<*>}
 * */
exports.getSalesOrderByContract = async function(contractId) {
  const response = await axios.get(
    `${baseUrl}/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder/${contractId}`,
    config
  );

  const {
    contractNumber,
    name,
    totalAmount
  } = response.data;

  return {
    name,
    contractNumber,
    totalAmount: parseFloat(totalAmount.split(".")[0]),
    contractID: response.data["@href"].split("salesOrder/")[1],
    createdAt: parseInt(response.data["createdAt"].split("-")[0]),
    salesmanUID: response.data["salesRep"]["@href"].split("account/")[1],
    customerUID: response.data["customer"]["@href"].split("account/")[1],
    salesOrderUID: response.data["@href"].split("salesOrder/")[1]
  };
};


/**
 * To find all SalesOrders by SalesRepUID
 * @return {Promise<*>}
 * @param governmentid
 */
exports.getSalesOrdersBySalesRepGovernment = async function(governmentid) {
  const orders = await this.listSalesOrders();

  return orders.filter(order => order.salesRep === governmentid);
};


/**
 * --
 * @return {Promise<*>}
 * */
exports.getSalesOrderByContractID = async function(contractID) {
  const orders = await this.listSalesOrders();

  return orders.filter(order => order.contractID === contractID);
};

/**
 * --
 * @return {Promise<*>}
 * */
exports.getSalesmanAssignedContractsFromOpenCRX = async function(salesmanUID) {
  const contracts = await axios.get(
    `${baseUrl}/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/${salesmanUID}/assignedContract`,
    config
  );

  const contract = contracts.data.objects;

  let data = [];

  contract.map((value) => {
    const {
      name,
      contractNumber
    } = value;

    data.push({
      name,
      contractNumber,
      contractID: value["identity"].split("salesOrder/")[1],
      createdAt: parseInt(value["createdAt"].split("-")[0])
    });
  });

  return data;
};

/**
 * --
 * @return {Promise<*>}
 * */
exports.getPositionsOfSalesOrder = async function(salesOrderID) {
  const contract = await axios.get(
    `${baseUrl}/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder/${salesOrderID}/position`,
    config
  );

  const position = contract.data.objects;

  let data = [];

  position.map((value) => {
    const {
      quantity,
      pricePerUnit,
      productDescription,
      taxAmount,
      amount
    } = value;

    const quantity_ = parseFloat(quantity),
      pricePerUnit_ = parseFloat(pricePerUnit),
      amount_ = parseFloat(amount),
      taxAmount_ = parseFloat(taxAmount);

    data.push({
      positionID: value["identity"].split("product/")[1],
      productID: value["product"]["@href"].split("product/")[1],
      productDescription,
      pricePerUnit_,
      quantity_,
      taxAmount_,
      amount_
    });
  });

  return data;
};

/**
 * --
 * @return {Promise<*>}
 * */
exports.listProducts = async function() {
  const request = await axios.get(
    `${baseUrl}/org.opencrx.kernel.product1/provider/CRX/segment/Standard/product`,
    config
  );

  const products = request.data.objects;

  let data = [];

  products.map((value) => {
    const {
      name,
      productNumber,
      description
    } = value;

    data.push({
      name,
      description,
      productNumber,
      productID: value["@href"].split("product/")[1]
    });
  });

  return data;
};

/**
 * --
 * @return {Promise<*>}
 * @param productID
 * */
exports.getProductByID = async function(productID) {
  const request = await axios.get(
    `${baseUrl}/org.opencrx.kernel.product1/provider/CRX/segment/Standard/product/${productID}`,
    config
  );

  const product = request.data;

  const {
    name,
    productNumber,
    description
  } = product;

  return {
    name,
    description,
    productNumber,
    productID: product["@href"].split("product/")[1]
  };
};
