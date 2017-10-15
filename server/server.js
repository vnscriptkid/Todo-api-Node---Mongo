var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/todo');

var app = express();
var port = process.env.PORT || 30001;

app.use(bodyParser.json());

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
})

app.listen(port, () => {
	console.log('Started on port ' + port);
});

module.exports = { app }






