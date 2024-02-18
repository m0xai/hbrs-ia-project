const performanceRecordService = require("../services/performance-record-service");
const PerformanceRecord = require("../models/Record");

/**
 * Creates performance record of a salesman.
 * @return void
 * */
exports.addOrUpdatePerformanceRecord = (req, res) => {
  const performanceRecord = new PerformanceRecord(req.body.rid, req.body.description, req.body.targetValue, req.body.actualValue, req.body.year);

  performanceRecordService.updatePerformanceRecord(req.app.get("db"), performanceRecord)
    .then(() => {
      res.send();
    });
};

/**
 * Fetches Performance Record of a Salesman
 * @return void
 * */
exports.getPerformanceRecord = (req, res) => {
  performanceRecordService.getPerformanceRecord(req.app.get("db"), req.params.id)
    .then((value) => {
      res.send(value);
    })
    .catch(() => res.send([]));
};

/**
 * Lists all Performance Records
 * @return void
 * */
exports.getPerformanceRecords = (req, res) => {
  performanceRecordService.listPerformanceRecords(req.app.get("db").database)
    .then((value) => {
      res.send(value);
    })
    .catch(value => res.send(`ERROR CODE ${value}`));
};

/**
 * Removes a Performance Record of a Salesman
 * @return void
 * */
exports.deletePerformanceRecord = (req, res) => {
  performanceRecordService.deletePerformanceRecord(req.app.get("db"), req.params.id)
    .then(() => {
      res.send(`The PerformanceRecord with the ID: ${req.params.id} has been successfully deleted.`);
    })
    .catch(value => res.send(`ERROR CODE ${value}`));
};
