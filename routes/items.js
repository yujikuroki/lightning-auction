var express = require('express');
var router = express.Router();
const { createInvoice } = require("../lib/btc_payment")
const { Auctions, Auction } = require("../lib/auctions")

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
  console.log(invoicePrice);
  createInvoice(invoicePrice, invoiceUrl => {
    res.json({
      invoiceUrl: invoiceUrl
    });
  });
});

module.exports = router;
