/*
 * game.js
 *
 * Handles the functionality for the gameplay aspect of Food Friends
 */
"use strict";

// namespace
var app = app || {};

app.game = {
    // Constants ----------------------------------------------------


    // Variables ----------------------------------------------------
    ready: false,
    lastUpdate: undefined,
    counrtyChangeTimerReset: 10000,
    countryChangeTimer: undefined,

    DEFAULT_WIDTH: 320, // starting width for game
    DEFAULT_HEIGHT: 480, // starting height for game

    sideBufferX: -25,//The amount of space on the left and right of the lanes
    lanePositions: new Array(),//The position of each lane
    collisionYCoordinate: 400,

    swapLeftButton: undefined,
    swapRightButton: undefined,

    totalGameTime: 0,
    numberDeadPeople: 0,

    crunchSound0: undefined,
    crunchSound1: undefined,
    flybySound: undefined,

    numberScoresStored: 5,

    foodSpawnTimerMaximumSeconds: 5,
    foodSpawnTimerMinimumSeconds: 0.5,
    foodSpawnTimerStartingSeconds: 3,
    foodSpawnTimerMaxSeconds: new Array(),
    foodSpawnCurrentTimeSeconds: new Array(),

    foodSpeed: 100,//How fast food moves towards player
    foodSpeedMax: 100,

    countryFatPointsDeathValue: 10,

    foodSize: 50,
    fatPoints: 4,

    lanesOfFood: new Array,//The food on each lane, its an array of arrays

    foodSprites: new Array(),

    machines: [],
    machineSprite: undefined,
    conveyorSprite: undefined,

    planeSprites: new Array(),

    //foodFlags: [],
    emitters: [],

    background: undefined,
    americaImages: [],
    franceImages: [],
    germanyImages: [],
    italyImages: [],
    mexicoImages: [],
    activeCountryArray: undefined,
    notActiveCountryArray: undefined,

    /*
	 * Initialization for the game
	 *
	 * @param   none
	 */
    init: function () {
        console.log("game init called!");

        // load sound
        this.crunchSound0 = new Audio("sound/crunch0.wav");
        this.crunchSound1 = new Audio("sound/crunch1.wav");
        this.flybySound = new Audio("sound/flyby.wav");

        this.flybySound.volume = 1;

        //load images
        this.background = new Image();
        this.background.src = "images/Background.png";

		// load every country
        for (var i = 0; i < 5; i++) {
            for (var j = 1; j < 5; j++) {
                var image = new Image();
                if (i == 0) {
                    image.src = "images/FatGuys_America_" + j + ".png";
                    this.americaImages.push(image);
                }
                else if (i == 1) {
                    image.src = "images/FatGuys_France_" + j + ".png";
                    this.franceImages.push(image);
                }
                else if (i == 2) {
                    image.src = "images/FatGuys_Germany_" + j + ".png";
                    this.germanyImages.push(image);
                }
                else if (i == 3) {
                    image.src = "images/FatGuys_Italy_" + j + ".png";
                    this.italyImages.push(image);
                }
                else if (i == 4) {
                    image.src = "images/FatGuys_Mexico_" + j + ".png";
                    this.mexicoImages.push(image);
                }
            }
        }

        this.machineSprite = new Image();
        this.machineSprite.src = "images/machine-07.png";

        this.conveyorSprite = new Image();
        this.conveyorSprite.src = "images/convetorBelt-06.png";

        //load flaggs
        var americanImage = new Image();
        americanImage.src = "images/plane_america.png";

        var frenchImage = new Image();
        frenchImage.src = "images/plane_france.png";

        var germanImage = new Image();
        germanImage.src = "images/plane_german.png";

        var italyImage = new Image();
        italyImage.src = "images/plane_italy.png";

        var mexcioImage = new Image();
        mexcioImage.src = "images/plane_mexico.png";

        this.planeSprites = new Array(new SpriteKeyPair("Germany", new Array(germanImage)), new SpriteKeyPair("USA", new Array(americanImage)),
                                     new SpriteKeyPair("Italy", new Array(italyImage)), new SpriteKeyPair("France", new Array(frenchImage)),
                                     new SpriteKeyPair("Mexico", new Array(mexcioImage)));

        //Loading all the food graphics
        //USA
       // var peanutbutterImage = new Image();
       // peanutbutterImage.src = "images/hamburger.png";

        var pancakesImage = new Image();
        pancakesImage.src = "images/pancakes.png";

       // var friesImage = new Image();
       // friesImage.src = "images/fries.png";

        //Germany
		//var schnitzelImage = new Image();
        //schnitzelImage.src = "images/beer.png";
        //var brautwurstImage = new Image();
        //brautwurstImage.src = "images/sausage.png";

        //Italy
        //var pizzaImage = new Image();
       // pizzaImage.src = "images/pizza.png";
       // var spaghettiImage = new Image();
        //spaghettiImage.src = "images/spaghetti.png";

        //France
        //var baguetteImage = new Image();
       // baguetteImage.src = "images/baguette.png";
        //var snailImage = new Image();
        //snailImage.src = "images/snail.png";

        //Mexico
       // var burritoImage = new Image();
        //burritoImage.src = "images/burrito.png";
        //var guacImage = new Image();
       // guacImage.src = "images/guacamole.png";
        var picoDGImage = new Image();
        picoDGImage.src = "images/picoDeGallo.png";

        //Creating the dictionary of sprites
        this.foodSprites = new Array(new SpriteKeyPair("Germany", new Array(app.resources.getImage("schnitzel"), app.resources.getImage("brautwurst"))), 
			new SpriteKeyPair("USA", new Array(app.resources.getImage("hamburger"), pancakesImage)),
            new SpriteKeyPair("Italy", new Array(app.resources.getImage("pizza"), app.resources.getImage("spaghetti"))),
			new SpriteKeyPair("France", new Array(app.resources.getImage("baguette"), app.resources.getImage("snail"))),
            new SpriteKeyPair("Mexico", new Array(app.resources.getImage("burrito"), app.resources.getImage("guacamole"), picoDGImage)));

        // Initializes countries
		this.activeCountryArray = new Array(new Country(this.fatPoints, "USA", this.americaImages[0]), new Country(this.fatPoints, "Germany", this.germanyImages[0]), new Country(this.fatPoints, "France", this.franceImages[0]));
		this.notActiveCountryArray = new Array("Mexico", "Italy");

        this.countryChangeTimer = this.counrtyChangeTimerReset;

        //set Musik

        var backmusic = new Audio('sound/FeedMe!.mp3');
        backmusic.loop = true;
        backmusic.play();

        //Create our game countries, machines, etc

        //Scores
        for (var i = 0; i < this.numberScoresStored; i++) {
            if (localStorage[i] == undefined) {
                localStorage.setItem(i, "0");
            }

        }

        this.createGame();
    },

    checkMouse: function (mouseX, mouseY) {

       /* var collisionLeft = pointInRect({ x: mouseX, y: mouseY },
		{
		    x: this.swapLeftButton.center.x - this.swapLeftButton.size.width / 2,
		    y: this.swapLeftButton.center.y - this.swapLeftButton.size.height / 2,
		    width: this.swapLeftButton.size.width,
		    height: this.swapLeftButton.size.height
		});

        var collisionRight = pointInRect({ x: mouseX, y: mouseY },
		{
		    x: this.swapRightButton.center.x - this.swapRightButton.size.width / 2,
		    y: this.swapRightButton.center.y - this.swapRightButton.size.height / 2,
		    width: this.swapRightButton.size.width,
		    height: this.swapRightButton.size.height
		});

        if (collisionLeft)
            app.game.switchLane(1);
        else if (collisionRight)
            app.game.switchLane(2);*/
			
		if(mouseX >= app.main.DEFAULT_WIDTH/2)
		    app.game.switchLane(2);
		else
		    app.game.switchLane(1);
    },

    createGame: function () {
        this.lanePositions[0] = this.sideBufferX + (((app.main.DEFAULT_WIDTH - (this.sideBufferX * 2)) / 4) * 1);
        this.lanePositions[1] = this.sideBufferX + (((app.main.DEFAULT_WIDTH - (this.sideBufferX * 2)) / 4) * 2);
        this.lanePositions[2] = this.sideBufferX + (((app.main.DEFAULT_WIDTH - (this.sideBufferX * 2)) / 4) * 3);

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


        for (var i = 0; i < 3; i++) {
            this.machines[i] = new Machine(this.machineSprite, this.conveyorSprite, this.lanePositions[i], 10, 80, 64);
        }

        /*for (var i = 0; i < 3; i++) {
            this.foodFlags[i] = new FoodFlag(this.machines[i], undefined, 4, 4);
        }*/
		
		var buttonImg = new Image();
		buttonImg.src = "images/button_arrows.png"

        var gameButtonLeft_properties = {
            center: {
                x: 115,
                y: 425
            },

            size: {
                width: 40,
                height: 25
            },

            text: {
                string: ""
            },
			
			image : buttonImg,

            callbacks: {
                click: function () { app.main.changeState(app.GAME_STATE.GAME) }
            }
        };
        var gameButtonRight_properties = {
            center: {
                x: 207,
                y: 425
            },

            size: {
                width: 40,
                height: 25
            },
			
			image : buttonImg,

            text: {
                string: ""
            },

            callbacks: {
                click: function () { app.main.changeState(app.GAME_STATE.GAME) }
            }
        };

        this.swapLeftButton = new Core2D.Button(gameButtonLeft_properties);
        this.swapRightButton = new Core2D.Button(gameButtonRight_properties);

		this.lastUpdate = Date.now();
        this.ready = true;
    },

    /*
	 * Updates the objects in the game screen
	 *
	 * @return  none
	 */
    update: function () {
		console.log("game update");
	
        //WE'VE LOST
        //console.log(this.numberDeadPeople);
        if (this.numberDeadPeople >= 3) {

            //Add and sort the storage
            for (var i = 0; i < this.numberScoresStored; i++) {

                // check against other values
                if (app.player.getScore() > localStorage[i]) {
                    for (var q = this.numberScoresStored - 1; q > i; q--) {

                        if (localStorage[q - 1] != undefined) {

                            localStorage[q] = localStorage[q - 1];
                        }
                    }
                    localStorage.setItem(i, app.player.getScore());
                    console.log("We logged a score!");

                    break;

                }
            }

            // change state!
            app.main.changeState(app.GAME_STATE.HIGH_SCORE);
        }

        // check keyboard input
        if (app.keydown[app.keys.ENTER])
            app.main.changeState(app.GAME_STATE.HIGH_SCORE);

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
                var chosenCountry = Math.floor((Math.random() * 7));
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
                        //Its the country in the lane
                        chosenCountryString = this.activeCountryArray[t].countryName;
                        break;
                }
                var countryID = 0;
                for (var q = 0; q < this.foodSprites.length; q++) {
                    if (this.foodSprites[q].getCountry() == chosenCountryString) {
                        countryID = q;
                    }
                }

                var choosePlane = Math.floor((Math.random() * 5));
                if (choosePlane == 0) {
                	for(var i = 0; i< this.notActiveCountryArray.length; i++) {
						if (chosenCountryString == this.notActiveCountryArray[i]) {
							var plane = new Plane(chosenCountryString,
													t,
													this.lanePositions[t],
													10,
													this.planeSprites[countryID].getSprites()[0]);
							this.lanesOfFood[t].push(plane);
						}
                    }
                }

                else {
                    //Choosing food
                    var chosenFood = Math.floor((Math.random() * 2));
                    var chosenFoodImage = undefined;

                    chosenFoodImage = this.foodSprites[countryID].getSprites()[chosenFood];

                    //Create food
                    var food = new Food(chosenCountryString,
                                             t,
                                             this.lanePositions[t],
                                             20,
                                             chosenFoodImage);
                    this.lanesOfFood[t].push(food);
                }
            }
        }

        this.numberDeadPeople = 0;

        //Check collisions
        for (var c = 0; c < 3; c++) {

            if (this.activeCountryArray[c].getFatPoint() <= 0) {
                this.numberDeadPeople++;
            }

            //Every food in the lane
            for (var f = 0; f < this.lanesOfFood[c].length; f++) {

                //Move the food down
                var currentFoodSpeed = this.foodSpeed + (this.totalGameTime * 2);
                if (currentFoodSpeed > this.foodSpeedMax) {
                    currentFoodSpeed = this.foodSpeedMax;
                }
                this.lanesOfFood[c][f].y = this.lanesOfFood[c][f].y + (currentFoodSpeed * (dtSeconds));

                //If it goes off screen delete it
                if (this.lanesOfFood[c][f].y + (this.foodSize / 2) > app.main.DEFAULT_HEIGHT) {
                    this.lanesOfFood[c].splice(f, 1);
                }

                //If its across teh food eat line
                if (this.activeCountryArray[c].getFatPoint() > 0) {

                    //Cross the collisionline
                    if (this.lanesOfFood[c][f].y > this.collisionYCoordinate) {

                        //Colliding with planes
                        if (this.lanesOfFood[c][f] instanceof Plane) {
                        	var doChange = true;
							for(var i = 0; i < this.activeCountryArray.length; i++) {
								if(this.activeCountryArray[i].getFatPoint() <= 0) continue;
								if(this.activeCountryArray[i].countryName == this.lanesOfFood[c][f].country) {
									doChange = false;
									break;
								}
							}
							
							if(doChange) {
								this.flybySound.play();

								var positionInNotActive = undefined;
								for(var i = 0; i < this.notActiveCountryArray.length; i++) {
									if(this.notActiveCountryArray[i] == this.lanesOfFood[c][f].country) {
										this.changeCountry(c, i);
										break;
									}
								}
							}
                        }
                            //Spawn foods
                        else if (this.lanesOfFood[c][f].country == this.activeCountryArray[c].countryName) {

                            //Playing crunch sounds
                            var randomSound = Math.floor(Math.random() * 2);
                            if (randomSound == 0) {
                                this.crunchSound0.play();
                            }
                            else {
                                this.crunchSound1.play();
                            }

                            //You ate food from your country! ur getting fat!
                            this.activeCountryArray[c].DecFatPoint();
                            
                            var tempCountry = this.activeCountryArray[c].getCountryName();
                            var index = this.activeCountryArray[c].getImageIndex();
                            var nextIndex = index + 1;
                            this.activeCountryArray[c].setImageIndex(nextIndex);
                            if (tempCountry == "USA" && nextIndex < 4) {
                                    this.activeCountryArray[c].setImage(this.americaImages[nextIndex]);
                            }
                            if (tempCountry == "Germany" && nextIndex < 4) {
                                    this.activeCountryArray[c].setImage(this.germanyImages[nextIndex]);
                            }
                            if (tempCountry == "France" && nextIndex < 4) {
                                    this.activeCountryArray[c].setImage(this.franceImages[nextIndex]);
                            }
                            if (tempCountry == "Italy" && nextIndex < 4) {
                                    this.activeCountryArray[c].setImage(this.italyImages[nextIndex]);
                            }
                            if (tempCountry == "Mexico" && nextIndex < 4) {
                                    this.activeCountryArray[c].setImage(this.mexicoImages[nextIndex]);
                            }

                            if (this.activeCountryArray[c].getFatPoint() == 0) {
                                //YOU HAVE DIED! spawn emitter
                                this.emitters.push(new Emitter(new Vector(this.lanePositions[c], this.collisionYCoordinate + 15), .75, 1, 0, 0, 45, 60, 2, 5, "red", 32, false, 60));
                                this.emitters.push(new Emitter(new Vector(this.lanePositions[c], this.collisionYCoordinate + 15), .5, .75, 0, 0, 30, 60, 2, 5, "orange", 32, false, 60));
                                this.emitters.push(new Emitter(new Vector(this.lanePositions[c], this.collisionYCoordinate + 15), 0.25, .5, 0, 0, 15, 45, 2, 5, "yellow", 32, true, 60));
                                this.emitters.push(new Emitter(new Vector(this.lanePositions[c], this.collisionYCoordinate + 15), 0, 0.25, 0, 0, 0, 15, 2, 5, "white", 0, true, 60));
                            }

                        }
                        else {

                            //You ate food from another country, get points!
                            //Playing crunch sounds
                            var randomSound = Math.floor(Math.random() * 2);
                            if (randomSound == 0) {
                                this.crunchSound0.play();
                            }
                            else {
                                this.crunchSound1.play();
                            }
                            app.player.inkScore();

                        }
                        //We remove it once weve eaten it
                        this.lanesOfFood[c].splice(f, 1);
                    }
                }
            }
        }

        //Update emitters
        for (var i = 0; i < this.emitters.length; i++) {
            this.emitters[i].update();
        }

        //Remove inactive emitters
        this.emitters = this.emitters.filter(function (emitter) {
            return emitter.active;
        });

        this.lastUpdate = Date.now();
    },

    render: function () {

        app.ctx.clearRect(0, 0, app.main.DEFAULT_WIDTH, app.main.DEFAULT_HEIGHT);

        // background 


        app.ctx.fillStyle = "#FFC972";
        app.ctx.drawImage(this.background, 0, 0, 540, 480);

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
            if (this.activeCountryArray[c].getFatPoint() > 0) {
                app.ctx.drawImage(this.activeCountryArray[c].getImage(), this.lanePositions[c] - (50 / 2), this.collisionYCoordinate, 50, 80);

            }
        }

        //Draw machine bottoms
        for (var i = 0; i < this.machines.length; i++) {
            this.machines[i].drawBottom(app.ctx);
        }

        //Draw emitters
        for (var i = 0; i < this.emitters.length; i++) {
            this.emitters[i].draw(app.ctx);
        }


        //Draw all the food
        for (var c = 0; c < 3; c++) {

            //Every food in the lane
            for (var f = 0; f < this.lanesOfFood[c].length; f++) {
                app.ctx.drawImage(this.lanesOfFood[c][f].image, this.lanesOfFood[c][f].x - (this.foodSize / 2), this.lanesOfFood[c][f].y - (this.foodSize / 2), this.foodSize, this.foodSize);

            }
        }

        //Draw machines
        for (var i = 0; i < this.machines.length; i++) {
            this.machines[i].draw(app.ctx);
        }

        //Draw Buttons
        this.swapLeftButton.render(app.ctx);
        this.swapRightButton.render(app.ctx);

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

    showScore: function () {
        // calculate size of font based on screen dimension
        app.ctx.fillStyle = "#000000";
        app.ctx.font = "10px Helvetica";

        app.ctx.textAlign = "center";
        app.ctx.textBaseline = "top";

        //app.ctx.textBaseline = 'bottom';
        //app.ctx.lineWidth = 1;

        app.ctx.fillText("Score: " + app.player.getScore(), 160, 50);

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
        var tmpIndex = this.activeCountryArray[active].getImageIndex();
        var newCountryName = this.notActiveCountryArray[notActive];
        
        if(newCountryName === "USA") this.activeCountryArray[active].setImage(this.americaImages[tmpIndex]);
        else if(newCountryName === "Germany") this.activeCountryArray[active].setImage(this.germanyImages[tmpIndex]);
        else if(newCountryName === "France") this.activeCountryArray[active].setImage(this.franceImages[tmpIndex]);
        else if(newCountryName === "Italy") this.activeCountryArray[active].setImage(this.italyImages[tmpIndex]);
        else if(newCountryName === "Mexico") this.activeCountryArray[active].setImage(this.mexicoImages[tmpIndex]);
        
        this.notActiveCountryArray[notActive] = tmpCountry.countryName;
        this.activeCountryArray[active].setCountryName(newCountryName);
    },

};