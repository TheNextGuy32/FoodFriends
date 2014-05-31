"use strict";

var app = app || {};

app.highScore = {
	ready : false,
	
	init : function()
	{
		console.log("high score init");
		
		// ready to begin
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
		
		// main text
		app.ctx.fillStyle = "#000000";
		app.ctx.font = "24px Helvetica";
		app.ctx.fillText("High Scores!", app.main.DEFAULT_WIDTH/2, 50);
		
		// scores
		for(var i = 0; i < app.game.numberScoresStored; i++)
		{
			if(localStorage[i] != undefined)
			{
				// draw it!
				app.ctx.fillText("Score: " + localStorage[i], app.main.DEFAULT_WIDTH/2, 30 * i + 200);
			}
			
			else
			{
				app.ctx.fillText("-No Score-", app.main.DEFAULT_WIDTH/2, 30 * i + 200);
			}
		}
	}
};