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
	ready              : false,     // if the screen is ready to be used
	instructionsButton : undefined, // button leading to instruction screen
	gameButton         : undefined, // button leading to game screen
	titleImage         : undefined,
	foodImages         : [],
	foodEmitter        : [],
	
	/*
	 * Initializes the title screen with any necessary values
	 *
	 * @return  none
	 */
	init : function()
	{
		console.log("title init!");
		
		this.createAssets();
		
		// ready to begin
		this.ready = true;
	},
	
	/*
	 * Creates the assets necessary in the title menu
	 *
	 * @return  none
	 */
	createAssets : function()
	{
		this.titleImage = new Image();
		this.titleImage.src = "images/title.png";
	
		var gameButton_properties = {
			center : {
				x : 150,
				y : 400
			},
			
			size : {
				width: 80,
				height: 20
			},
			
			text : {
				string: "Start"
			},
			
			callbacks : {
				click : function(){app.main.changeState(app.GAME_STATE.GAME)} 
			}
		};
		
		this.gameButton = new Core2D.Button(gameButton_properties);
		//this.testLabel  = new Core2D.Label(testLabel_properties);
		
		//Loading all the food graphics
        //USA
        var peanutbutterImage = new Image();
        peanutbutterImage.src = "images/hamburger.png";
		this.foodImages.push(peanutbutterImage);

        var friesImage = new Image();
        friesImage.src = "images/fries.png";
		this.foodImages.push(friesImage);

        //Germany
        var schnitzelImage = new Image();
        schnitzelImage.src = "images/beer.png";
		this.foodImages.push(schnitzelImage);
		
        var brautwurstImage = new Image();
        brautwurstImage.src = "images/sausage.png"
		this.foodImages.push(brautwurstImage);

        //Italy
        var pizzaImage = new Image();
        pizzaImage.src = "images/pizza.png";
		this.foodImages.push(pizzaImage);
		
        var spaghettiImage = new Image();
        spaghettiImage.src = "images/spaghetti.png";
		this.foodImages.push(spaghettiImage);

        //France
        var baguetteImage = new Image();
        baguetteImage.src = "images/baguette.png";
		this.foodImages.push(baguetteImage);
		
        var snailImage = new Image();
        snailImage.src = "images/snail.png";
		this.foodImages.push(snailImage);

        //Mexico
        var burritoImage = new Image();
        burritoImage.src = "images/burrito.png";
		this.foodImages.push(burritoImage);
		
        var guacImage = new Image();
        guacImage.src = "images/guacamole.png";
		this.foodImages.push(guacImage);
		
		this.foodEmitter = new FoodEmitter(this.foodImages, 1, 2, 20, 40);
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
		//console.log("test");
		
		// check collision against our button
		var collision = pointInRect({x: mouseX, y: mouseY}, 
		{x: this.gameButton.center.x - this.gameButton.size.width/2,
		 y: this.gameButton.center.y - this.gameButton.size.height/2,
		 width: this.gameButton.size.width,
		 height: this.gameButton.size.height});
		 
		console.log(collision);
		
		if(collision)
		{
			this.gameButton.changeState(Core2D.BUTTON_STATE.CLICK);
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
		app.ctx.drawImage(this.titleImage, 0, 50, app.main.DEFAULT_WIDTH, 100);
		
		// text
		//app.ctx.fillStyle = "#000000";
		//app.ctx.font = "20px Helvetica";
		//app.ctx.fillText("Food Friends", app.main.DEFAULT_WIDTH/5, 50);
		
		// buttons
		this.gameButton.render(app.ctx);
		
		// restore at end
		app.ctx.restore();
	}
};