/*
 * main.js
 *
 * @author  Freddy Garcia
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
    top : 0,
	left: 0
};

app.main = {
	DEFAULT_WIDTH  : 320, // starting width for game
	DEFAULT_HEIGHT : 480, // starting height for game

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
	
	loop : function()
	{
		this.update();
		this.render();
		
		requestAnimationFrame(this.loop.bind(this));
	},
	
	update : function()
	{
		//console.log("update");
	},
	
	render : function()
	{
		//console.log("render");
		app.ctx.clearRect(0, 0, app.dimensions.width, app.dimensions.height);
		
		// background color
		app.ctx.fillStyle = "#FFC972";
		app.ctx.fillRect(0, 0, app.dimensions.width, app.dimensions.height);
		
	}
};

window.onload = function()
{
	console.log("finished loading!");
	app.main.init();
};