/*
 * main.js
 *
 */
"use strict";

// namespace
var app = app || {};

// Globals -------------------------------------------
app.canvas = undefined; // canvas element (HTML5)
app.ctx    = undefined; // rendering context
app.dimensions = {
    width  : undefined,
    height : undefined,
    ratio  : undefined,
	scale  : 1
};                      // dimensions for the canvas
app.offset = {
    top : 5,
	left: 5
};

app.states = {
    TITLE        : 0,
    INSTRUCTIONS : 1,
    GAME         : 2,
	HIGH_SCORE   : 3
};                      // states for the game

app.main = {
	DEFAULT_WIDTH  : 320, // starting width for game
	DEFAULT_HEIGHT : 480, // starting height for game

	//Player1 : app.player,// Creates a new Player
	
	sideBufferX : 10,//The amount of space on the left and right of the lanes
 	lanePositions: new Array(),//The position of each lane
 
 	foodSpeed : 5,//How fast food moves towards player
    foodSize : 64,
 	foods : new Array(),//List of all active food
 
    foodTestImage : undefined,
	
	/*
	 * Initializes the main game
	 *
	 * @return  none
	 */
	init : function()
	{
	    // rendering context -------------------------------------------
	    app.canvas = document.querySelector("canvas");
		app.ctx    = canvas.getContext("2d");
		
	    // dimensions --------------------------------------------------
	    app.dimensions.ratio  = this.DEFAULT_WIDTH / this.DEFAULT_HEIGHT;
	    app.dimensions.width  = this.DEFAULT_WIDTH;
	    app.dimensions.height = this.DEFAULT_HEIGHT;
		
	    // tracking mobile browser agents (useful when resizing)
	    this.ua      = navigator.userAgent.toLowerCase();
	    this.android = this.ua.indexOf('android') > -1 ? true : false;
	    this.ios     = (this.ua.indexOf('iphone') > -1 || this.ua.indexOf('ipad') > -1 || this.ua.indexOf('ipod') > -1) ? true : false;
		
	    // resize screen
		this.resize();

		//set player
		//Create our game countries, machines, etc
 		this.loadContent();
 		this.createGame();

		// start game
		this.loop();
	},
	
	/*
	 * Resizes the screen of the game
	 *
	 * @return  none
	 */
	resize : function()
	{
	    console.log("resize window!");
		
	    // resize height; width resizing is based on height & ratio
	    app.dimensions.height = window.innerHeight;
	    app.dimensions.width  = app.dimensions.height * app.dimensions.ratio;
		
        // scale the actual canvas dimensions
        app.canvas.style.width  = app.dimensions.width + 'px';
        app.canvas.style.height = app.dimensions.height + 'px';
		
        // work-around for address bar on mobile devices
		if(this.android || this.ios)
        {
            // create extra space on page
            document.body.style.height = (window.innerHeight + 50) + 'px';
        }
		
        // set scale relative to default size
	    app.dimensions.scale = app.dimensions.width / this.DEFAULT_WIDTH;
	    
        // set offsets
        app.offset.top  = app.canvas.offsetTop;
        app.offset.left = app.canvas.offsetLeft;
		
		// timeout needed for mobile browsers in order to keep firing function
        window.setTimeout(function(){
			window.scrollTo(0, 1);
		}, 10);
	},
	
	/*
	 * Hey guys! Sorry for the lack of content- long story short, 
     *                                            the charges were dropped
 	 *
 	 * @return  none
 	 */
 	loadContent:function()
 	{
 	    this.foodTestImage = new Image();
 	    this.foodTestImage.src = "sprites/pancakes_final_00-04.png";
 	},
 
     /*
 	 * Creates everything that stays on the screen for the entire game
 	 *
 	 * @return  none
 	 */
 	createGame: function ()
 	{
 	    this.lanePositions[0] = this.sideBufferX + (((this.DEFAULT_WIDTH - (this.sideBufferX * 2)) / 4) * 1);
 	    this.lanePositions[1] = this.sideBufferX + (((this.DEFAULT_WIDTH - (this.sideBufferX * 2)) / 4) * 2);
 	    this.lanePositions[2] = this.sideBufferX + (((this.DEFAULT_WIDTH - (this.sideBufferX * 2)) / 4) * 3);
 
 	    //Temporary food spawning
 	    for (var i = 0; i < 10; i++) {
 	        this.foods.push(new Food("germany",
                                      Math.floor((Math.random() * 3)),
                                      this.lanePositions[0],
                                      10,
                                      this.foodTestImage)
                            );
 	        
 	    }
 	},
	
	/*
	 * main loop for the game
	 *
	 * @return  none
	 */
	loop : function()
	{
		this.update();
		this.render();
		
		requestAnimationFrame(this.loop.bind(this));
	},
	
	/*
	 * Updates the objects in the game
	 *
	 * @param   {Number} dt the amount of time that has elapsed since the previous frame
	 *
	 * @return  none
	 */
	update : function(dt)
	{
		//console.log("update");
		
		for (var i = 0; i < 10; i++)
 	    {
 	        this.foods[i].y = this.foods[i].y + (this.foodSpeed * (1 / 60));
 	    }
	},
	
	/*
	 * Renders our objects onto the canvas rendering context
	 *
	 * @return  none
	 */
	render : function()
	{
		//console.log("render");
		app.ctx.clearRect(0, 0, app.dimensions.width, app.dimensions.height);
		
		// background color
		app.ctx.fillStyle = "#FFC972";
		app.ctx.fillRect(0, 0, app.dimensions.width, app.dimensions.height);
		
		for (var f = 0; f < this.foods.length; f++) {
 		    app.ctx.drawImage(this.foods[f].image,
                               ((this.foods[f].x / this.DEFAULT_WIDTH) * app.dimensions.width) - (this.foodSize * app.dimensions.scale / 2),
                               ((this.foods[f].y / this.DEFAULT_HEIGHT) * app.dimensions.height) - (this.foodSize * app.dimensions.scale / 2),
                               this.foodSize * app.dimensions.scale, this.foodSize * app.dimensions.scale);
 		}
		
		this.showScore();
	},
		/**
		  *function which displays the Score 
		  *and the Playersname
		  *in the upper Left Corner
		  **/
	showScore : function()
	{
		// calculate size of font based on screen dimension
		var size;
		 if (app.dimensions.width < 400)this.size = 8;
		 else this.size = 10;
		 this.font = this.size + 'px sans-serif';
		app.ctx.fillStyle = "#000000";
		app.ctx.font = this.font;
		//app.ctx.textBaseline = 'bottom';
		//app.ctx.lineWidth = 1;
		app.ctx.fillText("Score: "+app.player.getScore()+
				" "+app.player.getName(),app.dimensions.width/50,
				app.dimensions.height/70);
	}
};

window.onload = function()
{
	console.log("finished loading!");
	app.main.init();
};