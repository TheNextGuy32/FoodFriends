/*
 * game.js
 *
 * @author  Freddy Garcia
 *
 * Handles the functionality for the gameplay aspect of Food Friends
 */
"use strict";

// namespace
var app = app || {};

app.game = {
	// Constants ----------------------------------------------------
	
	
	// Variables ----------------------------------------------------
	ready : false,
	
	/*
	 * Initialization for the game
	 *
	 * @param   none
	 */
	init : function()
	{
		console.log("game init called!");
	
		// ready to be drawn to
		this.ready = true;
	},
	
	/*
	 * Updates the objects in the game screen
	 *
	 * @return  none
	 */
	update : function()
	{
		console.log("game update");
	},
	
	/*
	 * Renders the objects onto the game screen
	 *
	 * @return  none
	 */
	render : function()
	{
		app.ctx.save();
		
		// background
		app.ctx.fillStyle = "red";
		app.ctx.fillRect(0, 0, app.main.DEFAULT_WIDTH, app.main.DEFAULT_HEIGHT);
		
		// test
		app.ctx.fillStyle = "red";
		app.ctx.fillRect(app.main.DEFAULT_WIDTH/4, app.main.DEFAULT_HEIGHT/3, app.main.DEFAULT_WIDTH/10, app.main.DEFAULT_HEIGHT/10);
		
		
		// buttons
		//this.gameButton.render(app.ctx);
		//this.testLabel.render(app.ctx);
		
		// restore at end
		app.ctx.restore();
	}
};