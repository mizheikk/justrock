$( document ).ready(function() {
 	
 	//var url = "http://omena.aappala.fi:8080/command";
 	var url = "http://localhost:8080/command";
 	var fadeoutTime = 5000;
 	var fadeinTime = 200;

	$("#step-backward").click(function(){
		$.get(url, { command:"prev"}, function(data){
			$( "#info" ).fadeIn( fadeinTime );
  		$("#info").html(data);
  		$( "#info" ).fadeOut( fadeoutTime );
		});
	});	

	$("#play").click(function(){
		$.get(url, { command:"play"}, function(data){
			$( "#info" ).fadeIn( fadeinTime );
  		$("#info").html(data);
  		$( "#info" ).fadeOut( fadeoutTime );
		});
	});	

	$("#pause").click(function(){
		$.get(url, { command:"pause"}, function(data){
			$( "#info" ).fadeIn( fadeinTime );
  		$("#info").html(data);
  		$( "#info" ).fadeOut( fadeoutTime );
		});
	});	
	
	$("#step-forward").click(function(){
		$.get(url, { command:"next"}, function(data){
			$( "#info" ).fadeIn( fadeinTime );
  		$("#info").html(data);
  		$( "#info" ).fadeOut( fadeoutTime );
		});
	});		
	
	$("#volume-down").click(function(){
		$.get(url, { command:"volume", param:"10"}, function(data){
			$( "#info" ).fadeIn( fadeinTime );
  		$("#info").html(data);
  		$( "#info" ).fadeOut( 10000 );
		});
	});

	$("#volume-up").click(function(){
		$.get(url, { command:"volume", param:"100"}, function(data){
			$( "#info" ).fadeIn( fadeinTime );
  		$("#info").html(data);
  		$( "#info" ).fadeOut( 10000 );
		});
	});		
	
	$("#heart").click(function(){
		$.get(url, { command:"info"}, function(data){
			$( "#info" ).fadeIn( fadeinTime );
  		$("#info").html(data);
  		var perse = $.parseJSON(data);
  		console.log(perse.artist);
  		$( "#info" ).fadeOut( 10000 );
		});
	});			
		 
});