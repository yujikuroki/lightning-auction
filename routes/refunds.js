var express = require('express');
var router = express.Router();
const { getRefundableInvoices } = require('../lib/invoices')

router.get('/', function(req, res, next) {
  const refunds = getRefundableInvoices()
  res.render('refunds/index', { title: '返金一覧', refunds: refunds })
});

module.exports = router;
