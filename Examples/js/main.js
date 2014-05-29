"use strict";

var x = 10;
var y = 20;
var ctx;
var image;

function init()
{
	console.log("hello world");
	
	// canvas!
	var canvas = document.querySelector("#canvas");
	
	ctx = canvas.getContext("2d");
	
	// player stuff!
	player.init(10, "hello!");
	
	// food stuff!
	//Food.hp = 10;
	//Food.name = "banana";

	//console.log("hp: " + Food.hp);
	//console.log("name: " + Food.name);

	/*var myTest = new Food();
	myTest.hp = 300;
	myTest.name = "ice cream";

	console.log("hp: " + myTest.hp);
	console.log("name: " + myTest.name);
	
	var secondTest = new Food();
	console.log("hp 2: " + secondTest.hp);
	console.log("name 2:" + secondTest.name);*/
	
	var first = new Food();
	
	//first.test("testing"); // will break
	// country
	// lane
	// switchLane()

	Food.prototype.test = function(bla)
	{
		console.log(bla);
	};

	first.test("not offensive");
	
	loop();
	
	for(var i=0; i < 10; i++)
	{
		console.log(i);
	}
};

function loadImage()
{
	image = new Image();
	image.src = "textures/test.jpg";
	
	// wait for images to load to start game!
	image.onload = init;
};

var loop = function()
{
	update();
	draw();
	
	requestAnimationFrame(loop);
};

var update = function(dt, myOtherVar, vars)
{
	var dt = dt || 1/60;

	x += 1*dt;
	y += 1/10;
	
	//console.log(x);
	//console.log(y);
};

var draw = function()
{
	// clear screen
	ctx.fillStyle = "#34DDDD";
	ctx.strokeStye = "#395813";
	// wow
	
	// first rectangle
	ctx.clearRect(0, 0, 500, 500);
	
	//ctx.fillRect(x, y, 100, 200);
	//ctx.strokeRect(x, y, 100, 200);
	
	// circle
	ctx.beginPath();
		ctx.arc(100, 75, 50, 0, 2*Math.PI);

	ctx.closePath();
	
	ctx.stroke();
	
	ctx.save();
	
	// text!
	ctx.fillText("NOT AN OFFENSIVE WORD :)", 10, 10);
	
	// second rectangle - red
	ctx.fillStyle = "red";
	ctx.fillRect(100, 100, 30, 30);
	
	ctx.save();
	
	// image, x, y, width, height
	ctx.drawImage(image, x, y, 300, 300);

	// third rectangle - torquis
	ctx.fillRect(200, 300, 20, 20);
};

function onClick(event)
{
	x = event.clientX - 5;
	y = event.clientY - 5;
};

window.addEventListener('load', loadImage);
window.addEventListener('click', onClick);