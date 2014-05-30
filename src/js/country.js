"use strict";

var Country = function(fatPoint, lane, countryName, image)
{
	// variables
	this.fatPoint = fatPoint;
	this.lane = lane;
	this.countryName = countryName;
	this.image = image;
};

Country.prototype.setFatPoint = function(fatPoint)
{
	this.fatPoint = fatPoint;
};
	
Country.prototype.getFatPoint = function()
{
	return this.fatPoint;
};


Country.prototype.setLane = function(lane)
{
	this.lane = lane;
};
	
Country.prototype.getLane = function()
{
	return this.lane;
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