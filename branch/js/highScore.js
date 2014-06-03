"use strict";

var app = app || {};

app.highScore = {
    background : undefined,
	mainLabelIMG: undefined,
	mainBoxIMG    : undefined,
	ready      : false,
	menuButton : undefined,
	
	init : function()
	{
	    this.background = new Image();
	    this.background.src = "images/Background.png";

		console.log("high score init");
		
		this.createAssets();
		
		// ready to begin
		this.ready = true;
	},
	
	createAssets : function()
	{
	    // button img
		var buttonIMG = new Image();
		buttonIMG.src = "images/button_menu.png";
	
	    // button
		var mainMenuButton_properties = {
		    center: {
			    x: 160,
				y: 410
			},
			
			size : {
			    width: 150,
				height : 40
			},
			
			image : buttonIMG,
			
			callbacks: {
			    click: function(){app.main.changeState(app.GAME_STATE.TITLE)}
			}
		};
		
		// images
		this.mainLabelIMG = new Image();
		this.mainLabelIMG.src = "images/label_highScore.png";
		
		this.mainBoxIMG = new Image();
		this.mainBoxIMG.src = "images/box.png";
		
		// create button
		this.menuButton = new Core2D.Button(mainMenuButton_properties);
	},
	
	update : function()
	{
	},
	
	checkMouse: function(mouseX, mouseY)
	{
	    var collision;
		
		collision = pointInRect({x: mouseX, y: mouseY},
		{x: this.menuButton.center.x - this.menuButton.size.width/2,
		 y: this.menuButton.center.y - this.menuButton.size.height/2,
		 width : this.menuButton.size.width,
		 height: this.menuButton.size.height});
		 
		if(collision)
		    this.menuButton.changeState(Core2D.BUTTON_STATE.CLICK);
	},
	
	render : function()
	{
		app.ctx.save();
	
		// background
	    app.ctx.drawImage(this.background, 0, 0, 320, 480);
		
		// box
		app.ctx.drawImage(this.mainBoxIMG, 35, 175, 250,175);
		
		// main text
		app.ctx.fillStyle = "#000000";
		app.ctx.font = "24px Helvetica";
		app.ctx.textAlign = "center";
		//app.ctx.fillText("High Scores!", app.main.DEFAULT_WIDTH/2, 90);
		app.ctx.drawImage(this.mainLabelIMG, app.main.DEFAULT_WIDTH/2 - app.main.DEFAULT_WIDTH/2.31, 60);
		
		// scores
		for(var i = 0; i < app.game.numberScoresStored; i++)
		{
			if(localStorage[i] != undefined)
			{
				// draw it!
				app.ctx.fillText("Score: " + localStorage[i], app.main.DEFAULT_WIDTH/2, 30 * i + 205);
				console.log(app.main.DEFAULT_WIDTH/2);
			}
			else if(localStorage[i] == "0")
			{
			    app.ctx.fillText("-No Score-", app.main.DEFAULT_WIDTH/2, 30 * i + 205);
			}
			else
			{
				app.ctx.fillText("-No Score-", app.main.DEFAULT_WIDTH/2, 30 * i + 205);
			}
		}
		
		this.menuButton.render(app.ctx);
		
		app.ctx.restore();
	}
};