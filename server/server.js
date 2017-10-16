// require('./config/config.js');
// Setup enviroment
var env = process.env.NODE_ENV || 'development';
if(env === 'development'){
	process.env.PORT = 30001;
	process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
}else if(env === 'test'){	
	process.env.PORT = 30001;
	process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}
//***************************************************************

const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/todo');

var app = express();
var port = process.env.PORT;

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.post('/todos', (req, res) => {		
	var todo = new Todo({
		text: req.body.text
	});

	todo.save().then((doc) => {
		res.send(doc);
	}, (err) => {
		res.status(400).send(err);
	});
});

app.get('/todos', (req, res) => {
	Todo.find().then((docs) => {
		res.send({docs});
	}, (err) => {
		res.status(400).send(err);
	});
});

app.get('/todos/:id', (req, res) => {	
	var id = req.params.id;
	if(!ObjectID.isValid(id)){
		return res.status(400).send("id provided not valid");
	}
	Todo.findById(req.params.id).then((todo) => {
		if(!todo){
			return res.status(404).send({});
		}
		res.status(200).send({todo});
	})
	// .catch((e) => {
	// 	res.status(400).send(e.message);
	// });
});

app.delete('/todos/:id', (req, res) => {
	var id = req.params.id;

	if(!ObjectID.isValid(id)){		
		return res.status(404).send('Todo Not Found');
	}

	Todo.findByIdAndRemove(id).then((todo) => {
		if(!todo){
			return res.status(404).send('Todo Not Found');
		}
		res.status(200).send({todo});
	}).catch((e) => {
		res.status(400).send(e.message);
	});
});

app.patch('/todos/:id', (req, res) => {
	var id = req.params.id;
	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}
	var body = _.pick(req.body, ['text', 'completed']);	
	if(_.isBoolean(body.completed) && body.completed){
		body.completedAt = new Date().getTime();
	}else{
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
		if(!todo){
			return res.status(404).send();
		}
		res.status(200).send({todo});
	}).catch((e) => {
		res.status(400).send();
	});
})

app.listen(port, () => {
	console.log('Started on port ' + port);
});

module.exports = { app }






