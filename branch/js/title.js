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
	foodImages              : [],
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
				y : 440
			},
			
			size : {
				width: 100,
				height: 30
			},
			
			image : gameButtonImage,
			
			callbacks : {
				click : function(){app.main.changeState(app.GAME_STATE.GAME)} 
			}
		};
		
		var instructionsButton_properties = {
			center: {
			    x: 160,
				y: 340
			},
			
			size : {
			    width : 100,
				height: 30
			},
			
			image : instructionsButtonImage,
			
			callbacks : {
				click : function(){app.main.changeState(app.GAME_STATE.INSTRUCTIONS)}
			}
		};
		
		var highScoreButton_properties = {
			center: {
			    x: 160,
				y: 390
			},
			
			size: {
			    width : 100,
				height: 30
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
		//this.foodImages.push(peanutbutterImage);
		app.resources.addImage("hamburger", peanutbutterImage);

        var friesImage = new Image();
        friesImage.src = "images/fries.png";
		//this.foodImages.push(friesImage);
		app.resources.addImage("fries", friesImage);

        //Germany
        var schnitzelImage = new Image();
        schnitzelImage.src = "images/beer.png";
		//this.foodImages.push(schnitzelImage);
		app.resources.addImage("schnitzel", schnitzelImage);
		
        var brautwurstImage = new Image();
        brautwurstImage.src = "images/sausage.png"
		//this.foodImages.push(brautwurstImage);
		app.resources.addImage("brautwurst", brautwurstImage);

        //Italy
        var pizzaImage = new Image();
        pizzaImage.src = "images/pizza.png";
		//this.foodImages.push(pizzaImage);
		app.resources.addImage("pizza", pizzaImage);
		
        var spaghettiImage = new Image();
        spaghettiImage.src = "images/spaghetti.png";
		//this.foodImages.push(spaghettiImage);
		app.resources.addImage("spaghetti", spaghettiImage);

        //France
        var baguetteImage = new Image();
        baguetteImage.src = "images/baguette.png";
		//this.foodImages.push(baguetteImage);
		app.resources.addImage("baguette", baguetteImage);
		
        var snailImage = new Image();
        snailImage.src = "images/snail.png";
		//this.foodImages.push(snailImage);
		app.resources.addImage("snail", snailImage);

        //Mexico
        var burritoImage = new Image();
        burritoImage.src = "images/burrito.png";
		//this.foodImages.push(burritoImage);
		app.resources.addImage("burrito", burritoImage);
		
        var guacImage = new Image();
        guacImage.src = "images/guacamole.png";
		//this.foodImages.push(guacImage);
		app.resources.addImage("guacamole", guacImage);
		
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
		  1, 2, 20, 40, 5);
		
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
		app.ctx.drawImage(this.titleImage, app.main.DEFAULT_WIDTH/2 - app.main.DEFAULT_WIDTH/4, 30, app.main.DEFAULT_WIDTH/2, 100);
		
		// buttons
		for(var i = 0; i < this.buttons.length; i++)
			this.buttons[i].render(app.ctx);
			
		// restore at end
		app.ctx.restore();
	}
};