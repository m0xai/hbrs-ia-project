/**
 * this model specifies Salesman
 * @param {string} firstname
 * @param {string} lastname
 * @param {int} id
 */
class Salesman {
  constructor(governmentid, employeeid, firstname, lastname, unit) {
    this.governmentid = governmentid;
    this.employeeid = employeeid;
    this.firstname = firstname;
    this.lastname = lastname;
    this.unit = unit;
  }

  toString() {
    return "(" + this.governmentid + "," + this.employeeid + "," + this.firstname + "," + this.lastname + "," + this.unit + ")";
  }
}

module.exports = Salesman;
