"use strict";

var player = function(name) {
    this.score = 0;
	//timer : undefined,
	this.name = name;
};
	
	//Setting Score during Game
	player.prototype.setScore = function(score)
	{
		this.score = score;
	};
	
	player.prototype.setName = function(name)
	{
	    this.name = name;
	};
	
	player.prototype.getName = function()
	{
	    return this.name;
	};
	
	
	//Returns Score
	player.prototype.getScore = function()
	{
        return this.score;
  	};
