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
    counrtyChangeTimerReset: 10000,
    countryChangeTimer: undefined,

    DEFAULT_WIDTH: 320, // starting width for game
    DEFAULT_HEIGHT: 480, // starting height for game

    sideBufferX: 10,//The amount of space on the left and right of the lanes
    lanePositions: new Array(),//The position of each lane
    collisionYCoordinate: 100,

    totalGameTime: 0,

    numberScoresStored: 5,

    foodSpawnTimerMaximumSeconds: 7,
    foodSpawnTimerMinimumSeconds: 0.5,
    foodSpawnTimerStartingSeconds: 5,
    foodSpawnTimerMaxSeconds: new Array(),
    foodSpawnCurrentTimeSeconds: new Array(),

    foodSpeed: 100,//How fast food moves towards player
    foodSpeedMax: 100,

    countryFatPointsDeathValue: 10,

    foodSize: 32,

    lanesOfFood: new Array,//The food on each lane, its an array of arrays

    foodSprites: new Array(),
	planeSprites: new Array(),
	
	machines: [],
	machineSprite: undefined,
	
	foodFlags: [],

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
        this.lanePositions[0] = (app.main.DEFAULT_WIDTH*(1/4)-30);
        this.lanePositions[1] = (app.main.DEFAULT_WIDTH*(2/4)-30);
        this.lanePositions[2] = (app.main.DEFAULT_WIDTH*(3/4)-30);

        this.foodSpawnCurrentTimeSeconds[0] = 0;
        this.foodSpawnCurrentTimeSeconds[1] = 0;
        this.foodSpawnCurrentTimeSeconds[2] = 0;

        this.lanesOfFood[0] = new Array();
        this.lanesOfFood[1] = new Array();
        this.lanesOfFood[2] = new Array();

        //Make sure its within reasonable bounds
        for (var t = 0; t < 3; t++) {
            this.foodSpawnTimerMaxSeconds[t] = this.foodSpawnTimerStartingSeconds - 1 + (Math.random() * 2);

            if (this.foodSpawnTimerMaxSeconds[t] > this.foodSpawnTimerMaximumSeconds) {
                this.foodSpawnTimerMaxSeconds[t] = this.foodSpawnTimerMaximumSeconds;
            }
            if (this.foodSpawnTimerMaxSeconds[t] < this.foodSpawnTimerMinimumSeconds) {
                this.foodSpawnTimerMaxSeconds[t] = this.foodSpawnTimerMinimumSeconds;
            }
        }
		
		for(var i = 0; i < 3; i++)
		{
			this.machines[i] = new Machine(this.machineSprite, this.lanePositions[i], 10, 32, 24);
		}
			
		for(var i = 0; i < 3; i++)
		{
			this.foodFlags[i] = new FoodFlag(this.machines[i], undefined, 4, 4);
		}
    },

    init: function () {
        // rendering context -------------------------------------------
        app.canvas = document.querySelector("canvas");
		
		app.canvas.width = this.DEFAULT_WIDTH;
		app.canvas.height = this.DEFAULT_HEIGHT;
		
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
		
		//load flaggs
		var americanImage = new Image();
		americanImage.src = "images/flag_american_final.png";
		
		var frenchImage = new Image();
		frenchImage.src = "images/flag_french_final.png";
		
		var germanImage = new Image();
		germanImage.src = "images/flag_german_final.png";
		
		var italyImage = new Image();
		italyImage.src = "images/flag_italy_final.png";
		
		var mexcioImage = new Image();
		mexcioImage.src = "images/flag_mexico_final.png";
		
		this.planeSprites = new Array(new SpriteKeyPair("Germany", new Array(germanImage)), new SpriteKeyPair("USA", new Array(americanImage)),
                                     new SpriteKeyPair("Italy", new Array(italyImage)), new SpriteKeyPair("France", new Array(frenchImage)),
                                     new SpriteKeyPair("Mexico", new Array(mexcioImage)));
		
		this.machineSprite = new Image();
		//this.machinesprite.src = "images/machine.jpg

        //Loading all the food graphics
        //USA
        var peanutbutterImage = new Image();
        peanutbutterImage.src = "images/hamburger.png";

        var pancakesImage = new Image();
        pancakesImage.src = "images/pancakes.png";

        var friesImage = new Image();
        friesImage.src = "images/fries.png";

        //Germany
        var schnitzelImage = new Image();
        schnitzelImage.src = "images/beer.png";
        var brautwurstImage = new Image();
        brautwurstImage.src = "sprites/brautwurst.png";

        //Italy
        var pizzaImage = new Image();
        pizzaImage.src = "sprites/pizza.png";
        var spaghettiImage = new Image();
        spaghettiImage.src = "sprites/spaghetti.png";

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
        var picoDGImage = new Image();
        picoDGImage.src = "images/picoDeGallo.png";

        //Creating the dictionary of sprites
        this.foodSprites = new Array(new SpriteKeyPair("Germany", new Array(schnitzelImage, brautwurstImage)), new SpriteKeyPair("USA", new Array(peanutbutterImage, pancakesImage)),
                                     new SpriteKeyPair("Italy", new Array(pizzaImage, spaghettiImage)), new SpriteKeyPair("France", new Array(baguetteImage, snailImage)),
                                     new SpriteKeyPair("Mexico", new Array(burritoImage, guacImage, picoDGImage)));

        // Initializes countries
        this.activeCountryArray = new Array(new Country(10, "USA", this.image1), new Country(10, "Germany", this.image2), new Country(10, "France", this.image3));
        this.notActiveCountryArray = new Array(new Array("Mexico", this.image4), new Array("Italy", this.image5));

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

        this.totalGameTime += dtSeconds;

        //SPAWNING FOOD//
        for (var t = 0; t < this.foodSpawnCurrentTimeSeconds.length; t++) {
            //Add dt to the timer
            this.foodSpawnCurrentTimeSeconds[t] += dtSeconds;

            //Should we spawn a burger?
            if (this.foodSpawnCurrentTimeSeconds[t] > this.foodSpawnTimerMaxSeconds[t]) {

                //Reset current timer
                this.foodSpawnCurrentTimeSeconds[t] -= this.foodSpawnTimerMaxSeconds[t];

                //Get a new max timer
                this.foodSpawnTimerMaxSeconds[t] = this.foodSpawnTimerStartingSeconds - 2 + (Math.random() * 4);

                //Check if its within bounds
                if (this.foodSpawnTimerMaxSeconds[t] > this.foodSpawnTimerMaximumSeconds) {
                    this.foodSpawnTimerMaxSeconds[t] = this.foodSpawnTimerMaximumSeconds;
                }
                if (this.foodSpawnTimerMaxSeconds[t] < this.foodSpawnTimerMinimumSeconds) {
                    this.foodSpawnTimerMaxSeconds[t] = this.foodSpawnTimerMinimumSeconds;
                }

                //Chosing country
                var chosenCountry = Math.floor((Math.random() * 6));
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
                    case 5:
                        //Its the country in the lane
                        chosenCountryString = this.activeCountryArray[t].countryName;
                        break;
                    default:
                }
			
				var countryID = 0;
				for (var q = 0; q < this.foodSprites.length; q++)
				{
					if (this.foodSprites[q].getCountry() == chosenCountryString)
					{
						countryID = q;
					}
				}
				
				var choosePlane = Math.floor((Math.random() * 2));
				if(choosePlane == 0 &&  ( chosenCountryString == this.notActiveCountryArray[0][0] || chosenCountryString == this.notActiveCountryArray[1][0]))
				{
					var plane = new Plane(chosenCountryString,
											t,
											this.lanePositions[t],
											10,
											this.planeSprites[countryID].getSprites()[0]);
					this.lanesOfFood[t].push(plane);
				}
				else
				{
					//Choosing food
					var chosenFood = Math.floor((Math.random() * 2));
					var chosenFoodImage = undefined;
					
					chosenFoodImage = this.foodSprites[countryID].getSprites()[chosenFood];

					//Create food
					var food = new Food(chosenCountryString,
											 t,
											 this.lanePositions[t]+15,
											 10,
											 chosenFoodImage);
					this.lanesOfFood[t].push(food);
				}
            }
        }

        //Calculate wave speed
        var currentFoodSpeed = this.foodSpeed + (this.totalGameTime / 10);
        if (currentFoodSpeed > this.foodSpeedMax) {
            currentFoodSpeed = this.foodSpeedMax;
        }

        var numberDeadPeople = 0;

        //Check collisions
        for (var c = 0; c < 3; c++) {
            if (this.activeCountryArray[c].fatPoint > 0) {
                //Every food in the lane
                for (var f = 0; f < this.lanesOfFood[c].length; f++) {
                    //Move the food down
                    this.lanesOfFood[c][f].y = this.lanesOfFood[c][f].y + (currentFoodSpeed * (dtSeconds));

                    //If it goes off screen delete it
                    if (this.lanesOfFood[c][f].y + (this.foodSize / 2) > app.main.DEFAULT_HEIGHT) {
                        this.lanesOfFood[c].splice(f, 1);
                    }

                    //If its across teh food eat line
                    else if (this.lanesOfFood[c][f].y > this.collisionYCoordinate)
                    {
						if(this.lanesOfFood[c][f] instanceof Plane)
						{
							var positionInNotActive = undefined;
							if(this.notActiveCountryArray[0][0] == this.lanesOfFood[c][f].country) 
							{
								this.changeCountry(c, 0);
							}
							if(this.notActiveCountryArray[1][0] == this.lanesOfFood[c][f].country)
							{
								this.changeCountry(c, 1);
							}
						}
						else
						{
							if (this.lanesOfFood[c][f].country == this.activeCountryArray[c].countryName)
							{
								//You ate food from your country! ur getting fat!
								this.activeCountryArray[c].fatPoints++;
								app.player.decScore();
							}
							else
							{
								//You ate food from another country, get points!
								app.player.inkScore();
							}
						}
                        //We remove it once weve eaten it
                        this.lanesOfFood[c].splice(f, 1);
                    }
                }
            }
            else {
                numberDeadPeople++;
            }
        }

        //WE'VE LOST
        if (numberDeadPeople >= 3) {

            //Add and sort the storage
            for (var i = 0; i < this.numberScoresStored; i++) {

                if (localStorage[i] == undefined) {

                    localStorage.setItem(i, app.player.getScore());
                    i = 3;
                }
                else {
                    if (app.player.getScore() > localStorage[i]) {
                        for (var q = this.numberScoresStored - 1; q > i; q--) {
                            if (localStorage[q - 1] != undefined) {

                                localStorage[q] = localStorage[q - 1];
                            }
                        }
                        localStorage.setItem(i, app.player.getScore());
                    }
                }

            }

        }

        this.lastUpdate = Date.now();
    },


    /*
     * Renders our objects onto the canvas rendering context
     *
     * @return  none
     */
    render: function () {

        app.ctx.clearRect(0, 0, app.main.DEFAULT_WIDTH, app.main.DEFAULT_HEIGHT);

        // background 
        
        var background = new Image();
        background.src = "images/Background.png";
        
        app.ctx.fillStyle = "#FFC972";
        app.ctx.drawImage(background,0,0,540,480);

        this.countryChangeTimer -= 1;
        if (this.countryChangeTimer <= 0) {
            this.countryChangeTimer = this.counrtyChangeTimerReset;
            var active = Math.floor(Math.random() * 3);
            var notActive = Math.floor(Math.random() * 2);

            this.changeCountry(active, notActive);
        }

        //Draw countries
        for (var c = 0; c < 3; c++) {
            //Are they alive?
            if (this.activeCountryArray[c].fatPoint > 0) {
                app.ctx.drawImage(this.activeCountryArray[c].getImage(), this.lanePositions[c], this.collisionYCoordinate, 32, 32);
            }
        }
		
		//Draw machine bottoms
		for(var i = 0; i < this.machines.length; i++)
		{
			this.machines[i].drawBottom(app.ctx);
		}

        //Draw all the food
        for (var c = 0; c < 3; c++) {

            //Every food in the lane
            for (var f = 0; f < this.lanesOfFood[c].length; f++) {
                app.ctx.drawImage(this.lanesOfFood[c][f].image, this.lanesOfFood[c][f].x - (this.foodSize / 2), this.lanesOfFood[c][f].y - (this.foodSize / 2), this.foodSize, this.foodSize);

            }
        }
		
		//Draw machines
		for(var i = 0; i < this.machines.length; i++)
		{
			this.machines[i].draw(app.ctx);
		}

        this.showScore();

        //Highscore
        //app.ctx.fillText("HIGHSCORES", 110, 40);

        //for (var i = 0; i < this.numberScoresStored; i++) {
        //    if (localStorage[i] != undefined) {
        //        app.ctx.fillText(localStorage[i], 110, 50 + (i * 10));
        //    }
        //    else
        //    {
        //        app.ctx.fillText("-No Score-", 110, 50 + (i * 10));
        //    }
        //}



    },

    /**
      *function which displays the Score 
      *and the Playersname
      *in the upper Left Corner
      **/
    showScore: function () {
        // calculate size of font based on screen dimension
        app.ctx.fillStyle = "#000000";
        app.ctx.font = "10px Helvetica";
        
    	app.ctx.textAlign = "left";
    	app.ctx.textBaseline = "top";
        
        //app.ctx.textBaseline = 'bottom';
        //app.ctx.lineWidth = 1;

        app.ctx.fillText("Score: " + app.player.getScore() +
                " " + app.player.getName(), 110, 10);

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
        var tmpCountryName = this.activeCountryArray[active].getCountryName();
        var tmpCountryImg = this.activeCountryArray[active].getImage();
        this.activeCountryArray[active].setCountryName(this.notActiveCountryArray[notActive][0]);
        this.activeCountryArray[active].setImage(this.notActiveCountryArray[notActive][1]);
        this.notActiveCountryArray[notActive][0] = tmpCountryName;
        this.notActiveCountryArray[notActive][1] = tmpCountryImg;
    },
   
};
