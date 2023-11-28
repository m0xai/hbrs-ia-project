
exports.create = async function(db, report) {
  return await db.collection("reports").insertOne(report)
}

exports.list = async function(db) {
  return await db.collection("reports").find().toArray();
}

exports.get = async function(db, id) {
  return await db.collection("reports").findOne({ id: id})
}