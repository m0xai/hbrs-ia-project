exports.get = async function(db, id) {
  return await db.collection("employees").findOne({ id: id })
}

exports.list = async function(db, filters) {
  // TODO: set filters while fetching list of employees
  return await db.collection("employees").find().toArray()
}

exports.create = async function(db, employee) {
  return await db.collection("employees").insertOne(employee);
}