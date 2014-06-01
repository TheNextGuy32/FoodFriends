"use strict";

var Country = function(fatPoint, countryName, image)
{
	// variables
	this.fatPoint = fatPoint;
	this.countryName = countryName;
	this.image = image;
	this.imageIndex = 0;
	this.isAlive = true;
};



Country.prototype.DecFatPoint = function()
{
	this.fatPoint--;
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

Country.prototype.setImageIndex = function (imageIndex) {
    this.imageIndex = imageIndex;
};

Country.prototype.getImageIndex = function () {
    return this.imageIndex;
};