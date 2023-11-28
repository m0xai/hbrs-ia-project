const reportService = require("../services/report-service")

exports.getReport = function(req, res) {
  const db = req.app.get("db")

  reportService.get(db, req.body._id).then(report => {
    console.log(report)
    res.send(report)
  })
}

exports.create = function(req, res) {
  // TODO: Get DB from shared service
  const db = req.app.get("db")

  reportService.create(db, req.body).then(report => {
    res.send(report)
  }).catch(err => {
    console.error(err)
  })
}

  exports.list = function(req, res) {
    const db = req.app.get("db")

    reportService.list(db).then(reports => {
      res.send(reports)
    })
  }