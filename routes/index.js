var express = require('express');
var router = express.Router();
const { sendPayment } = require("../lib/send_payment");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('./items/');
});

router.get('/refund', function(req, res, next) {
  res.render('refund/index', { title: '返金' })
});

router.get('/refund/send', function(req, res, next) {
  sendPayment(req.query.payreq);
  res.render('refund/thanks', { title: "処理完了" })
});

module.exports = router;
