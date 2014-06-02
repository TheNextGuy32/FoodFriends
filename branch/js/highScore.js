"use strict";

var app = app || {};

app.highScore = {
    background:undefined,
	ready : false,
	
	init : function()
	{
	    this.background = new Image();
	    this.background.src = "images/Background.png";

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
	    app.ctx.drawImage(this.background, 0, 0, 320, 480);
		
		// main text
		app.ctx.fillStyle = "#000000";
		app.ctx.font = "24px Helvetica";
		app.ctx.textAlign = "center";
		app.ctx.fillText("High Scores!", app.main.DEFAULT_WIDTH/2, 50);
		
		// scores
		for(var i = 0; i < app.game.numberScoresStored; i++)
		{
			if(localStorage[i] != undefined)
			{
				// draw it!
				app.ctx.fillText("Score: " + localStorage[i], app.main.DEFAULT_WIDTH/2, 30 * i + 200);
				console.log(app.main.DEFAULT_WIDTH/2);
			}
			else if(localStorage[i] == "0")
			{
			    app.ctx.fillText("-No Score-", app.main.DEFAULT_WIDTH/2, 30 * i + 200);
			}
			else
			{
				app.ctx.fillText("-No Score-", app.main.DEFAULT_WIDTH/2, 30 * i + 200);
			}
		}
	}
};