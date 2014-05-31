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
	ready : true,
	
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
	
	createAssets : function()
	{
		
	},
	
	update : function()
	{
	},
	
	render : function()
	{
		console.log("title render");
		// save before draws
		app.ctx.save();
		
		// restore at end
		app.ctx.restore();
	}
};