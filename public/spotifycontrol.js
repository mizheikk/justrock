$( document ).ready(function() {
 	
 	var url = window.location.origin+"/api";

  updateInfoScreen();
 	
 	function updateTimer(time) {
    setTimeout(function() {
      updateInfoScreen()
    }, time + 1000);
 	}

  function getInfoFromPlayer() {
    return $.ajax({
      url : url,
      type: 'GET',
      data:{
           command : "info"
      } 
    });
  }
  
  function getInfoFromSpotify(id) {
    var trackId;
    //trimmaa virheellisen id:n 
    if( id.search("spotify:track:") != -1) {
      trackId = id.replace("spotify:track:", "");
    } else {
      trackId = id;
    } 
      
    return $.ajax({
      url : "https://api.spotify.com/v1/tracks/"+trackId,
      type: 'GET',
    });
  }

  var playerPosition = 0;
  var duration = 0;  
  var timer = setInterval(function () {clock()}, 1000);
  
  function clock() {
      playerPosition++;
      var output = (duration - playerPosition);
      if(output>0) {
        //$("#play").html(output);
      }
  }

  function updateInfoScreen() {
    var playerData = getInfoFromPlayer();
    
    playerData.done(function(data) {
      var trackId = data.trackId;
      duration = Math.round(data.duration);
      playerPosition = Math.round(data.playerPosition.replace(",",".")); //korjaa , -> .
      var time = duration - playerPosition;
      
      getInfoFromSpotify(trackId).done( function(data) {
	      var name = data.name;
        var albumName = data.album.name;
        var image = data.album.images[1].url;
        var artists = [];
      
        for(var i=0; i<data.artists.length; i++) {
          artists[i] = data.artists[i].name;
        }	
      
        $("#infoScreen").html( "<img src='"+image+"'/>" +
                             "<p>"+name+"</p>" +
                             "<p>"+albumName+"</p>");
        for(var i=0; i<artists.length; i++) {                       
          $("#infoScreen").append("<p>"+artists[i]+" </p>");                      
        }
        
        updateTimer(time);
        clock();          
	    });
    });
  }
  
	function setVolume(direction) {
	  getInfoFromPlayer().done( function(data) {
	  	soundVolume = data.soundVolume;
			if(direction)
			  soundVolume += 5;
			else
			  soundVolume -= 5;
      $.get(url, { command:"volume", param:soundVolume});	  	
	  });
	}
  
	$("#searchButton").click(function search(){	 
	  $.get("https://api.spotify.com/v1/search", { q:$("#searchQuery").val(), type:"track"}, function(response){
	    $("#searchResult").html("");
			var results = response.tracks.items;
			for(var i=0; i<results.length; i++) {
					var uri = response.tracks.items[i].uri;
					var name = response.tracks.items[i].name;
					var artist = [];
					
					for(var j=0; j<response.tracks.items[i].artists.length; j++) {
					  artist[j] = response.tracks.items[i].artists[j].name;
					  $("#searchResult").append( '<a href="#" class="resultLink" id="' + uri + '">'+ name + " <b>by</b> "+artist[j]+'</a> <br/>' );
					}
			  }   
		});
	});    

	$(document).on("click", '.resultLink', function playTrack(e) {
		$.get(url, { command:"play", param:e.target.id});
		updateInfoScreen();
	});	

	$("#step-backward").click(function stepBackward(){
		$.get(url, { command:"previous"}, function(data){
		  updateInfoScreen();
		});		
	});	

	$("#play").click(function play(){
		$.get(url, { command:"play"});
		updateInfoScreen();
	});

	$("#pause").click(function pause(){
		$.get(url, { command:"pause"});
		clearInterval(clock);
	});	
	
	$("#step-forward").click(function stepForward(){
		$.get(url, { command:"next"}, function(data){
		  updateInfoScreen();
		});		
	});
	
	$("#volume-up").click( function(){
		setVolume(1);
	});

	$("#volume-down").click( function(){
	  setVolume(0);	
	});
});