var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

router.get('/patient', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/user/:id?', function(req, res, next) {
  res.render('client', { title: 'Express' });
});

router.post('/admin', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ad', function(req, res, next) {
  res.render('adlogin', { title: 'Express' });
});


module.exports = router;
