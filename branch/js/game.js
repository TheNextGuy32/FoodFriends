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
		ready = true;
	},
	
	/*
	 * Updates the objects in the game screen
	 *
	 * @return  none
	 */
	update : function()
	{
	},
	
	/*
	 * Renders the objects onto the game screen
	 *
	 * @return  none
	 */
	render : function()
	{
	}
};