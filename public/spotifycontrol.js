$( document ).ready(function() {
 	
 	var url = "http://localhost:8080/command"; 	
 	
 	/*
 	function getInfo() {
    $.get(url, { command:"info"}, function(data){
      var info = $.parseJSON(data);
      console.log(info.soundVolume);
      return info;
    });			
  }
  */
  
	$("#searchButton").click(function(){	
	
	  $("#searchResult").html("");
	
	  $.ajax({
		  url: 'https://api.spotify.com/v1/search',
			data: {
			  q: $("#searchQuery").val(),
				type: 'track'
			},
			success: function (response) {
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
  
	$(document).on("click", '.resultLink', function(e) {
		$.get(url, { command:"play", param:e.target.id});
	});	

	$("#step-backward").click(function(){
		$.get(url, { command:"previous"});
	});	

	$("#play").click(function(){
		$.get(url, { command:"play"});
	});	

	$("#pause").click(function(){
		$.get(url, { command:"pause"});
	});	
	
	$("#step-forward").click(function(){
		$.get(url, { command:"next"});
	});		
			 
});