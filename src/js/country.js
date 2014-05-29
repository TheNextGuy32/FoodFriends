"use strict";

var Country = function(fatPoint, lane, countryName)
{
	// variables
	this.fatPoint = fatPoint;
	this.lane = lane;
	this.countryName = countryName;
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