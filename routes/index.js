var express = require('express');
var router = express.Router();
const { paymentMonitor } = require("../lib/payment_monitor");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('./items/');
});

router.get('/check', function(req, res, next) {
  paymentMonitor();
});

module.exports = router;
