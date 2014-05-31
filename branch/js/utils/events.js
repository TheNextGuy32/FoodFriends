/*
 * events.js
 *
 * @author  Freddy Garcia
 *
 * Container of all the available events for the user
 */
"use strict";

// namespace
var app = app || {};

/*
 * Callback for resizing the screen
 */
window.addEventListener('resize', app.main.resize, false);

/*
 * Callback from clicking on the screen (either LMB or RMB)
 */
window.addEventListener('click', function(e){
	// prevent menu from appearing
	// ToDo: functionality in chrome/safari
	e.preventDefault();
	
	// grabbing the proper x/y positions
	var x = (e.clientX - app.offset.left) / app.dimensions.scale;
	var y = (e.clientY - app.offset.top) / app.dimensions.scale;
	
	console.log("clicked on screen @ " + x + ", " + y);
	
}, false);

/*
 * Callback for when the page has finished loading
 */
window.addEventListener('load', function(){
	console.log("page loading complete");
	
	app.main.init();
});