"use strict";

// namespace
var app = app || {};

var SpriteKeyPair = function (country, images)
{
    this.country = country;
    this.sprites = images;
}


SpriteKeyPair.prototype.getCountry = function () {
    return this.country;
};

SpriteKeyPair.prototype.getSprites = function () {
    return this.sprites;
};
