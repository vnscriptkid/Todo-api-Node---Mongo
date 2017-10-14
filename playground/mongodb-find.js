const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err){
		return console.log('Can not connect to db');
	}
	console.log('Connected to db');

	// db.collection('Users').find({
	// 	_id: new ObjectID("59e27781504dfa316815a393")
	// }).toArray().then((docs) => {
	// 	console.log('Todos Array');
	// 	console.log(JSON.stringify(docs, undefined, 2));
	// }, (err) => {
	// 	console.log('Unable to fetch todos');
	// });

	// db.collection('Users').find().count().then((count) => {
	// 	console.log('Todos Count: ', count);
	// }, (err) => {
	// 	console.log('Unable to count todos');
	// });

	db.collection('Users').find({name: 'thanh'}).toArray().then((result) => {
		console.log(JSON.stringify(result, undefined, 2));
	}, (err) => {
		console.log(err);
	})

	// db.close();
});