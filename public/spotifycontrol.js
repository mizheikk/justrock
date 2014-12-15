$( document ).ready(function() {
 	
 	var url = "http://localhost:8080/command"; 	
 	var volume = 0;
	
	/* Hakee kappaletiedot
	 * TODO hae tiedot vain kun oikeasti tarvitsee..
	*/
	function infoLoop() {
    $.get(url, { command:"info"}, function(data){
  		var info = $.parseJSON(data);
  		$("#info").html(info.artist + "<br/>" +
  			              info.trackName  + "<br/>" +
  			              info.album  + "<br/>"  
  		);  		
		});			
	}
	setInterval(infoLoop, 5000);
	

	$("#step-backward").click(function(){
		$.get(url, { command:"previous"}, function(data){
		});
	});	

	$("#play").click(function(){
		$.get(url, { command:"play"}, function(data){
		});
	});	

	$("#pause").click(function(){
		$.get(url, { command:"pause"}, function(data){
		});
	});	
	
	$("#step-forward").click(function(){
		$.get(url, { command:"next"}, function(data){
		});
	});		
	
	$("#volume-down").click(function(){
		if(volume > 0) {
			volume = volume - 10;
		  $.get(url, { command:"volume", param:volume}, function(data){
		  });
		}
	});

	$("#volume-up").click(function(){
		if(volume < 100) {
			volume = volume + 10;
		  $.get(url, { command:"volume", param:volume}, function(data){
		  });
		}
	});	
			 
});