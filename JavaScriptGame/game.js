// Variables to be used
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var toss = "";
var coin = 0;
var userBet = false;
var yourName = "Your Name: ";
var theirName = "Their Name: ";
var yourHP = 50;
var theirHP = 50;
var AICard;
var betAmount = 0;

// Images and cards
var cardBack = new Image();
var exam = new Image();
var freshman = new Image();
var senior = new Image();
var debt = new Image();
var dog = new Image();
var market = new Image();
var office = new Image();
var snow = new Image();
var scholarship = new Image();
var parking = new Image();
var GPA = new Image();
var domino = new Image();
var prof = new Image();
cardBack.src = "../images/cardBack.jpg";
exam.src = "../images/cardExam.jpg";
freshman.src = "../images/cardFreshman.jpg";
senior.src = "../images/cardSenior.jpg";
debt.src = "../images/cardDebt.jpg";
dog.src = "../images/cardDog.jpg";
market.src = "../images/cardMarket.jpg";
office.src = "../images/cardOffice.jpg";
snow.src = "../images/cardSnow.jpg";
scholarship.src = "../images/cardScholar.jpg";
parking.src = "../images/cardParking.jpg";
GPA.src = "../images/cardGPA.jpg";
domino.src = "../images/cardDomino.jpg";
prof.src = "../images/cardProf.jpg";

// The deck
var deck = [exam, freshman, senior, debt, dog, market, office, snow, scholarship, parking, GPA, domino, prof];
var userHand = new Array(6);
var AIHand = new Array(6);

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
	ctx.fillText("No longer than 60 characters please", canvas.width/2, (canvas.height/2)+35);
	
	// To signify you have entered the submit button
	$("#nameSubmit").mouseenter(function(){
		$("#nameSubmit").css("background-color", "White");
		$("#nameSubmit").css("color", "Black");
	});
	
	// To return Submit button to normal
	$("#nameSubmit").mouseleave(function(){
		$("#nameSubmit").css("background-color", "Gold");
		$("#nameSubmit").css("color", "rgb(75, 0, 0)");
	});
	
	// When submit is clicked
	$("#nameSubmit").click(function(){
		// Checks for valid name
		if ($("#nameInput").val().length === 0) {
			alert("Please input some sort of name");
		}
		else if ($("#nameInput").val().length > 60) {
			alert("That's longer than 60 characters buster!");
		}
		else {
			// If name is valid, store it and move on
			yourName += $("#nameInput").val();
			$("#nameSubmit").css("visibility", "hidden");
			$("#nameInput").css("visibility", "hidden");
			ctx.fillStyle = "rgba(75, 0, 0, 1)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			coinChoose();
		}
	});
});

// Player chooses heads or tails
function coinChoose() {
	// Text for UI
	ctx.fillStyle = "Gold";
	ctx.font = "40px Helvetica";
	ctx.textAlign = "center";
	ctx.fillText("So, heads or tails?", canvas.width/2, canvas.height/2);
	$("#heads").css("visibility", "visible");
	$("#tails").css("visibility", "visible");
	
	// To signify entry for heads and tails button
	$("#heads").mouseenter(function(){
		$("#heads").css("background-color", "White");
		$("#heads").css("color", "Black");
	});
	$("#tails").mouseenter(function(){
		$("#tails").css("background-color", "White");
		$("#tails").css("color", "Black");
	});
	
	// To return heads and tails button to normal
	$("#heads").mouseleave(function(){
		$("#heads").css("background-color", "Gold");
		$("#heads").css("color", "rgb(75, 0, 0)");
	});
	$("#tails").mouseleave(function(){
		$("#tails").css("background-color", "Gold");
		$("#tails").css("color", "rgb(75, 0, 0)");
	});
	
	// If heads is chosen
	$("#heads").click(function(){
		toss = "heads";
		$("#heads").css("visibility", "hidden");
		$("#tails").css("visibility", "hidden");
		coinToss();
	});
	
	// If tails is chosen
	$("#tails").click(function(){
		toss = "tails";
		$("#heads").css("visibility", "hidden");
		$("#tails").css("visibility", "hidden");
		coinToss();
	});
}

// The coin toss itself
function coinToss() {
	coin = Math.floor(Math.random() * 2);
	
	// Heads
	if (coin === 0) {
		if (toss === "heads") {
			userBet = true;
			$("#tossResult p").html("The coin is heads. You bet first.");
		}
		else {
			$("#tossResult p").html("The coin is heads. The AI bets first.");
		}
	}
	
	// Tails
	else {
		$("#tossResult").css("background-image", "url('../images/coinTail.png')");
		if (toss === "tails") {
			userBet = true;
			$("#tossResult p").html("The coin is tails. You bet first.");
		}
		else {
			$("#tossResult p").html("The coin is tails. The AI bets first.");
		}
	}
	
	// We can see the result
	$("#tossResult").css("visibility", "visible");
	$("#tossResult").fadeOut(3000);
	
	// Begin game
	nameAI();
	startGame();
}

// This selects the AI's name
function nameAI() {
	rand = Math.floor(Math.random() * 10);
	switch (rand) {
		case 0:
			theirName += "Gilgamesh the Destroyer";
			break;
		case 1:
			theirName += "C74F the Crusher";
			break;
		case 2:
			theirName += "Cassius the Saboteur";
			break;
		case 3:
			theirName += "Arnold the Terminator";
			break;
		case 4:
			theirName += "Hezekiah the Invader";
			break;
		case 5:
			theirName += "Ezekiel the Incinerator";
			break;
		case 6:
			theirName += "Eleazar the Golem";
			break;
		case 7:
			theirName += "Mordecai the Pillager";
			break;
		case 8:
			theirName += "Nebuchadnezzar the Raider";
			break;
		case 9:
			theirName += "Sal";
	}
}

// Loads game screen
function startGame() {
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
	ctx.textAlign = "left";
	ctx.fillStyle = "Gold";
	ctx.fillText("Your HP: " + yourHP, 25, 880);
	ctx.fillText("Their HP: " + theirHP, 25, 30);
	ctx.fillText(theirName, 300, 30);
	ctx.fillText(yourName, 300, 880);

	// Creating card text
	ctx.font = "20px Courier";
	ctx.textAlign = "center";
	ctx.fillText("THEIR HAND", canvas.width/2, 75);
	ctx.fillText("YOUR HAND", canvas.width/2, 625);

	// Versus logo
	ctx.font = "40px Impact";
	ctx.fillStyle = "#FF8C00";
	ctx.fillText("VS.", canvas.width/2, canvas.height/2);
	
	// Bet area
	ctx.font = "20px Helvetica";
	ctx.fillText("Bet Amount", 850, 350);
	ctx.fillRect(819, 359, 62, 42);
	ctx.fillStyle = "rgba(0, 0, 0, 1)";
	ctx.fillRect(820, 360, 60, 40);
	
	// Deal cards
	ctx.drawImage(cardBack, 40, 90, 140, 200);
	ctx.drawImage(cardBack, 195, 90, 140, 200);
	ctx.drawImage(cardBack, 350, 90, 140, 200);
	ctx.drawImage(cardBack, 507, 90, 140, 200);
	ctx.drawImage(cardBack, 662, 90, 140, 200);
	ctx.drawImage(cardBack, 817, 90, 140, 200);
	firstDeal();
	ctx.drawImage(userHand[0], 40, 640, 140, 200);
	ctx.drawImage(userHand[1], 195, 640, 140, 200);
	ctx.drawImage(userHand[2], 350, 640, 140, 200);
	ctx.drawImage(userHand[3], 507, 640, 140, 200);
	ctx.drawImage(userHand[4], 662, 640, 140, 200);
	ctx.drawImage(userHand[5], 817, 640, 140, 200);
}

// This makes the initial deal and then moves on
function firstDeal() {
	for (i = 0; i < userHand.length; ++i) {
		rand = Math.floor(Math.random() * 13);
		userHand[i] = deck[rand];
	}
	for (i = 0; i < AIHand.length; ++i) {
		rand = Math.floor(Math.random() * 13);
		AIHand[i] = deck[rand];
	}
	
	bet();
}

function bet() {
	// AI bet
	if (userBet === false) {
		betAmount = Math.floor(Math.random() * 10) + 1;
		userBet = true;
		takeTurn();
	}
	// User bet
	else {
		$("#betWindow").css("visibility", "visible");
		
		$("#betOne").click(function(){
			betAmount = 1;		
			$("#betWindow").css("visibility", "hidden");
			userBet = false;
			takeTurn();
		});
		$("#betTwo").click(function(){
			betAmount = 2;		
			$("#betWindow").css("visibility", "hidden");
			userBet = false;
			takeTurn();
		});
		$("#betThree").click(function(){
			betAmount = 3;		
			$("#betWindow").css("visibility", "hidden");
			userBet = false;
			takeTurn();
		});
		$("#betFour").click(function(){
			betAmount = 4;		
			$("#betWindow").css("visibility", "hidden");
			userBet = false;
			takeTurn();
		});
		$("#betFive").click(function(){
			betAmount = 5;		
			$("#betWindow").css("visibility", "hidden");
			userBet = false;
			takeTurn();
		});
		$("#betSix").click(function(){
			betAmount = 6;		
			$("#betWindow").css("visibility", "hidden");
			userBet = false;
			takeTurn();
		});
		$("#betSeven").click(function(){
			betAmount = 7;		
			$("#betWindow").css("visibility", "hidden");
			userBet = false;
			takeTurn();
		});
		$("#betEight").click(function(){
			betAmount = 8;		
			$("#betWindow").css("visibility", "hidden");
			userBet = false;
			takeTurn();
		});
		$("#betNine").click(function(){
			betAmount = 9;		
			$("#betWindow").css("visibility", "hidden");
			userBet = false;
			takeTurn();
		});
		$("#betTen").click(function(){
			betAmount = 10;	
			$("#betWindow").css("visibility", "hidden");
			userBet = false;
			takeTurn();			
		});
	}
}

function takeTurn() {
	// Fill out bet amount
	ctx.fillStyle = "Gold"
	ctx.font = "25px Impact";
	ctx.fillText(betAmount, 850, 390);
	ctx.fillStyle = "rgba(0, 0, 0, 1)";
	
	canvas.addEventListener("mousedown", getPosition, false);
	
	function getPosition(e) {
		var fr = canvas.getBoundingClientRect();
		var x = e.x - fr.left - 0.5;
		var y = e.y - fr.top - 0.203125;
		
		if (y <= 801 && y >= 639) {
			if (x <= 181 && x >= 39) {
				ctx.drawImage(userHand[0], 285, 325, 175, 250);
				ctx.fillRect(40, 640, 140, 200);
				AIChooseCard();
			}
			else if (x <= 336 && x >= 194) {
				ctx.drawImage(userHand[1], 285, 325, 175, 250);
				ctx.fillRect(195, 640, 140, 200);
				AIChooseCard();
			}
			else if (x <= 491 && x >= 349) {
				ctx.drawImage(userHand[2], 285, 325, 175, 250);
				ctx.fillRect(350, 640, 140, 200);
				AIChooseCard();
			}
			else if (x <= 648 && x >= 506) {
				ctx.drawImage(userHand[3], 285, 325, 175, 250);
				ctx.fillRect(507, 640, 140, 200);
				AIChooseCard();
			}
			else if (x <= 803 && x >= 661) {
				ctx.drawImage(userHand[4], 285, 325, 175, 250);
				ctx.fillRect(662, 640, 140, 200);
				AIChooseCard();
			}
			else if (x <= 958 && x >= 816) {
				ctx.drawImage(userHand[5], 285, 325, 175, 250);
				ctx.fillRect(817, 640, 140, 200);
				AIChooseCard();
			}
		}
	}
}

// AI chooses card after user does
function AIChooseCard() {
	rand = Math.floor(Math.random() * 6);
	AICard = AIHand[rand];
	ctx.drawImage(AICard, 540, 325, 175, 250);
	switch (rand) {
		case 0:
			ctx.fillRect(40, 90, 140, 200);
			break;
		case 1:
			ctx.fillRect(195, 90, 140, 200);
			break;
		case 2:
			ctx.fillRect(350, 90, 140, 200);
			break;
		case 3:
			ctx.fillRect(507, 90, 140, 200);
			break;
		case 4:
			ctx.fillRect(662, 90, 140, 200);
			break;
		case 5:
			ctx.fillRect(817, 90, 140, 200);
	}
}