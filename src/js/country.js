"use strict";

var Country = function(fatPoint, countryName, image)
{
	// variables
	this.fatPoint = fatPoint;
	this.countryName = countryName;
	this.image = image;
	this.isAlive = true;
};



Country.prototype.setFatPoint = function()
{
	this.fatPoint +=1;
	app.player.decScore();
};
	
Country.prototype.getFatPoint = function()
{
	return this.fatPoint;
};

Country.prototype.checkifalive = function()
{
	if(this.fatPoint>4)isAlive=false;
};	
	
Country.prototype.setCountryName = function(countryName)
{
	this.countryName = countryName;
};
	
Country.prototype.getCountryName = function()
{
	return this.countryName;
};


Country.prototype.setImage = function(image)
{
	this.image = image;
};
	
Country.prototype.getImage = function()
{
	return this.image;
};