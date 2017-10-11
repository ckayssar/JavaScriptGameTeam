// Setting background color
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "rgba(75, 0, 0, 1)";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Creating card containers
ctx.fillStyle = "Gold";
ctx.fillRect(24, 49, 952, 252);
ctx.fillRect(24, 599, 952, 252);
ctx.fillStyle = "rgba(0, 0, 0, 1)";
ctx.fillRect(25, 50, 950, 250);
ctx.fillRect(25, 600, 950, 250);

// Creating Health and Name indicators
ctx.font = "20px Helvetica";
ctx.fillStyle = "white";
ctx.fillText("Your HP:", 25, 880);
ctx.fillText("Their HP:", 25, 30);
ctx.fillText("Their Name:", 300, 30);
ctx.fillText("Your Name:", 300, 880);

ctx.font = "20px Courier";
ctx.textAlign = "center";
ctx.fillText("THEIR CARDS", canvas.width/2, 75);
ctx.fillText("YOUR CARDS", canvas.width/2, 625);