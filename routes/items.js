var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('items/index', { title: '出品物一覧' })
});

router.get('/:id/', function(req, res, next) {
  res.render('items/show', { title: "自転車" })
});

module.exports = router;
