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
		
		//this.gameButton = new Core2D.Button(gameButton_properties);
		//this.testLabel  = new Core2D.Label(testLabel_properties);
	},
	
	update : function()
	{
		this.pollKeyboard();
	},
	
	/*
	 * polls the keyboard to check if certain keys are being pressed
	 *
	 */
	pollKeyboard : function()
	{
		if(app.keydown[app.keys.ENTER])
			app.main.changeState(app.GAME_STATE.GAME);
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
		//app.ctx.fillRect(app.main.DEFAULT_WIDTH/4, app.main.DEFAULT_HEIGHT/3, app.main.DEFAULT_WIDTH/10, app.main.DEFAULT_HEIGHT/10);
		app.ctx.fillRect(80 / app.dimensions.scaleX, 160 / app.dimensions.scaleY, 32 / app.dimensions.scaleX, 2 / app.dimensions.scaleY);
		
		// 320 / 4 = 80
		// 480 / 3 = 160
		// 320 / 10 = 32
		// 480 / 10 = 48
		
		
		// buttons
		//this.gameButton.render(app.ctx);
		//this.testLabel.render(app.ctx);
		
		// restore at end
		app.ctx.restore();
	}
};