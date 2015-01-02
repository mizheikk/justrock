var express = require('express');
var sys = require('sys');
var spotify = require('./spotify_controller');

var server = express();
server.use(express.static(__dirname + '/public/'));

var port = 8080;
server.listen(port, function() {
    console.log('server listening on port ' + port);
});

server.get('/api', function(req,res) {
  res.contentType('application/json');
  var command = req.query.command;
  var param = req.query.param;
  
  if(command == null)
  	command = "";
  if(param == null)
  	param = "";

  // Välitetään Spotifylle komento
	if( isValid(command, param) ) {				
		controller = spotify.get_spotify()
		controller.call(command, param)
	}
	else 
		res.send("False command.");  
});

//Tarkastetaan syöte
function isValid(command, param) {

	if(command.length > 8 || param.length > 50)
		return false;

	// hyväksyy: command a-z ja param a-Z sekä 0-9	
	if(command.search(/[^a-z]/i) > -1 || param.search(/[^a-z|^0-9|^:]/i) > -1)
		return false;
		
	return true;
}
