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
    collisionYCoordinate: 400,

    totalGameTime: 0,

    crunchSound0: undefined,
    crunchSound1: undefined,
    flybySound : undefined,

    numberScoresStored: 5,

    foodSpawnTimerMaximumSeconds: 7,
    foodSpawnTimerMinimumSeconds: 0.5,
    foodSpawnTimerStartingSeconds: 5,
    foodSpawnTimerMaxSeconds: new Array(),
    foodSpawnCurrentTimeSeconds: new Array(),

    foodSpeed: 100,//How fast food moves towards player
    foodSpeedMax: 500,

    countryFatPointsDeathValue: 10,

    foodSize: 50,
    fatPoints: 5,

    lanesOfFood: new Array,//The food on each lane, its an array of arrays

    foodSprites: new Array(),

    machines: [],
    machineSprite: undefined,
    conveyorSprite: undefined,

    planeSprites: new Array(),

    //foodFlags: [],
    emitters: [],

    background: undefined,
    image1: undefined, // images of 1st country
    image2: undefined, // images of 2nd country
    image3: undefined, // images of 3rd country
    image4: undefined, // images of 4th country
    image5: undefined, // images of 5th country
    image6: undefined, // images of 6th country
    /*
    americaImages: [],
    franceImages: [],
    germanyImages: [],
    italyImages: [],
    mexicoImages: [],
    */
    activeCountryArray: undefined,
    notActiveCountryArray: undefined,



    /*
	 * Creates everything that stays on the screen for the entire game
	 *
	 * @return  none
	 */
    createGame: function () {
        this.lanePositions[0] = this.sideBufferX + ((app.main.DEFAULT_WIDTH - (this.sideBufferX * 2)) / 4 * 1);
        this.lanePositions[1] = this.sideBufferX + ((app.main.DEFAULT_WIDTH - (this.sideBufferX * 2)) / 4 * 2);
        this.lanePositions[2] = this.sideBufferX + ((app.main.DEFAULT_WIDTH - (this.sideBufferX * 2)) / 4 * 3);

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

        this.crunchSound0 = new Audio("sound/crunch0.wav");
        this.crunchSound1 = new Audio("sound/crunch1.wav");
        this.flybySound = new Audio("sound/flyby.wav");

        //load images
        this.background = new Image();
        this.background.src = "images/Background.png";

        /*
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
        }*/

        this.image1 = new Image();
        this.image1.src = "images/FatGuys_America_1.png";

        this.image2 = new Image();
        this.image2.src = "images/FatGuys_France_1.png";

        this.image3 = new Image();
        this.image3.src = "images/FatGuys_Germany_1.png";

        this.image4 = new Image();
        this.image4.src = "images/FatGuys_Italy_1.png";

        this.image5 = new Image();

        this.image5.src = "images/FatGuys_Mexico_1.png";

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
        brautwurstImage.src = "images/sausage.png";

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
        var picoDGImage = new Image();
        picoDGImage.src = "images/picoDeGallo.png";

        //Creating the dictionary of sprites
        this.foodSprites = new Array(new SpriteKeyPair("Germany", new Array(schnitzelImage, brautwurstImage)), new SpriteKeyPair("USA", new Array(peanutbutterImage, pancakesImage)),
                                     new SpriteKeyPair("Italy", new Array(pizzaImage, spaghettiImage)), new SpriteKeyPair("France", new Array(baguetteImage, snailImage)),
                                     new SpriteKeyPair("Mexico", new Array(burritoImage, guacImage, picoDGImage)));

        // Initializes countries
        //this.activeCountryArray = new Array(new Country(1, "USA", this.image1), new Country(1, "Germany", this.image3), new Country(1, "France", this.image2));
        //this.notActiveCountryArray = new Array(new Array("Mexico", this.image5), new Array("Italy", this.image4));
        this.activeCountryArray = new Array(new Country(this.fatPoints, "USA", this.image1), new Country(this.fatPoints, "Germany", this.image2), new Country(this.fatPoints, "France", this.image3));
        this.notActiveCountryArray = new Array(new Array("Mexico", this.image4), new Array("Italy", this.image5));

        this.countryChangeTimer = this.counrtyChangeTimerReset;

        // resize screen
        this.resize();

        //set Musik

        var backmusic = new Audio('sound/BladeandValor.mp3');
        backmusic.loop = true;
        backmusic.play();

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
                for (var q = 0; q < this.foodSprites.length; q++) {
                    if (this.foodSprites[q].getCountry() == chosenCountryString) {
                        countryID = q;
                    }
                }

                var choosePlane = Math.floor((Math.random() * 2));
                if (choosePlane == 0) {
                    if (chosenCountryString == this.notActiveCountryArray[0][0] || chosenCountryString == this.notActiveCountryArray[1][0]) {
                        var plane = new Plane(chosenCountryString,
                                                t,
                                                this.lanePositions[t],
                                                10,
                                                this.planeSprites[countryID].getSprites()[0]);
                        this.lanesOfFood[t].push(plane);
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

        var numberDeadPeople = 0;

        //Check collisions
        for (var c = 0; c < 3; c++) {

            //Every food in the lane
            for (var f = 0; f < this.lanesOfFood[c].length; f++) {

                //Move the food down
                var currentFoodSpeed = this.foodSpeed + (this.totalGameTime*2);
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

                        //Spawning planes
                        if (this.lanesOfFood[c][f] instanceof Plane) {

                            this.flybySound.play();

                            var positionInNotActive = undefined;
                            if (this.notActiveCountryArray[0][0] == this.lanesOfFood[c][f].country) {
                                this.changeCountry(c, 0);
                            }
                            if (this.notActiveCountryArray[1][0] == this.lanesOfFood[c][f].country) {
                                this.changeCountry(c, 1);
                            }
                        }
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
                            /*
                            var tempCountry = this.activeCountryArray[c].getCountryName();
                            var index = this.activeCountryArray[c].getImageIndex();
                            var nextIndex = index + 1;
                            this.activeCountryArray[c].setImageIndex(nextIndex);
                            console.log(this.activeCountryArray[c]);
                            console.log(tempCountry);
                            if (tempCountry == "USA" && nextIndex < 4) {
                                    console.log("hello");
                                    this.activeCountryArray[c].setImage = this.americaImages[this.activeCountryArray[c].imageIndex];
                            }
                            if (tempCountry == "Germany" && nextIndex < 4) {
                                    console.log("hello");
                                    this.activeCountryArray[c].setImage = this.germanyImages[this.activeCountryArray[c].imageIndex];
                            }
                            if (tempCountry == "France" && nextIndex < 4) {
                                console.log("hello");
                                    this.activeCountryArray[c].setImage = this.franceImages[this.activeCountryArray[c].imageIndex];
                            }
                            if (tempCountry == "Italy" && nextIndex < 4) {
                                    this.activeCountryArray[c].setImage = this.italyImages[this.activeCountryArray[c].imageIndex];
                            }
                            if (tempCountry == "Mexico" && nextIndex < 4) {
                                    this.activeCountryArray[c].setImage = this.mexicoImages[this.activeCountryArray[c].imageIndex];
                            }*/

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
                else {
                    numberDeadPeople++;
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
        var tmpCountryName = this.activeCountryArray[active].getCountryName();
        var tmpCountryImg = this.activeCountryArray[active].getImage();
        this.activeCountryArray[active].setCountryName(this.notActiveCountryArray[notActive][0]);
        this.activeCountryArray[active].setImage(this.notActiveCountryArray[notActive][1]);
        this.notActiveCountryArray[notActive][0] = tmpCountryName;
        this.notActiveCountryArray[notActive][1] = tmpCountryImg;
    },

};
