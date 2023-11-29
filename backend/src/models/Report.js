/**
 * This model describes how a report object presented, which belongs to an employee
 */
class Report {
  constructor(period, opinionSum, remarks) {
    this.period = period;
    this.opinionSum = opinionSum;
    this.remarks = remarks;
  }
}

module.exports = Report;