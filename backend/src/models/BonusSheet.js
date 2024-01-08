const InvalidInputException = require("../exceptions/InvalidInputException");

class BonusComputationSheet {
  constructor(
    name,
    employeeID,
    department,
    year,
    ordersEvaluationEntries,
    leadershipCompetence,
    opennessToEmployee,
    socialBehaviorToEmployee,
    attitudeTowardsClient,
    communicationSkills,
    integrityToCompany,
    feedback,
    status,
    totalBonus,
    _id = undefined
  ) {
    if (
      name === null || name === undefined ||
      employeeID === null || employeeID === undefined ||
      department === null || department === undefined ||
      year === null || year === undefined ||
      ordersEvaluationEntries === null || ordersEvaluationEntries === undefined ||
      leadershipCompetence === null || leadershipCompetence === undefined ||
      opennessToEmployee === null || opennessToEmployee === undefined ||
      socialBehaviorToEmployee === null || socialBehaviorToEmployee === undefined ||
      attitudeTowardsClient === null || attitudeTowardsClient === undefined ||
      communicationSkills === null || communicationSkills === undefined ||
      integrityToCompany === null || integrityToCompany === undefined ||
      feedback === null || feedback === undefined ||
      status === null || status === undefined ||
      totalBonus === null || totalBonus === undefined) {
      throw new InvalidInputException("Field of bonus computation sheet is null or undefined");
    }
    this._id = _id;
    this.name = name;
    this.employeeID = employeeID;
    this.department = department;
    this.year = year;
    this.ordersEvaluationEntries = ordersEvaluationEntries;
    this.leadershipCompetence = leadershipCompetence;
    this.opennessToEmployee = opennessToEmployee;
    this.socialBehaviorToEmployee = socialBehaviorToEmployee;
    this.attitudeTowardsClient = attitudeTowardsClient;
    this.communicationSkills = communicationSkills;
    this.integrityToCompany = integrityToCompany;
    this.feedback = feedback;
    this.status = status;
    this.totalBonus = totalBonus;
  }
}

module.exports = BonusComputationSheet;