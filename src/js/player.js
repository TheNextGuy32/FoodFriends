"use strict";

var app = app || {};

app.player = {
    score : 0,
	timer : undefined,
	name : undefined,
	
	init : function(name, timer)
	{
		this.name = name;
		this.timer = timer;
	},
	
	//Setting Score during Game
	setScore : function(score)
	{
		this.score = score;
	},
	
	setName : function(name)
	{
	    this.name = name;
	},
	
	getName : function()
	{
	    return this.name;
	},
	//Returns Score
	getScore : function()
	{
        return this.score;
  	},
};