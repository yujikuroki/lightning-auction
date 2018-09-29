var express = require('express');
var router = express.Router();
const { createInvoice } = require("../lib/btc_payment")

router.get('/', function(req, res, next) {
  res.render('items/index', { title: '出品物一覧' })
});

router.get('/:id/', function(req, res, next) {
  res.render('items/show', { title: "自転車" })
});

router.post('/:id/invoice_addresses/', function(req, res, next) {
  const invoicePrice = req.body.invoicePrice;
  console.log(invoicePrice);
  createInvoice(invoicePrice, invoiceUrl => {
    res.json({
      invoiceUrl: invoiceUrl
    });
  });
});

module.exports = router;
