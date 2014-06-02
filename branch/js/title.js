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
	ready                   : false,     // if the screen is ready to be used
	titleImage              : undefined,
	foodEmitter             : [],
	buttons                 : new Array(),
	
	/*
	 * Initializes the title screen with any necessary values
	 *
	 * @return  none
	 */
	init : function()
	{
		console.log("title init!");
		
		this.createAssets();
	},
	
	/*
	 * Creates the assets necessary in the title menu
	 *
	 * @return  none
	 */
	createAssets : function()
	{
		// title stuff
		this.titleImage = new Image();
		this.titleImage.src = "images/title.png";
		
		var gameButtonImage = new Image();
		gameButtonImage.src = "images/button_play.png";
		
		var instructionsButtonImage = new Image();
		instructionsButtonImage.src = "images/button_instructions.png";
		
		var highScoreButtonImage = new Image();
		highScoreButtonImage.src = "images/button_highScore.png";
	
		var gameButton_properties = {
			center : {
				x : 160,
				y : 310
			},
			
			size : {
				width: 150,
				height: 40
			},
			
			image : gameButtonImage,
			
			callbacks : {
				click : function(){app.main.changeState(app.GAME_STATE.GAME)} 
			}
		};
		
		var instructionsButton_properties = {
			center: {
			    x: 160,
				y: 410
			},
			
			size : {
			    width : 150,
				height: 40
			},
			
			image : instructionsButtonImage,
			
			callbacks : {
				click : function(){app.main.changeState(app.GAME_STATE.INSTRUCTIONS)}
			}
		};
		
		var highScoreButton_properties = {
			center: {
			    x: 160,
				y: 360
			},
			
			size: {
			    width : 150,
				height: 40
			},
			
			image : highScoreButtonImage,
			
			callbacks: {
			    click : function(){app.main.changeState(app.GAME_STATE.HIGH_SCORE)}
			}
		};
		
		// creating buttons
		this.buttons.push(new Core2D.Button(gameButton_properties));
		this.buttons.push(new Core2D.Button(instructionsButton_properties));
		this.buttons.push(new Core2D.Button(highScoreButton_properties));
		
		//Loading all the food graphics
        //USA
        var peanutbutterImage = new Image();
        peanutbutterImage.src = "images/hamburger.png";		

        var friesImage = new Image();
        friesImage.src = "images/fries.png";

        //Germany
        var schnitzelImage = new Image();
        schnitzelImage.src = "images/beer.png";
		
        var brautwurstImage = new Image();
        brautwurstImage.src = "images/sausage.png"

        //Italy
        var pizzaImage = new Image();
        pizzaImage.src = "images/pizza.png";
		
        var spaghettiImage = new Image();
        spaghettiImage.src = "images/spaghetti.png";

        //France
        var baguetteImage = new Image();
        baguetteImage.src = "images/baguette.png";
		
        var snailImage = new Image();
        snailImage.src = "images/snail.png";

        //Mexico
        var burritoImage = new Image();
        burritoImage.src = "images/burrito.png";
		
        var guacImage = new Image();
        guacImage.src = "images/guacamole.png";
		
		// adding to resources
		app.resources.addImage("hamburger", peanutbutterImage);
		app.resources.addImage("fries", friesImage);
		app.resources.addImage("schnitzel", schnitzelImage);
		app.resources.addImage("brautwurst", brautwurstImage);
		app.resources.addImage("pizza", pizzaImage);
		app.resources.addImage("spaghetti", spaghettiImage);
		app.resources.addImage("baguette", baguetteImage);
		app.resources.addImage("snail", snailImage);
		app.resources.addImage("burrito", burritoImage);
		app.resources.addImage("guacamole", guacImage);
		
		// ugly
		this.foodEmitter = new FoodEmitter(
		  [app.resources.getImage("hamburger"),
		   app.resources.getImage("fries"),
		   app.resources.getImage("schnitzel"),
		   app.resources.getImage("brautwurst"),
		   app.resources.getImage("pizza"),
		   app.resources.getImage("spaghetti"),
		   app.resources.getImage("baguette"),
		   app.resources.getImage("snail"),
		   app.resources.getImage("burrito"),
		   app.resources.getImage("guacamole")], 
		  1,
		  2,
		  20,
		  40,
		  5);
		
		// ready to begin
		this.ready = true;
	},
	
	update : function()
	{
		this.pollKeyboard();
		//this.checkCollisions();
		
		this.foodEmitter.update();
	},
	
	/*
	 * polls the keyboard to check if certain keys are being pressed
	 *
	 * @return  none
	 */
	pollKeyboard : function()
	{
		if(app.keydown[app.keys.ENTER])
			app.main.changeState(app.GAME_STATE.GAME);
	},
	
	/*
	 * checks for collisions against the buttons on the screen
	 *
	 * @return  none
	 */
	checkCollisions : function(mouseX, mouseY)
	{
		// check collisions
		for(var i = 0; i < this.buttons.length; i++)
		{
		    var collision = pointInRect({x: mouseX, y: mouseY},
			{x: this.buttons[i].center.x - this.buttons[i].size.width/2,
			 y: this.buttons[i].center.y - this.buttons[i].size.height/2,
			 width: this.buttons[i].size.width,
			 height: this.buttons[i].size.height});
			 
			if(collision)
				this.buttons[i].changeState(Core2D.BUTTON_STATE.CLICK);
		}
	},
	
	/*
	 * Renders the objects to the context
	 *
	 * @return  none
	 */
	render : function()
	{
		//console.log("title render");
		// save before draws
		app.ctx.save();
		
		// background
		app.ctx.fillStyle = "#FFC972";
		app.ctx.fillRect(0, 0, app.main.DEFAULT_WIDTH, app.main.DEFAULT_HEIGHT);
		
		// draw falling food
		this.foodEmitter.draw(app.ctx);
		
		// draw logo
		app.ctx.drawImage(this.titleImage, app.main.DEFAULT_WIDTH/2 - app.main.DEFAULT_WIDTH/2.4, 50, app.main.DEFAULT_WIDTH/1.2, 180);
		
		// buttons
		for(var i = 0; i < this.buttons.length; i++)
			this.buttons[i].render(app.ctx);
			
		// restore at end
		app.ctx.restore();
	}
};