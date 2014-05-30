"use strict";

// namespace
var app = app || {};

var SpriteKeyPair = function (country, images)
{
    this.country = country;
    this.sprites = images;
}


SpriteKeyPair.prototype.getCountry = function () {
    this.country = country;
};

SpriteKeyPair.prototype.getSprites = function () {
    this.sprites = sprites;
};
