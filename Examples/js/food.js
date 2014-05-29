// "classes"
"use strict";

var Food = function(country, lane)
{
	// variables
	this.country = country;
	this.lane = lane;
};

Food.prototype.switchLane = function(newLane)
{
	this.lane = newLane;
};