/**
 * List all performancerecord from database
 * @param db source database
 * @return {Promise<Record>}
 */
exports.listPerformanceRecords = async function(db) {
  return db.collection("performancerecord").find({}).toArray();
};

/**
 * Fetch performancerecord by id
 * @param db source database
 * @param sid
 * @return {Promise<any>}
 */
exports.getPerformanceRecord = async function(db, sid) {
  return db.collection("performancerecord").find({sid: parseInt(sid)}).toArray();
};


/**
 * Create new performanceRecord in database
 * @param db target database
 * @param {Record} performanceRecord new performanceRecord
 * @return {Promise<any>}
 */
exports.updatePerformanceRecord = async function(db, performanceRecord) {
  const result = await db.collection("performancerecord").updateOne({
    sid: performanceRecord.sid,
    description: performanceRecord.description,
    year: performanceRecord.year
  }, {
    $set: {
      "targetValue": performanceRecord.targetValue,
      "actualValue": performanceRecord.actualValue
    }
  });

  if (result.modifiedCount) return result;

  return (await db.collection("performancerecord").insertOne(performanceRecord)).insertedId; // return unique ID
};

/**
 * Remove a PerformanceRecord by id
 * @param db source database
 * @param id
 * @return {Promise<any>}
 */
exports.deletePerformanceRecord = async function(db, id) {
  return db.collection("performancerecord").deleteOne({id: parseInt(id)});
};

