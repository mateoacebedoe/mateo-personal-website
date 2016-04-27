var mysql = require('mysql');

const select_all_learnings = "SELECT * FROM learnings";
const select_all_categories = "SELECT * FROM categories";

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'mateo-personal-website',
	socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});


connection.connect(function (err){
	if(!!err){
		console.error(err);
	} else {
		console.log("connected");
	}
});

connection.query(select_all_learnings, function(err, result){
	if(!!err){
		console.error(err);
		return;
	} else {
		result.forEach(function(d){
			delete d.id;
			var cat = d.category;
			d.category = cat - 1;
		});
		console.log(JSON.stringify(result));
	}
});

connection.query(select_all_categories, function(err, result){
	if(!!err){
		console.error(err);
		return;
	} else {
		result.forEach(function(d){
			delete d.id;
		});
		//console.log(JSON.stringify(result));
	}
});


connection.end();