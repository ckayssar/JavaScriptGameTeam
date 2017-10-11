// Variables to be used
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// This is the initial function when the game begins
$(document).ready(function() {
	ctx.fillStyle = "rgba(75, 0, 0, 1)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	// Name entry screen
	ctx.fillStyle = "Gold";
	ctx.font = "40px Helvetica";
	ctx.textAlign = "center";
	ctx.fillText("Please enter your name", canvas.width/2, canvas.height/2);
	ctx.font = "20px Helvetica";
	ctx.fillText("No longer than 30 characters please", canvas.width/2, (canvas.height/2)+35);
	ctx.fillRect(425, 600, 150, 50);
	ctx.fillStyle = "White";
	ctx.fillText("Submit", canvas.width/2, 625);
});

/*
// Setting background color
ctx.fillStyle = "rgba(75, 0, 0, 1)";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Creating card containers
ctx.fillStyle = "Gold";
ctx.fillRect(24, 49, 952, 252);
ctx.fillRect(24, 599, 952, 252);
ctx.fillRect(284, 324, 177, 252);
ctx.fillRect(539, 324, 177, 252);
ctx.fillStyle = "rgba(0, 0, 0, 1)";
ctx.fillRect(25, 50, 950, 250);
ctx.fillRect(25, 600, 950, 250);
ctx.fillRect(285, 325, 175, 250);
ctx.fillRect(540, 325, 175, 250);
ctx.fillStyle = "Gold";
ctx.fillRect(39, 89, 142, 202);
ctx.fillRect(194, 89, 142, 202);
ctx.fillRect(349, 89, 142, 202);
ctx.fillRect(506, 89, 142, 202);
ctx.fillRect(661, 89, 142, 202);
ctx.fillRect(816, 89, 142, 202);
ctx.fillRect(39, 639, 142, 202);
ctx.fillRect(194, 639, 142, 202);
ctx.fillRect(349, 639, 142, 202);
ctx.fillRect(506, 639, 142, 202);
ctx.fillRect(661, 639, 142, 202);
ctx.fillRect(816, 639, 142, 202);
ctx.fillStyle = "rgba(0, 0, 0, 1)";
ctx.fillRect(40, 90, 140, 200);
ctx.fillRect(195, 90, 140, 200);
ctx.fillRect(350, 90, 140, 200);
ctx.fillRect(507, 90, 140, 200);
ctx.fillRect(662, 90, 140, 200);
ctx.fillRect(817, 90, 140, 200);
ctx.fillRect(40, 640, 140, 200);
ctx.fillRect(195, 640, 140, 200);
ctx.fillRect(350, 640, 140, 200);
ctx.fillRect(507, 640, 140, 200);
ctx.fillRect(662, 640, 140, 200);
ctx.fillRect(817, 640, 140, 200);

// Creating Health and Name indicators
ctx.font = "20px Helvetica";
ctx.fillStyle = "white";
ctx.fillText("Your HP:", 25, 880);
ctx.fillText("Their HP:", 25, 30);
ctx.fillText("Their Name:", 300, 30);
ctx.fillText("Your Name:", 300, 880);

// Creating card text
ctx.font = "20px Courier";
ctx.textAlign = "center";
ctx.fillText("THEIR HAND", canvas.width/2, 75);
ctx.fillText("YOUR HAND", canvas.width/2, 625);

// Versus logo
ctx.font = "40px Impact";
ctx.fillStyle = "#FF8C00";
ctx.fillText("VS.", canvas.width/2, canvas.height/2);
*/