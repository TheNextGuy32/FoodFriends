/*
 * instructions.js
 *
 * @author  Freddy Garcia
 *
 * handles all necessary values in the instructions screen
 */
"use strict";

// namespace
var app = app || {};

app.instructions = {
	ready : false,
	
	
	init : function()
	{
		//console.log("instructions init");
		
		this.createAssets();
	},
	
	createAssets : function()
	{
	    this.ready = true;
	},
	
	update : function()
	{
	},
	
	render : function()
	{
		app.ctx.save();
		app.ctx.fillStyle = "#FFFFFF";
		app.ctx.fillText("penis :)", 50, 50);
	}
};