const openCRXService = require('../services/opencrx-service');

exports.getAccounts = function(req, res) {
  openCRXService.getAccounts().then(resp => {
    const legalAccounts = resp.objects.filter((account) => {
      console.log(account['@type']);
      return account['@type'] == 'org.opencrx.kernel.account1.LegalEntity';
    });
    res.send(legalAccounts);
  }).catch(_ => {
    res.status(500).send();
  });
};