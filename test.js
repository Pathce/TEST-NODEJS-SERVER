var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, '0.0.0.0', function(){
	console.log('서버 실행 중...');
});

var connection = mysql.createConnection({
	host: "in0betago-db.ckg0r7mhy4j7.ap-northeast-2.rds.amazonaws.com",
	user: "IN0BETAGO",
	database: "IN0BETAGO_DB",
	password: "akgndbd4656!!",
	port: 3306
});

app.post('/test/in0', function(req, res){
	console.log("request");

	var sql = "select * from Test";

	connection.query(sql, function(err, rows){

		if(err){
			console.log(err);
		}else{
		}

		console.log("_______________________________");
		
		let result = [];
		rows.forEach(element => result.push({
			No: element.No,
			Reviewdate: element.Reviewdate,
			Title: element.Title,
			Review: element.Review,
			Evaluation: element.Evaluation
		
		}));
		console.log(result);
		res.send(result);

	});
});

