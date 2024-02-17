const {getPerformanceRecordsBySID} = require("./performance-record-service");
const {getSalesmanFromMongoDB} = require("./salesman-service");
const {
  getSalesOrdersBySalesRepUID, getSalesOrdersBySalesRepGovernmentID, getAccountOfCustomerFromOpenCRX,
  getPositionsOfSalesOrder, getProductByProductID
} = require("./order-service");

async function calculateOrderBonus(db, sid, year) {
  let bonus = 0;

  // Alle relevanten Orders für die Bonusberechnung
  const orders = [];

  // Calculate bonus of orders
  /**
   * 1. alle Salesorder vom salesman
   * 2. aktuelles jahr (createdAt) und Wert!=0 (totalBaseAmount) filtern
   * 3. für jede Order einzeln Bonus berechnen
   *   3.1 Kundenname
   *   3.2 Rating
   *   3.3 Positions der Order einzeln durchgehen
   *      3.3.1 Produktname
   *      3.3.2 position amount
   *      3.3.3 bonus pro Position
   *   3.4 Bonus pro Order zu TotalBonus addieren
   * 4. Summe und orders zurückgeben
   */

  const salesman = await getSalesmanFromMongoDB(db, sid);
  let salesOrders = await getSalesOrdersBySalesRepGovernmentID(salesman.governmentid);

  // filter to current year and remove empty Sales Orders
  salesOrders = salesOrders.filter(order => order.createdAt == year && parseFloat(order.totalAmount) !== 0);

  await Promise.all(salesOrders.map(async order => {
    let finishedOrder = {};
    const customer = await getAccountOfCustomerFromOpenCRX(order.customerUID);
    // customername
    finishedOrder.name = customer.fullName;

    //number to calc bonus for each position
    let bonusmultiplikator = 0;
    // Rating
    if (customer.accountRating == 1) {
      finishedOrder.rating = "excellent";
      bonusmultiplikator = 0.09;
    } else if (customer.accountRating == 2) {
      finishedOrder.rating = "very good";
      bonusmultiplikator = 0.06;
    } else if (customer.accountRating == 3) {
      finishedOrder.rating = "good";
      bonusmultiplikator = 0.03;
    } else {
      finishedOrder.rating = "undefined";
    }

    // Get positions
    const positions = await getPositionsOfSalesOrder(order.salesOrderUID);  //openCRXService.getAllPositionsByUID(order.salesOrderUID);
    const itemsSold = [];

    // Go through all positions
    await Promise.all(positions.map(async position => {
      let item = {};

      item.name = (await getProductByProductID(position.productID)).name;
      item.amount = parseInt(position.quantity);
      item.bonus = (parseFloat(position.amount)) * bonusmultiplikator;

      itemsSold.push(item);
    }));

    finishedOrder.itemsSold = itemsSold;

    // full bonus of all positions
    bonus += (parseFloat(order.totalAmount)) * bonusmultiplikator;
    orders.push(finishedOrder);
  }));
  return {bonus: bonus, salesOrders: orders};
}

/**
 * Berechnet den Bonus aller Performance-Kriterien für ein bestimmtes Jahr und gibt Summe, sowie die Kritierien zurück
 * @param db
 * @param sid
 * @param year
 * @returns {Promise<{records: *, bonus: number}>}
 */
async function calculatePerformanceBonus(db, sid, year) {
  const records = await getPerformanceRecordsBySID(db, sid);
  const currentRecords = records.filter(re => re.year == year);
  let bonus = 0;

  currentRecords.forEach(r => {
    if (r.targetValue < r.actualValue) {
      r.bonus = 100;
    } else if (r.targetValue == r.actualValue) {
      r.bonus = 50;
    } else if (r.targetValue - r.actualValue == 1) {
      r.bonus = 20;
    } else {  //if target+actual>1
      r.bonus = 0;
    }
    bonus += r.bonus;
  });
  return {bonus: bonus, records: currentRecords};
}


exports.calculateBonusBySalesmanID = async (db, sid, year) => {

  const orderBonus = await calculateOrderBonus(db, sid, year);
  const performanceBonus = await calculatePerformanceBonus(db, sid, year);

  const bonusSum = orderBonus.bonus + performanceBonus.bonus;

  // Save this bonus to the database
  this.add(db, new Bonus(sid, year, bonusSum, "", null));

  return {salesManID: sid, totalBonus: bonusSum, orderBonus: orderBonus, performanceBonus: performanceBonus};
};

/**
 * insert a new bonus into database
 * @param db target database
 * @param {Bonus} bonus
 */
exports.add = async (db, bonus) => {
  //check if salesman with sid exists
  const salesMan = await getSalesmanFromMongoDB(db, bonus.sid);
  if (!salesMan) {
    throw new Error("Salesman with id " + bonus.sid + " does not exists!");
  }
  //check if bonus for salesman and year already exists
  const bonus2 = (await this.getBonusBySID(db, bonus.sid)).filter(b => b.year == bonus.year);
  if (bonus2.length !== 0) {
    throw new Error("Bonus for salesman " + bonus.sid + " already exists for the year " + bonus.year + ".");
  }

  return (await db.collection("bonus").insertOne(bonus)).insertedId; //return unique ID
};

exports.getBonusBySID = async (db, sid) => {
  return await db.collection("bonus").find({sid: parseInt(sid)}).toArray();
};
