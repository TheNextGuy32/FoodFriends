"use strict";

// namespace
var app = app || {};

// when the elements on the window have finished loading
//window.addEventListener('load', app.main.init);
window.addEventListener('resize', app.main.resize);

/*
 * If you click on the left side of the Game, the left 2 Lanes Switch
 * If you click on the right side of the Game, the right 2 Lanes Switch
 */
window.addEventListener('click', function(e){
	e.preventDefault(); // firefox only - prevents menu from appearing
	
	// proper x/y value
	var x = (e.clientX - app.offset.left) / app.dimensions.scale;
	var y = (e.clientY - app.offset.top) / app.dimensions.scale;

	if(x < app.main.DEFAULT_WIDTH/2) app.main.switchLane(1);
	else app.main.switchLane(2);
});

window.addEventListener('load', function() {
    console.log("finished loading!");
    app.main.init();
});