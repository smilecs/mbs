var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/user/:id?', function(req, res, next) {
  res.render('client', { title: 'Express' });
});

router.get('/admin', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
