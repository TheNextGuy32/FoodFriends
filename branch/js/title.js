/*
 * title.js
 *
 * @author  Freddy Garcia
 *
 * represents the title screen that the player will have access to at
 * the beginning of the game
 */
"use strict";

// namespace
var app = app || {};

app.title = {
	// Constants -----------------------------------------------------
	
	// Variables -----------------------------------------------------
	ready              : false,     // if the screen is ready to be used
	instructionsButton : undefined, // button leading to instruction screen
	gameButton         : undefined, // button leading to game screen
	testLabel          : undefined,
	
	/*
	 * Initializes the title screen with any necessary values
	 *
	 * @return  none
	 */
	init : function()
	{
		console.log("title init!");
		
		this.createAssets();
		
		// ready to begin
		this.ready = true;
	},
	
	/*
	 * Creates the assets necessary in the title menu
	 *
	 * @return  none
	 */
	createAssets : function()
	{
		var gameButton_properties = {
			center : {
				x : 100,
				y : 200
			},
			callbacks : {onClick : function(){app.main.changeState(app.GAME_STATE.GAME)} }
		};
		
		var testLabel_properties = {
			center: {
				x: 50,
				y: 300
			}
		};
		
		this.gameButton = new Core2D.Button(gameButton_properties);
		this.testLabel  = new Core2D.Label(testLabel_properties);
	},
	
	update : function()
	{
		// inefficient!
		// have to modify button properties each frame
		/*var modifyGameButton_p = {
			center: {
				x : app.main.DEFAULT_WIDTH/2,
				y : app.main.DEFAULT_HEIGHT/2
			},
			
			size : {
				width: app.main.DEFAULT_WIDTH/5,
				height: app.main.DEFAULT_HEIGHT/8
			},
		};*/
		
		//this.gameButton.modify(modifyGameButton_p);
	},
	
	render : function()
	{
		//console.log("title render");
		// save before draws
		app.ctx.save();
		
		// background
		app.ctx.fillStyle = "#FFC972";
		app.ctx.fillRect(0, 0, app.main.DEFAULT_WIDTH, app.main.DEFAULT_HEIGHT);
		
		// test
		app.ctx.fillStyle = "red";
		app.ctx.fillRect(app.main.DEFAULT_WIDTH/6 /* app.dimensions.scale*/, app.main.DEFAULT_HEIGHT/10 /** app.dimensions.scale*/, 10, 10);
		
		
		
		// buttons
		this.gameButton.render(app.ctx);
		this.testLabel.render(app.ctx);
		
		// restore at end
		app.ctx.restore();
	}
};