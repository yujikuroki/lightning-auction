var express = require('express');
var router = express.Router();
const { createInvoice } = require("../lib/btc_payment")
const { Auctions, Auction } = require("../lib/auctions")
const invoices = require('../lib/invoices')

router.get('/', function(req, res, next) {
  const auctions = new Auctions()
  res.render('items/index', { title: '出品物一覧', auctions: auctions })
});

router.get('/:id/', function(req, res, next) {
  const date = new Date(parseInt(req.params.id, 10))
  const auction = new Auction(date)
  res.render('items/show', { title: "ロードバイク", auction: auction })
});

router.post('/:id/invoice_addresses/', function(req, res, next) {
  const invoicePrice = req.body.invoicePrice;
  const loginId = req.cookies.loginId
  console.log(loginId)
  createInvoice(invoicePrice, invoice => {
    invoices.add(loginId, invoice.id, invoicePrice, new Date(), new Date((new Date()).getTime() + 5 * 60 * 1000));
    res.json({
      invoiceUrl: invoice.url
    });
  });
});

module.exports = router;
