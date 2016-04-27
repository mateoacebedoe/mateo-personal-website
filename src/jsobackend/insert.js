var mysql = require('mysql');

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
		console.log("conneted");
	}
});