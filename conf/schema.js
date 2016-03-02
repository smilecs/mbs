var mongoose = require('mongoose');
var mongodbURL = process.env.MONGOLAB_URI || 'mongodb://localhost/mbs';
var mongodbOptions = {};
var db = mongoose.connection;
db.on('error', console.error);
var Schema = mongoose.Schema;
mongoose.set('debug', true);
mongoose.connect(mongodbURL, mongodbOptions, function (err, res){
	if(err){
		console.log('Connection refused to ' + mongodbURL);
		console.log(err);
	} else {
		console.log('Connection successful to: ' + mongodbURL);
	}
});

var report = new Schema({
name: String,
amount: Number
});
var reps = new Schema({
name: String,
amount: Number,
});
var reciepts = new Schema({
	rep: [reps],
	user: String
});
var vals =  new Schema({
	name:String
});
//user schema
var User = new Schema({
	email: String,
	name: String,
	username: String,
	image: String,
	password: String,
	contact:String,
	state:String,
	Report: [vals],
	location: String,
	date_birth: Date,
	sex: String,
	patient:Boolean
	});


exports.Usermodel = mongoose.model('user', User);
exports.repModel = mongoose.model('reps', reps);
exports.recModel = mongoose.model('reciepts', reciepts);
exports.reportModel = mongoose.model('report', report);
