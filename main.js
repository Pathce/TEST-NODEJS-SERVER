var mysql = require("mysql");	// mysql 모듈 호출
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.set('port', process.env.PORT || 9000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// 커넥션 정의
var connection = mysql.createConnection({
	host: "in0betago-db.ckg0r7mhy4j7.ap-northeast-2.rds.amazonaws.com",
	user: "IN0BETAGO",
	database: "IN0BETAGO_DB",
	password: "비밀번호 입력",
	port: 3306
});

let result_query

// RDS 접속
connection.connect(function(err){
	if(err){
		throw err;	// 접속 실패시 에러 throw
	}else{
		// 접속시 쿼리 전송
		connection.query("select * from Test", function(err, rows, field){
			console.log(rows);	// 결과 출력
			console.log(typeof(rows));
			result_query = rows;
			fs = require('fs');
			fs.writeFile('./result', JSON.stringify(rows), function(err){
				if(err){
					console.log("ERROR");
					throw err;
				}
			});
		});
	}
	connection.end();
});

app.use(function(req, res, next){
	console.log('First Middleware');
	console.log(result_query);
});

module.exports = app;

var server = app.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + server.address().port);
});
