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
	
	//console.log("clicked on screen @ " + x + ", " + y);
	
	// actions based on game state
	switch(app.main.currentGameState)
	{
	case app.GAME_STATE.TITLE:
		app.title.checkCollisions(x, y);
	
		break;
		
	case app.GAME_STATE.INSTRUCTIONS:
	    app.instructions.checkMouse(x, y);
	
		break;
		
	case app.GAME_STATE.GAME:
	    app.game.checkMouse(x, y);
		break;
		
	case app.GAME_STATE.HIGH_SCORE:
	    app.highScore.checkMouse(x, y);
		break;
	}
	
}, false);

/*
 * Callback for when the page has finished loading
 */
window.addEventListener('load', function(){
	console.log("page loading complete");
	
	app.main.init();
});

/*
 * Callback for when the window goes out of focus
 */
window.addEventListener('blur', function(){
	console.log("page blur");
	
	cancelAnimationFrame(app.animationID);
	app.main.changeState(app.GAME_STATE.PAUSED);
});

/*
 * Callback for when the window goes back into focus
 */
window.addEventListener('focus', function(){
	console.log("page focus");
	
	app.game.lastUpdate = Date.now();
	app.main.changeState();
	
	// start animation again
	app.main.loop();
});

window.addEventListener('keydown', function(event){
	app.keydown[event.keyCode] = true;
	console.log(event.keyCode + " was pressed");
});

window.addEventListener('keyup', function(event){
	app.keydown[event.keyCode] = false;
	console.log(event.keyCode + " is no longer pressed");
});

// touch!
window.addEventListener('touchstart', function(event){
	event.preventDefault();
	
	var touches = event.touches[0];
	
	var x = (touches.clientX - app.offset.left) / app.dimensions.scale;
	var y = (touches.clientY - app.offset.top) / app.dimensions.scale;
	
	// actions based on game state
	switch(app.main.currentGameState)
	{
	case app.GAME_STATE.TITLE:
		if(app.timer <= 10)
			app.title.checkCollisions(x, y);
	
		break;
		
	case app.GAME_STATE.INSTRUCTIONS:
		if(app.timer <= 10)
			app.instructions.checkMouse(x, y);
	
		break;
		
	case app.GAME_STATE.GAME:
		if(app.timer <= 10)
			app.game.checkMouse(x, y);
			
		break;
		
	case app.GAME_STATE.HIGH_SCORE:
		if(app.timer <= 10)
			app.highScore.checkMouse(x, y);
			
		break;
	}
});

window.addEventListener('touchmove',function(event){
	event.preventDefault();
});

window.addEventListener('touchend', function(event){
	event.preventDefault();
});