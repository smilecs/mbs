var express = require('express');
var router = express.Router();
var request = require('http');
var model = require('../conf/schema');
var user = model.Usermodel;
var report = model.reportModel;
var reps = model.repModel;
var recs = model.recModel;


router.post('/sign_in', function(req, res){
	var data = req.body;
	var password = data.password;
	user.findOne({username: data.username, password:password}, function(err, data){
		if(err){
			console.log(err);
		return res.send(500);
			}
			if(!data){
				return res.send(404);
			}
		if(data === undefined || (data.password != password)){
			return res.send(401);
		}
		console.log(data);
		return res.redirect('user/');
			});
});

router.post('/register', function(req, res) {
var data = req.body;
 console.log(data);
  var use = new user({
        name: data.name,
        email: data.email,
      contact: data.contact,
       sex: data.sex,
       state: data.state,
       patient:true
      });
      console.log(data);
      use.save(function(err, data){
      	if(err){
      		console.log(err);
      		console.log(data);
      	return res.send(500);
      	}
      	return res.json(200, data);
      });
      });

			router.post('/register_staff', function(req, res) {
			var data = req.body;
			 console.log(data);
			  var use = new user({
			        name: data.name,
			        email: data.email,
							username: data.username,
							password: data.password,
			      contact: data.contact,
			       sex: data.sex,
			       state: data.state,
			       patient:false
			      });
			      console.log(data);
			      use.save(function(err, data){
			      	if(err){
			      		console.log(err);
			      		console.log(data);
			      	return res.send(500);
			      	}
			      	return res.json(200, data);
			      });
			      });

router.get('/patients', function(req, res){
  user.find({}, function(err, result){
		if(err){
			console.log(err);
			return res.send(500);
		}
		return res.json(200, result);
	});
});

router.get('/dashboard', function(req, res){
  recs.find({}, function(err, result){
		if(err){
			console.log(err);
			return res.send(500);
		}
		return res.json(200, result);
	});
});

router.get('/report_item', function(req, res){
  report.find({}, function(err, result){
		if(err){
			console.log(err);
			return res.send(500);
		}
		return res.json(200, result);
	});
});

router.get('/report/:_id', function(req, res){
	recs.find({"user":req.params._id}, function(err, result){
		if(err){
			console.log(err);
			return res.send(500);
		}
		return res.json(200, result);
	});
});

router.get('/final_report/:_id', function(req, res){
	recs.findById(req.params._id, function(err, result){
		if(err){
			console.log(err);
			return res.send(500);
		}
		return res.json(200, result);
	});
});

router.get('/service', function(req, res){
	report.find({}, function(err, result){
		if(err){
			console.log(err);
			return res.send(500);
		}
		return res.json(200, result);
	});
});

router.get('/user/:id', function(req, res){
	user.findById(req.params.id, function(err, result){
		if(err){
			console.log(err);
			return res.send(500);
		}
		return res.json(200, result);
	});
});


router.post('/add_item/', function(req, res){
  var rep = new report({
    "name":req.body.name,
    "amount":req.body.amount
  });
  rep.save(function(err, data){
    if(err)
{
res.status(500);
}
res.status(200);
 });
});

router.post('/new_rep/', function(req, res){
  var repo = new recs({
    user: "change"
  });
  repo.save(function(err, data){
    if(err)
{
res.status(500);
}
res.status(200).json(data);
 });
});
router.post('/newrep/:id', function(req, res){
  recs.findByIdAndUpdate(req.params.id, {$push:{"rep": {"name": req.body.name, "amount":req.body.amount}}}, function(err, result){
		if(err){
			console.log(err + ' ' + req.body);
			return res.send(500);
		}
		return res.send(200);
	});
});

router.post('/newrep/:id/:tmp', function(req, res){
  recs.findByIdAndUpdate(req.params.id, {"user":req.params.tmp}, function(err, result){
		if(err){
			console.log(err + ' ' + req.body);
			return res.send(500);
		}
		return res.send(200);
	});
});

module.exports = router;
