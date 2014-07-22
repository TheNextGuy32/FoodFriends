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
	mainMenuButton : undefined,
	background : undefined,
	mainLabel : undefined,
	mainBoxIMG : undefined,
	
	init : function()
	{
		//console.log("instructions init");
		
		this.createAssets();
	},
	
	createAssets : function()
	{	
		// images
	    var mmButtonIMG = new Image();
		mmButtonIMG.src = "images/button_menu.png";
		
		this.background = new Image();
		this.background.src = "images/background.png";
		
		this.mainLabel = new Image();
		this.mainLabel.src = "images/label_instructions.png";
		
		this.mainBoxIMG = new Image();
		this.mainBoxIMG.src = "images/box.png";
	
	    var mmButtonProperties = {
		    // SIR!!!!!! *ahem* Madam!!!!!
			center : {
			    x: 160,
				y: 410
			},
			
			size : {
			    width: 150,
				height: 40
			},
			
			image : mmButtonIMG,
			
			text : {
			    string: "Main menu"
			},
			
			callbacks : {
			    click: function(){app.main.changeState(app.GAME_STATE.TITLE)}
			}
		};
		
		this.mainMenuButton = new Core2D.Button(mmButtonProperties);
	
	    this.ready = true;
	},
	
	checkMouse : function(mouseX, mouseY)
	{
		// check collisions
		var collision = pointInRect( {x: mouseX, y: mouseY},
		{x: this.mainMenuButton.center.x - this.mainMenuButton.size.width/2,
	     y: this.mainMenuButton.center.y - this.mainMenuButton.size.height/2,
		 width: this.mainMenuButton.size.width,
		 height: this.mainMenuButton.size.height});
		 
		if(collision)
			this.mainMenuButton.changeState(Core2D.BUTTON_STATE.CLICK);
	},
	
	update : function()
	{
	},
	
	render : function()
	{
		app.ctx.save();
	
		// bcgk
		app.ctx.fillStyle = "#000000";
		app.ctx.font = "16px Helvetica";
		app.ctx.textAlign = "center";
		//app.ctx.fillText("nice words :)", 50, 50);
		
		app.ctx.drawImage(this.background, 0, 0, app.main.DEFAULT_WIDTH, app.main.DEFAULT_HEIGHT);
		
		// label
		app.ctx.drawImage(this.mainLabel, app.main.DEFAULT_WIDTH/2 - app.main.DEFAULT_WIDTH/2.31, 60);
		
		app.ctx.drawImage(this.mainBoxIMG, 35, 175, 250, 175);
		
		// text
		app.ctx.fillText("1) Eat food using characters.", app.main.DEFAULT_WIDTH/2, 200);
		app.ctx.fillText("2) Characters may not eat food", app.main.DEFAULT_WIDTH/2, 230);
		app.ctx.fillText("from their own country!", app.main.DEFAULT_WIDTH/2, 260);
		app.ctx.fillText("3) Click on the sides of the screen", app.main.DEFAULT_WIDTH/2, 290);
		app.ctx.fillText("to switch between characters.", app.main.DEFAULT_WIDTH/2, 320);
		
		this.mainMenuButton.render(app.ctx);
		
		app.ctx.restore();
	}
};