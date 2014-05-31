"use strict";

var app = app || {};

app.resources = {
	foodSprites       : new Array(), // all the food images
	activeCountries   : new Array(), // all the countries currently on the screen
	inactiveCountries : new Array(), // all the countries not currently on the screen
	lanesOfFood       : new Array(), // 2D array of foods
	
	images            : new Array(),
	
	loadImages : function()
	{
		// countries
		var image1 = new Image();
        image1.src = "sprites/country1.png";

        var image2 = new Image();
        image2.src = "sprites/country2.png";

        var image3 = new Image();
        image3.src = "sprites/country3.png";

        var image4 = new Image();
        image4.src = "sprites/country4.png";

        var image5 = new Image();
        image5.src = "sprites/country5.png";

        var image6 = new Image();
        image6.src = "sprites/country6.png";
		
		var peanutbutterImage = new Image();
        peanutbutterImage.src = "sprites/peanutbutter.png";
		
        var pancakesImage = new Image();
        pancakesImage.src = "sprites/pancakes_final_00-04.png";

        //Germany
        var schnitzelImage = new Image();
        schnitzelImage.src = "sprites/schnitzel.png";
		
        var bratwurstImage = new Image();
        bratwurstImage.src = "sprites/brautwurst.png";

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
		
		this.images.push(image1);
		this.images.push(image2);
		this.images.push(image3);
		this.images.push(image4);
		this.images.push(image5);
		this.images.push(image6);
		
		// foods
		this.images.push(peanutbutterImage);
		this.images.push(pancakesImage);
		this.images.push(schnitzelImage);
		this.images.push(bratwurstImage);
		this.images.push(pizzaImage);
		this.images.push(spaghettiImage);
		this.images.push(baguetteImage);
		this.images.push(snailImage);
		this.images.push(burritoImage);
		this.images.push(guacImage);
	},
	
	/*
	 * populates resources 
	 *
	 *
	 */
	createResources : function()
	{
		// countries
		this.activeCountries.push( {key: "USA", value: new Country(this.images[0])} );
		this.activeCountries.push( {key: "Germany", value: new Country(this.images[1])} );
		this.activeCountries.push( {key: "France", value: new Country(this.images[2])} );
		
		this.inactiveCountries.push( {key: "Canada", value: new Country(this.images[3])} );
		this.inactiveCountries.push( {key: "Mexico", value: new Country(this.images[4])} );
		this.inactiveCountries.push( {key: "Italy", value: new Country(this.images[5])} );
		
		// food
		this.foodSprites.push( {key: "USA",     value: [this.images[6], this.images[7]]} );
		this.foodSprites.push( {key: "Germany", value: [this.images[8], this.images[9]]} );
		this.foodSprites.push( {key: "Italy",   value: [this.images[10], this.images[11]]} );
		this.foodSprites.push( {key: "France",  value: [this.images[12], this.images[13]]} );
		this.foodSprites.push( {key: "Mexico",  value: [this.images[14], this.images[15]]} );
	}
};