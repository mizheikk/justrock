$( document ).ready(function() {
 	
 	var url = window.location.origin+"/api"; 	
  
	function setTrackInfo(id) {	  
    var trackId;
    //trimmaa virheellisen id:n 
    if( id.search("spotify:track:") != -1) {
      trackId = id.replace("spotify:track:", "");
    } else {
      trackId = id;
    } 
	
    $.get("https://api.spotify.com/v1/tracks/"+trackId, {}, function(data) {
      console.log(data);
      var name = data.album.name;
      var image = data.album.images[1].url;
      var artists = [];
      for(var i=0; i<data.artists.length; i++) {
        artists[i] = data.artists[i].name;
      }	
      
      $("#infoScreen").html( "<img src='"+image+"'/>" +
                             "<p>"+name+"</p>");
      for(var i=0; i<artists.length; i++) {                       
        $("#infoScreen").append("<p>"+artists[i]+" </p>");                      
      }                       
      
    });
	}	
	
	function setVolume(direction) {
    $.get(url, { command:"info"}, function(data) {
      var info = $.parseJSON(data);
      var soundVolume = info.soundVolume;
				if(direction)
				  soundVolume += 5;
				else
				  soundVolume -= 5;
      $.get(url, { command:"volume", param:soundVolume});
    });	
	}	
  
	$("#searchButton").click(function search(){	
	
	  $("#searchResult").html("");
	
	  $.ajax({
		  url: 'https://api.spotify.com/v1/search',
		  cache: false,
		  crossDomain: true,
			data: {
			  q: $("#searchQuery").val(),
				type: 'track'
			},
			success: function searchSuccess(response) {
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
			}
	  });	  		
	});
  
	$(document).on("click", '.resultLink', function playTrack(e) {
		$.get(url, { command:"play", param:e.target.id});
		setTrackInfo(e.target.id);
	});	

	$("#step-backward").click(function stepBackward(){
		$.get(url, { command:"previous"});
	});	

	$("#play").click(function play(){
		$.get(url, { command:"play"});
		setTrackInfo("0eGsygTp906u18L0Oimnem");
	});	

	$("#pause").click(function pause(){
		$.get(url, { command:"pause"});
	});	
	
	$("#step-forward").click(function stepForward(){
		$.get(url, { command:"next"});
	});
	
	$("#volume-up").click( function(){
		setVolume(1);
	});
	
	$("#volume-down").click( function(){
	  setVolume(0);	
	});	 
});