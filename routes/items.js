var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('items/index', { title: '出品物一覧' })
});

module.exports = router;
