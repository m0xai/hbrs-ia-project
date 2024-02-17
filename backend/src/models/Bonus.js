/**
 * this model specifies Bonus
 * @param {int} sid
 * @param {int} id
 * @param {int} year
 * @param {int} bonusValue
 * @param {String} remark
 * @param {boolean} verified
 *
 */
class Bonus {
  constructor(sid, year, value, remark, verified) {
    this.sid = sid;
    this.year = year;
    this.value = value;
    this.remark = remark;
    this.verified = verified;
  }
}

module.exports = Bonus;
