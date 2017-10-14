// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err){
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');
	
	// db.collection('Users').insertOne({
	// 	name: 'hue',
	// 	age: 20,
	// 	location: 'Thanh Hoa'
	// }, (err, result) => {
	// 	if(err){
	// 		return console.log('Unable to insert to db ', err);
	// 	}
	// 	console.log(JSON.stringify(result.ops, undefined, 2));
	// });
	
	db.close();
});

