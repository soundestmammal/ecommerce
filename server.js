var express = require('express');
var morgan = require('morgan');
var app = express();


//Middleware
app.use(morgan('dev'));

app.get('/', function(req, res){
	res.json("Hello World!");
})

app.get('/name', function(req, res){
	let name = "Robert";
	res.json("My name is " + name);
})

app.listen(2000, function(err) {
	if (err) throw err;
	console.log("Server is running on port 2000");
});