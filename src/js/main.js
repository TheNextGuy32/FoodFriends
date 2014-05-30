/*
 * main.js
 *
 * @author  Freddy Garcia and friends
 */
"use strict";

// namespace
var app = app || {};

// Globals -------------------------------------------
app.canvas = undefined; // canvas element (HTML5)
app.ctx = undefined; // rendering context
app.dimensions = {
    width: undefined,
    height: undefined,
    ratio: undefined,
    scale: 1
};                      // dimensions for the canvas
app.offset = {
    top: 5,
    left: 5
};

app.main = {
    lastUpdate: Date.now(),

    DEFAULT_WIDTH: 320, // starting width for game
    DEFAULT_HEIGHT: 480, // starting height for game

    sideBufferX: 10,//The amount of space on the left and right of the lanes
    lanePositions: new Array(),//The position of each lane

    foodSpawnTimerSeconds: 3,
    foodCurrentSpawnTimeSeconds : new Array(),

    foodSpeed: 5,//How fast food moves towards player
    foodSize: 64,
    foods: new Array(),//List of all active food

    foodTestImage: undefined,

    /*
	 * Initializes the main game
	 *
	 * @return  none
	 */
    init: function () {
        // rendering context -------------------------------------------
        app.canvas = document.querySelector("canvas");
        app.ctx = canvas.getContext("2d");

        // dimensions --------------------------------------------------
        app.dimensions.ratio = this.DEFAULT_WIDTH / this.DEFAULT_HEIGHT;
        app.dimensions.width = this.DEFAULT_WIDTH;
        app.dimensions.height = this.DEFAULT_HEIGHT;

        // tracking mobile browser agents (useful when resizing)
        this.ua = navigator.userAgent.toLowerCase();
        this.android = this.ua.indexOf('android') > -1 ? true : false;
        this.ios = (this.ua.indexOf('iphone') > -1 || this.ua.indexOf('ipad') > -1 || this.ua.indexOf('ipod') > -1) ? true : false;

        // resize screen
        this.resize();

        //Create our game countries, machines, etc
        this.loadContent();
        this.createGame();

        // start game
        this.loop();
    },

    /*
	 * Hey guys! Sorry for the lack of content- long story short, 
     *                                            the charges were dropped
	 *
	 * @return  none
	 */
    loadContent: function () {
        this.foodTestImage = new Image();
        this.foodTestImage.src = "sprites/pancakes_final_00-04.png";
    },

    /*
	 * Creates everything that stays on the screen for the entire game
	 *
	 * @return  none
	 */
    createGame: function () {
        this.lanePositions[0] = this.sideBufferX + (((this.DEFAULT_WIDTH - (this.sideBufferX * 2)) / 4) * 1);
        this.lanePositions[1] = this.sideBufferX + (((this.DEFAULT_WIDTH - (this.sideBufferX * 2)) / 4) * 2);
        this.lanePositions[2] = this.sideBufferX + (((this.DEFAULT_WIDTH - (this.sideBufferX * 2)) / 4) * 3);
        this.foodCurrentSpawnTimeSeconds[0] = 0;
        this.foodCurrentSpawnTimeSeconds[1] = 0;
        this.foodCurrentSpawnTimeSeconds[2] = 0;
    },

    /*
	 * Resizes the screen of the game
	 *
	 * @return  none
	 */
    resize: function () {
        console.log("resize window!");

        // resize height; width resizing is based on height & ratio
        app.dimensions.height = window.innerHeight;
        app.dimensions.width = app.dimensions.height * app.dimensions.ratio;

        // scale the actual canvas dimensions
        app.canvas.style.width = app.dimensions.width + 'px';
        app.canvas.style.height = app.dimensions.height + 'px';

        // work-around for address bar on mobile devices
        if (this.android || this.ios) {
            // create extra space on page
            document.body.style.height = (window.innerHeight + 50) + 'px';
        }

        // set scale relative to default size
        app.dimensions.scale = app.dimensions.width / this.DEFAULT_WIDTH;

        // set offsets
        app.offset.top = app.canvas.offsetTop;
        app.offset.left = app.canvas.offsetLeft;

        // timeout needed for mobile browsers in order to keep firing function
        window.setTimeout(function () {
            window.scrollTo(0, 1);
        }, 10);
    },



    loop: function () {
        this.update();
        this.render();

        requestAnimationFrame(this.loop.bind(this));
    },

    update: function () {
        var dtSeconds = (Date.now() - this.lastUpdate) / 1000;
        
        //SPAWNING FOOD//
        console.log(this.foodCurrentSpawnTimeSeconds.length);
        for (var t = 0; t < this.foodCurrentSpawnTimeSeconds.length; t++)
        {
            //Add dt to the timer
            this.foodCurrentSpawnTimeSeconds[t] += dtSeconds;
            

            //Should we spawn a burger?
            if (this.foodCurrentSpawnTimeSeconds[t] > this.foodSpawnTimerSeconds)
            {
                //Reset timer
                this.foodCurrentSpawnTimeSeconds[t] -= this.foodSpawnTimerSeconds;

                //Create food
                
                this.foods.push(new Food("germany",
                                         t,
                                         this.lanePositions[t],
                                         10,
                                         this.foodTestImage)
               );

            }
        }

        //Move food down
        for (var i = 0; i < this.foods.length; i++) {
            this.foods[i].y = this.foods[i].y + (this.foodSpeed * (dtSeconds));
            
        }

        this.lastUpdate = Date.now();
    },

    render: function () {
        //console.log("render");
        app.ctx.clearRect(0, 0, app.dimensions.width, app.dimensions.height);

        // background color
        app.ctx.fillStyle = "#FFC972";
        app.ctx.fillRect(0, 0, app.dimensions.width, app.dimensions.height);



        //Draw all the food
        for (var f = 0; f < this.foods.length; f++) {

            //Is it within screen bounds
            app.ctx.drawImage(this.foods[f].image,
                              ((this.foods[f].x / this.DEFAULT_WIDTH) * app.dimensions.width) - (this.foodSize * app.dimensions.scale / 2),
                              ((this.foods[f].y / this.DEFAULT_HEIGHT) * app.dimensions.height) - (this.foodSize * app.dimensions.scale / 2),
                              this.foodSize * app.dimensions.scale, this.foodSize * app.dimensions.scale);



        }


    }
};

window.onload = function () {
    console.log("finished loading!");
    app.main.init();
};