var express = require('express');
var redis = require('./models/redis.js');
var bodyParser = require('body-parser');
var mongodb = require('./models/mongodb.js');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/',function(req, res){
	if(!(req.body.owner && req.body.type && req.body.content)){
		return res.json({code:0, msg:"not full"});
	}
	redis.throw(req.body, function(result){
		res.json(result);
	});
});

app.get('/',function(req,res){
	if(!req.query.user){
		return res.json({code:0, msg: "not full"});
	}
	redis.pick(req.query, function(result){
		res.json(result);
	});
});

app.post('/back', function(req, res){
	redis.throwBack(req.body, function(result){
		res.json(result);
	});
});

app.get('/user/:user', function(req, res){
	mongodb.getAll(req.params.user, function(result){
		res.json(result);
	});
});

app.get('/bottle/:id', function(req, res){
	mongodb.getOne(req.params._id, function(result){
		res.json(result);
	});
});

app.post('/reply/:_id', function(req, res){
	if(!(req.body.user && req.body.content)){
		return callback({code: 0, msg: "message not wanz"});
	}
	mongodb.reply(req.params._id, req.body, function(result){
		res.json(result);
	});
});

app.get('/delete/:_id',function (req, res) {
	mongodb.delete(req.params._id, function(result){
		res.json(result);
	});
});

app.listen(3000);

