var express = require('express');
var crypto = require('crypto');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var app = express();


var db = mongoose.connection;
var ticketSchema = null, Ticket = null
db.once('open', function (){

	// Create our syncTicket Schema
   ticketSchema = mongoose.Schema({
	
		id: Number,
		name: String,
		reference: String,
		contacts: [{
			first: String,
			last: String,
			phone: String,
			email: String
		}]

	})

	Ticket = mongoose.model('Ticket', ticketSchema);

});


app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));

//app.use(express.static(__dirname + '/public/content'));


// API Requests are checked first
app.get('/api/sync', function(req, res){

	var nameId = req.query.nameId;

	// Here we generate a key
	
	var key = crypto.createHash('md5').update(nameId).digest('hex');
	key = key.slice(0, key.length/2);
	console.log('Created key: ' + key);

	var ticket = new Ticket({ name: nameId, reference: key});
	ticket.save(function(err, ticket){
		if(err){ console.log(err); }
		console.log(ticket);
		res.send(ticket);
	})
});

app.get('/api/check', function(req,res){

	// Check the name
	var identifier = req.query.identifier;
	console.log('Identifier: '+identifier);
	Ticket.findOne({name:identifier}, function(err, ticket){
		if(ticket){
			console.log('Ticket: ' + ticket);
			res.send(false);
		}else{
			res.send(true);
		}
		
	});

});


// This routes all other requests to the Angular app
app.get('*', function(req, res){
	//console.log(req.route);
	res.render('index.html');
});

var server = app.listen(8080, function(){
	console.log('Listening on port %d', server.address().port);
});