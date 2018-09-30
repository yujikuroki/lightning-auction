var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login/', function(req, res, next) {
  res.render('users/login', { title: 'ログイン' })
});

router.get('/logout/', function(req, res, next) {
  res.render('users/logout', { title: 'ログアウト' })
});

module.exports = router;
