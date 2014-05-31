"use strict";

var app = app || {};

app.highScore = {
	ready : false,
	
	init : function()
	{
		console.log("high score init");
		
		this.ready = true;
	},
	
	update : function()
	{
	},
	
	render : function()
	{
		// background
		app.ctx.fillStyle = "#3dC972";
		app.ctx.fillRect(0, 0, app.main.DEFAULT_WIDTH, app.main.DEFAULT_HEIGHT);
	}
};