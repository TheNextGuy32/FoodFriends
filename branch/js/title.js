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
		
		this.gameButton = new Core2D.Button(gameButton_properties);
	},
	
	update : function()
	{
	},
	
	render : function()
	{
		//console.log("title render");
		// save before draws
		app.ctx.save();
		
		// background
		app.ctx.fillStyle = "#FFC972";
		app.ctx.fillRect(0, 0, app.main.DEFAULT_WIDTH, app.main.DEFAULT_HEIGHT);
		
		// buttons
		this.gameButton.render(app.ctx);
		
		// restore at end
		app.ctx.restore();
	}
};