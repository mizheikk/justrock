var os = require('os');
var exec = require('child_process').exec;

exports.get_spotify = get_spotify;

function get_spotify() {
    platform = os.platform();
    if (platform === 'darwin') {
	return spotify_osx_controller;
    } else if (platform === 'linux') {
	return spotify_linux_controller;
    } else {
	console.log('No support for platform ' + platform + ' at the moment -- sorry!');
	return spotify_dummy_controller;
    }
}

var spotify_dummy_controller = {
    call: function(command, param) {
	console.log('Dummy Spotify controller called; doing nothing');
    }
}

var spotify_linux_controller = {
    call: function(command, param) {
	console.log('Calling Spotify for Linux; command = ' + command + ', param = ' + param);
    }
}

var spotify_osx_controller = {
    call: function(command, param) {
	console.log('Calling Spotify for OS X; command = ' + command + ', param = ' + param);
	exec('spotifycontrol ' + command + " " + param, function(err,stdout) {
	    if(err) {
		res.send(err);
	    }
	    res.send(stdout);
	});
    }
}
