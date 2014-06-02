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
	
	init : function()
	{
		//console.log("instructions init");
		
		this.createAssets();
	},
	
	createAssets : function()
	{
	    var mmButtonIMG = new Image();
		mmButtonIMG.src = "images/button_menu.png";
	
	    var mmButtonProperties = {
		    // SIR!!!!!! *ahem* Madam!!!!!
			center : {
			    x: 160,
				y: 380
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
	
		app.ctx.fillStyle = "#FFFFFF";
		app.ctx.fillText("nice words :)", 50, 50);
		
		this.mainMenuButton.render(app.ctx);
		
		app.ctx.restore();
	}
};