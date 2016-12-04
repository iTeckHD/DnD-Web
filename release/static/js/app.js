(function(){
	$.get('static/js/data.json')
		.done(function(text){
			console.log(text);
		});
})();