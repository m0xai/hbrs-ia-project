class Record {
  constructor(name, targetValue, actualValue, bonus) {
    this._id = undefined;
    this.name = name;
    this.targetValue = targetValue;
    this.actualValue = actualValue;
    this.bonus = bonus;
  }
}

module.exports = Record