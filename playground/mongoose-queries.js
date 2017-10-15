const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {ObjectID} = require('mongodb');
const {User} = require('./../server/models/user');

// var id = '59e375b81b560a27805f587c11';
// if(!ObjectID.isValid(id)){
// 	console.log('ID is not valid');
// }

// Todo.find({
// 	_id: id
// }).then((todos) => {
// 	console.log('Todos ', todos);
// });

// Todo.findOne({
// 	_id: id
// }).then((todo) => {
// 	if(!todo){
// 		return console.log('not found');
// 	}
// 	console.log('Todo ', todo);
// })

// Todo.findById(id).then((todo) => {
// 	if(!todo){
// 		return console.log('id not found');
// 	}
// 	console.log('Todo ', todo);
// }).catch((e) => console.log(e.message));

var id = '59e351165c157216b4a949f7';

User.findById(id).then((todo) => {
	if(!todo){
		return console.log('todo not found');
	}
	console.log(todo);
}).catch((e) => console.log(e.message));

