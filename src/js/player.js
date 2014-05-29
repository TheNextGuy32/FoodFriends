"use strict";

var player = {
    score : undefined,
	timer : undefined,
	name : undefined,
	
	init : function(name, timer)
	{
		this.name = name;
		this.timer = timer;
	},
	
	setScore : function(score)
	{
		this.score = score;
	},
	
	setName : function(name)
	{
	    this.name = name;
	}
	
	getName : function()
	{
	    return this.name;
	}
	
	getScore : function()
	{
        return this.score;
  	}
};