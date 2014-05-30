/*
 * main.js
 *
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

app.states = {
    TITLE: 0,
    INSTRUCTIONS: 1,
    GAME: 2,
    HIGH_SCORE: 3
};                      // states for the game

app.main = {
    lastUpdate: Date.now(),
    counrtyChangeTimerReset: 100,
    countryChangeTimer: undefined,

    DEFAULT_WIDTH: 320, // starting width for game
    DEFAULT_HEIGHT: 480, // starting height for game

    sideBufferX: 10,//The amount of space on the left and right of the lanes
    lanePositions: new Array(),//The position of each lane

    foodSpawnTimerSeconds: 3,
    foodCurrentSpawnTimeSeconds: new Array(),

    foodSpeed: 5,//How fast food moves towards player
    foodSize: 64,
    foods: new Array(),//List of all active food

    foodSprites: new Array(),

    //Player1 : app.player,// Creates a new Player

    image1: undefined, // images of 1st country
    image2: undefined, // images of 2nd country
    image3: undefined, // images of 3rd country
    image4: undefined, // images of 4th country
    image5: undefined, // images of 5th country
    image6: undefined, // images of 6th country
    activeCountryArray: undefined,
    notActiveCountryArray: undefined,



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

        //load images
        this.image1 = new Image();
        this.image1.src = "sprites/country1.png";

        this.image2 = new Image();
        this.image2.src = "sprites/country2.png";

        this.image3 = new Image();
        this.image3.src = "sprites/country3.png";

        this.image4 = new Image();
        this.image4.src = "sprites/country4.png";

        this.image5 = new Image();
        this.image5.src = "sprites/country5.png";

        this.image6 = new Image();
        this.image6.src = "sprites/country6.png";

        //Loading all the food graphics
        //USA
        var peanutbutterImage = new Image();
        peanutbutterImage.src = "sprites/peanutbutter.png";
        var pancakesImage = new Image();
        pancakesImage.src = "sprites/pancakes_final_00-04.png";

        //Germany
        var schnitzelImage = new Image();
        schnitzelImage.src = "sprites/schnitzel.png";
        var brautwurstImage = new Image();
        brautwurstImage.src = "sprites/brautwurst.png";

        //Italy
        var pizzaImage = new Image();
        pizzaImage.src = "sprites/pizza.png";
        var spaghettiImage = new Image();
        spaghettiImage.src = "sprites/spaghetti.png";

        //France
        var baguetteImage = new Image();
        baguetteImage.src = "sprites/baguette.png";
        var snailImage = new Image();
        snailImage.src = "sprites/snail.png";

        //Mexico
        var burritoImage = new Image();
        burritoImage.src = "sprites/burrito.png";
        var guacImage = new Image();
        guacImage.src = "sprites/guac.png";

        //Creating the dictionary of sprites
        this.foodSprites = new Array(new SpriteKeyPair("Germany", new Array(schnitzelImage, brautwurstImage)), new SpriteKeyPair("USA", new Array(peanutbutterImage, pancakesImage)),
                                     new SpriteKeyPair("Italy", new Array(pizzaImage, spaghettiImage)), new SpriteKeyPair("France", new Array(baguetteImage, snailImage)),
                                     new SpriteKeyPair("Mexico", new Array(burritoImage, guacImage)));

        // Initializes countries
        this.activeCountryArray = new Array(new Country(10, "USA", this.image1), new Country(10, "Germany", this.image2), new Country(10, "France", this.image3));
        this.notActiveCountryArray = new Array(new Country(10, "Canada", this.image4), new Country(10, "Mexico", this.image5), new Country(10, "Italy", this.image6));

        this.countryChangeTimer = this.counrtyChangeTimerReset;

        // resize screen
        this.resize();

        //set player
        //Create our game countries, machines, etc

        this.createGame();

        // start game
        this.loop();
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

        // resizing the canvas element on the browser
        app.canvas.style.width = app.dimensions.width + 'px';
        app.canvas.style.height = app.dimensions.height + 'px';

        // set scale relative to default size
        app.dimensions.scale = app.dimensions.width / app.main.DEFAULT_WIDTH;

        console.log("scale: " + app.dimensions.scale);

        // set offsets
        app.offset.top = app.canvas.offsetTop;
        app.offset.left = app.canvas.offsetLeft;
		
		//console.log("width: " + 


        // timeout needed for mobile browsers in order to keep firing function
        window.setTimeout(function () {
            window.scrollTo(0, 1);
        }, 1);
    },



    loop: function () {
        this.update();
        this.render();

        requestAnimationFrame(this.loop.bind(this));
    },

    update: function () {
        var dtSeconds = (Date.now() - this.lastUpdate) / 1000;

        //SPAWNING FOOD//
        for (var t = 0; t < this.foodCurrentSpawnTimeSeconds.length; t++) {
            //Add dt to the timer
            this.foodCurrentSpawnTimeSeconds[t] += dtSeconds;

            //Should we spawn a burger?
            if (this.foodCurrentSpawnTimeSeconds[t] > this.foodSpawnTimerSeconds) {
                //Reset timer
                this.foodCurrentSpawnTimeSeconds[t] -= this.foodSpawnTimerSeconds;


                //Chosing country
                var chosenCountry = Math.floor((Math.random() * 5));
                var chosenCountryString = undefined;
                switch (chosenCountry) {
                    case 0:
                        chosenCountryString = "Germany";
                        break;
                    case 1:
                        chosenCountryString = "USA";
                        break;
                    case 2:
                        chosenCountryString = "France";
                        break;
                    case 3:
                        chosenCountryString = "Italy";
                        break;
                    case 4:
                        chosenCountryString = "Mexico";
                        break;
                    default:
                }
                //Choosing food
                var chosenFood = Math.floor((Math.random() * 2));
                var chosenFoodImage = undefined;
                for (var q = 0; q < this.foodSprites.length; q++) {
                    console.log(this.foodSprites[q].getCountry());
                    if (this.foodSprites[q].getCountry() == chosenCountryString) {
                        chosenFoodImage = this.foodSprites[q].getSprites()[chosenFood];
                    }
                    //debugger;
                }

                //Create food
                this.foods.push(new Food(chosenCountryString,
                                         t,
                                         this.lanePositions[t],
                                         10,
                                         chosenFoodImage)
               );


            }
        }

        //Move food down
        for (var i = 0; i < this.foods.length; i++)
            this.foods[i].y = this.foods[i].y + (this.foodSpeed * (dtSeconds));


        this.lastUpdate = Date.now();
    },


    /*
     * Renders our objects onto the canvas rendering context
     *
     * @return  none
     */
    render: function () {

        app.ctx.clearRect(0, 0, app.dimensions.width, app.dimensions.height);

        // background color
        app.ctx.fillStyle = "#FFC972";
        app.ctx.fillRect(0, 0, app.dimensions.width, app.dimensions.height);

        this.countryChangeTimer -= 1;
        if (this.countryChangeTimer <= 0) {
            this.countryChangeTimer = this.counrtyChangeTimerReset;
            var active = Math.floor(Math.random() * 3);
            var notActive = Math.floor(Math.random() * 3);

            this.changeCountry(active, notActive);
        }

        //draw countries
        var sizeOfCountry = app.dimensions.width / 10;
        app.ctx.drawImage(this.activeCountryArray[0].getImage(), app.dimensions.width / 4 - sizeOfCountry / 2, app.dimensions.height / 10, sizeOfCountry, sizeOfCountry * 0.76422);
        app.ctx.drawImage(this.activeCountryArray[1].getImage(), app.dimensions.width / 2 - sizeOfCountry / 2, app.dimensions.height / 10, sizeOfCountry, sizeOfCountry * 0.76422);
        app.ctx.drawImage(this.activeCountryArray[2].getImage(), 3 * app.dimensions.width / 4 - sizeOfCountry / 2, app.dimensions.height / 10, sizeOfCountry, sizeOfCountry * 0.76422);

        //Draw all the food
        for (var f = 0; f < this.foods.length; f++) {
            //Is it within screen bounds
            app.ctx.drawImage(this.foods[f].image,
                              ((this.foods[f].x / this.DEFAULT_WIDTH) * app.dimensions.width) - (this.foodSize * app.dimensions.scale / 2),
                              ((this.foods[f].y / this.DEFAULT_HEIGHT) * app.dimensions.height) - (this.foodSize * app.dimensions.scale / 2),
                              this.foodSize * app.dimensions.scale, this.foodSize * app.dimensions.scale);
            
            
            
            this.showScore();
        }
    },

    /**
      *function which displays the Score 
      *and the Playersname
      *in the upper Left Corner
      **/
    showScore: function () {
        // calculate size of font based on screen dimension
        var size;
        if (app.dimensions.width < 400) this.size = 8;
        else this.size = 10;
        this.font = this.size + 'px sans-serif';
        app.ctx.fillStyle = "#000000";
        app.ctx.font = this.font;
        //app.ctx.textBaseline = 'bottom';
        //app.ctx.lineWidth = 1;
        app.ctx.fillText("Score: " + app.player.getScore() +
                " " + app.player.getName(), app.dimensions.width / 50,
                app.dimensions.height / 70);
    },

    switchLane: function (button) {
        if (button == 1) {
            var tmpCountry = this.activeCountryArray[0];
            this.activeCountryArray[0] = this.activeCountryArray[1];
            this.activeCountryArray[1] = tmpCountry;
        }

        if (button == 2) {
            var tmpCountry = this.activeCountryArray[1];
            this.activeCountryArray[1] = this.activeCountryArray[2];
            this.activeCountryArray[2] = tmpCountry;
        }
    },

    changeCountry: function (active, notActive) {
        var tmpCountry = this.activeCountryArray[active];
        this.activeCountryArray[active] = this.notActiveCountryArray[notActive];
        this.notActiveCountryArray[notActive] = tmpCountry;
    },
    checkfood:function(food,country){
    	
    	if(food.country == country && food.y>(4/5)*app.dimensions.height)
    		app.player.inkScore();
    	
    }
};
