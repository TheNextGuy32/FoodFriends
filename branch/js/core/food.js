/*
 * food.js
 *
 * Represents a food item that will be falling down the screen
 */
"use strict";

// namespace
var app = app || {};

app.food = function(lane, x, y, image)
{
	this._lane  = lane;
	this._x     = x;
	this._y     = y;
	this._image = image;
};

app.food.prototype.Lane = function()
{ return this._lane };

app.food.prototype.X = function()
{ return this._x; };

app.food.prototype.Y = function()
{ return this._y; };

app.food.prototype.Image = function()
{ return this._image; };