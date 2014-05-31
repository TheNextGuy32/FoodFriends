/*
 * ResourceManager.js
 *
 * @author  Freddy Garcia
 *
 * @dependencies
 *		food.js
 *		country.js
 *
 * Stores all of the objects available in the application and provides access to them
 */

"use strict";

// namespace
var app = app || {};

app.ResourceManager = {
	foodImages        : new Array(),
	activeCountries   : new Array(),
	inactiveCountries : new Array(),
	
	/*
	 * Loads necessary images that will be used in the game
	 *
	 * @return  none
	 */
	loadAndCreateAssets : function()
	{
		// Countries -----------------------------------------------
		var image_country_USA     = new Image();
		var image_country_Germany = new Image();
		var image_country_France  = new Image();
		var image_country_Canada  = new Image();
		var image_country_Mexico  = new Image();
		var image_country_Italy   = new Image();
		
		image_country_USA.src     = "sprites/flag_usa.png";
		image_country_Germany.src = "sprites/flag_germany.png";
		image_country_France.src  = "sprites/flag_france.png";
		image_country_Canada.src  = "sprites/food_cheese.png";
		image_country_Mexico.src  = "sprites/flag_mexico.png";
		image_country_Italy.src   = "sprites/flag_italy.png";
		
		// Food -----------------------------------------------------
		// USA
		var image_food_fries     = new Image();
		var image_food_hamburger = new Image();
		var image_food_pancakes  = new Image();
		var image_food_applePie  = new Image();
		
		image_food_fries.src     = "sprites/food_fries.png";
		image_food_hamburger.src = "sprites/food_hamburger.png";
		image_food_pancakes.src  = "sprites/food_pancakes.png";
		image_food_applePie.src  = "sprites/food_pie.png";
		
		// Germany
		var image_food_beer      = new Image();
		var image_food_saurkraut = new Image();
		var image_food_sausage   = new Image();
		
		image_food_beer.src      = "sprites/food_beer.png";
		image_food_saurkraut.src = "sprites/food_saurkraut.png";
		image_food_sausage.src   = "sprites/food_sausage.png";
		
		// Italy
		var image_food_pizza     = new Image();
		var image_food_tiramisu  = new Image();
		var image_food_spaghetti = new Image();
		
		image_food_pizza.src     = "sprites/food_pizza.png";
		image_food_tiramisu.src  = "sprites/food_tiramisu.png";
		image_food_spaghetti.src = "sprites/food_spaghetti.png";
		
		// Mexico
		var image_food_burrito     = new Image();
		var image_food_guacamole   = new Image();
		var image_food_picoDeGallo = new Image();
		
		// Canada
		
		// France
		var image_food_baugette = new Image();
		var image_food_cheese   = new Image();
		var image_food_snail    = new Image();
		var image_food_wine     = new Image();
		
		image_food_baugette.src = "sprites/food_baugette.png";
		image_food_cheese.src   = "sprites/food_cheese.png";
		image_food_snail.src    = "sprites/food_snail.png";
		image_food_wine.src     = "sprites/food_wine.png";
		
		// Asset Creation -------------------------------------------
		// Countries
		/*this.activeCountries.push( {key: "USA", 
			value:
		this.activeCountries.push( {key: "Germany",
			value: [image_food_*/
	}
};