/**
 * this model specifies Record (PerformanceRecord
 * @param {int} rid
 * @param {String} description
 * @param {int} targetValue
 * @param {int} actualValue
 * @param {int} year
 */
class Record {
  constructor(sid, description, targetValue, actualValue, year) {
    this.sid = sid;
    this.description = description;
    this.targetValue = targetValue;
    this.actualValue = actualValue;
    this.year = year;
  }
}


module.exports = Record;