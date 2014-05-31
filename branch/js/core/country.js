/*
 * country.js
 * 
 *
 * Represents one of the countries that will be on the playing field
 */
"use strict";

// namespace
var app = app || {};

app.country = function(image)
{
	this._fatPoint  = 0;
	this._image     = image;
	this._isAlive   = true;
};

/*
 * Adds fat to the country when it consumes food from its own country
 *
 * @return  none
 */
app.country.prototype.addFat = function()
{
	this._fatPoint += 1;
	
	// check if country still alive
	if(this.fatPoint >= 10)
		this._isAlive = false;
	
	// TODO: Decrease score of player
};

/*
 * Returns whether or not the country is still alive
 *
 * @return  none
 */
app.country.prototype.IsAlive = function()
{ return this._isAlive; };