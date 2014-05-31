/*
 * main.js
 *
 * Handles the main functionality for the game
 */
"use strict";

// namespace
var app = app || {};

// Globals ----------------------------------------------------
app.animationID = undefined;

app.GAME_STATE = {
	TITLE        : 0,
	INSTRUCTIONS : 1,
	GAME         : 2,
	HIGH_SCORE   : 3,
	PAUSED       : 4
};                      // available states for the game

app.canvas = undefined; // canvas element (which will be resized)
app.ctx    = undefined; // rendering context

app.dimensions = {
	width  : undefined,
	height : undefined,
	ratio  : undefined,
	scale  : 1
};                      // available dimension properties for the game

app.offset = {
	top  : 5,
	left : 5
};                      // offsets for the canvas object

app.main = {
	// Constants ----------------------------------------------------
	DEFAULT_WIDTH  : 320, // starting width for game
	DEFAULT_HEIGHT : 480, // starting height for game

	currentGameState  : app.GAME_STATE.TITLE, // current state
	previousGameState : app.GAME_STATE.TITLE, // previous state
	
	init : function()
	{
		console.log("main init!");
		
		// canvas variables ----------------------------------------
		app.canvas = document.querySelector("#canvas");
		app.ctx = canvas.getContext("2d");
		
		// dimensions ----------------------------------------------
		app.dimensions.ratio  = this.DEFAULT_WIDTH / this.DEFAULT_HEIGHT;
		app.dimensions.width  = this.DEFAULT_WIDTH;
		app.dimensions.height = this.DEFAULT_HEIGHT;
		
		// tracking mobile browser agents (useful when resizing)
        this.ua = navigator.userAgent.toLowerCase();
        this.android = this.ua.indexOf('android') > -1 ? true : false;
        this.ios = (this.ua.indexOf('iphone') > -1 || this.ua.indexOf('ipad') > -1 || this.ua.indexOf('ipod') > -1) ? true : false;
		
		// asset creation
		app.ResourceManager.loadAndCreateAssets();
		
		// ready to resize
		this.resize();
		
		// begin main loop
		this.loop();
	},
	
	/*
	 * Changes the state of the game
	 *
	 * @param   {String} newState   the state to switch to.
	 *
	 * @return  none
	 */
	changeState : function(newState)
	{
		// if no state is provided, assume we will go back to previous state
		if(newState === undefined)
		{
			var tempState = this.currentState;
			this.currentState = this.previousState;
			this.previousState = tempState;
		}
		
		// state provided
		else
		{
			this.previousState = this.currentState;
			this.currentState = newState;
		}
		
		// begin loading of a state if necessary
		switch(this.currentState)
		{
		case app.GAME_STATE.TITLE:
			if(!app.title.ready)
				app.title.init();
			
			break;
			
		case app.GAME_STATE.INSTRUCTIONS:
			if(!app.instructions.ready)
				app.instructions.init();
				
			break;
			
		case app.GAME_STATE.GAME:
			if(!app.game.ready)
				app.game.init();
				
			break;
			
		case app.GAME_STATE.PAUSED:
			// nothing here atm
			
			break;
		}
	},
	
	/*
	 * resizes the canvas element, and re-assigns any necessary values
	 *
	 * @return  none
	 */
	resize : function()
	{
		console.log("main resize!");
		
		// resize height; width resizing is based on height & ratio
        app.dimensions.height = window.innerHeight;
        app.dimensions.width = app.dimensions.height * app.dimensions.ratio;

        // work-around for address bar on mobile devices
        if (this.android || this.ios) {
            // create extra space on page
            document.body.style.height = (window.innerHeight + 50) + 'px';
        }

        // resizing the canvas element on the browser
        app.canvas.style.width = app.dimensions.width + 'px';
        app.canvas.style.height = app.dimensions.height + 'px';

        // set scale relative to default size
        app.dimensions.scale = app.dimensions.width / app.main.DEFAULT_WIDTH;

        // console.log("scale: " + app.dimensions.scale);

        // set offsets
        app.offset.top = app.canvas.offsetTop;
        app.offset.left = app.canvas.offsetLeft;

        // timeout needed for mobile browsers in order to keep firing function
        window.setTimeout(function () {
            window.scrollTo(0, 1);
        }, 1);
	},
	
	/*
	 * the main loop of the application.
	 *
	 * @return  none
	 */
	loop : function()
	{
		this.update();
		this.render();
		
		// ToDo: gamestate logic here
		
		// bind to prevent scope-loss
		app.animationID = requestAnimationFrame(this.loop.bind(this));
	},
	
	/*
	 * updates the objects in the game 
	 *
	 * @return  none
	 */
	update : function()
	{
		//console.log("main update!");
		if(this.currentGameState == app.GAME_STATE.TITLE && app.title.ready)
		{
			app.title.update();
		}
		
		switch(this.currentGameState)
		{
		case app.GAME_STATE.TITLE:
			if(app.title.ready)
				app.title.update();
			
			break;
			
		case app.GAME_STATE.INSTRUCTIONS:
			if(app.instructions.ready)
				app.instructions.update();
		
			break;
		
		case app.GAME_STATE.GAME:
			if(app.game.ready)
				app.game.update();
			break;
		}
	},
	
	/*
	 * renders the objects to the screen
	 *
	 * @return  none
	 */
	render : function()
	{
		// clear screen
		app.ctx.clearRect(0, 0, this.DEFAULT_WIDTH, this.DEFAULT_HEIGHT);
			
		switch(this.currentGameState)
		{
		case app.GAME_STATE.TITLE:
			if(app.title.ready)
				app.title.render();
				
			break;
				
		case app.GAME_STATE.INSTRUCTIONS:
			if(app.instructions.ready)
				app.instructions.render();
		
			break;
			
		case app.GAME_STATE.GAME:
			if(app.game.ready)
				app.game.render();
				
			break;
		}
	}
};