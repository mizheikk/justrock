$( document ).ready(function() {
 	
 	var url = window.location.origin+"/api"; 	
	
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
			  for( i=0; i<results.length; i++) {
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
	});	

	$("#step-backward").click(function stepBackward(){
		$.get(url, { command:"previous"});
	});	

	$("#play").click(function play(){
		$.get(url, { command:"play"});
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