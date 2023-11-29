class Employee {
  constructor(firstName, lastName, age, department) {
    this._id = undefined;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.deparment = department;
  }
}

module.exports = Employee;