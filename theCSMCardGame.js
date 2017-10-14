// Variables to be used
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var toss = "";
var coin = 0;
var userBet = false;
var yourName = "Your Name: ";
var theirName = "Their Name: ";
var yourHP = 100;
var theirHP = 100;
var userCard;
var AICard;
var betAmount = 0;
var turnResult = "";
var gameResult = "";
var round = 0;
var canClick = false;
var resultText = "";
var resultTextLine2 = "";
var yourCardText = "";
var AICardText = "";
var multiply = 0;
var score = 0;

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
cardBack.src = "images/cardBack.jpg";
exam.src = "images/cardExam.jpg";
freshman.src = "images/cardFreshman.jpg";
senior.src = "images/cardSenior.jpg";
debt.src = "images/cardDebt.jpg";
dog.src = "images/cardDog.jpg";
market.src = "images/cardMarket.jpg";
office.src = "images/cardOffice.jpg";
snow.src = "images/cardSnow.jpg";
scholarship.src = "images/cardScholar.jpg";
parking.src = "images/cardParking.jpg";
GPA.src = "images/cardGPA.jpg";
domino.src = "images/cardDomino.jpg";
prof.src = "images/cardProf.jpg";

// The deck
var deck = [exam, freshman, senior, debt, dog, market, office, snow, scholarship, parking, GPA, domino, prof];
var userHand = [-1, -1, -1, -1, -1, -1];
var AIHand = [-1, -1, -1, -1, -1, -1];

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
		else if ($("#nameInput").val().length > 30) {
			alert("That's longer than 30 characters buster!");
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

canvas.addEventListener("mousedown", getPosition);
	
function getPosition(e) {
	if (canClick == false) {
		return;
	}
	var fr = canvas.getBoundingClientRect();
	var x = e.x - fr.left - 0.5;
	var y = e.y - fr.top - 0.203125;
	
	if (y <= 801 && y >= 639) {
		if (x <= 181 && x >= 39) {
			if (userHand[0] == -1) {
				alert("Please choose another card");
				takeTurn();
			}
			else {
				userCard = userHand[0];
				userHand[0] = -1;
				ctx.drawImage(deck[userCard], 315, 325, 175, 250);
				ctx.fillRect(40, 640, 140, 200);
				canClick = false;
				AIChooseCard();
			}
		}
		else if (x <= 336 && x >= 194) {
			if (userHand[1] == -1) {
				alert("Please choose another card");
				takeTurn();
			}
			else {
				userCard = userHand[1];
				userHand[1] = -1;
				ctx.drawImage(deck[userCard], 315, 325, 175, 250);
				ctx.fillRect(195, 640, 140, 200);
				canClick = false;
				AIChooseCard();
			}
		}
		else if (x <= 491 && x >= 349) {
			if (userHand[2] == -1) {
				alert("Please choose another card");
				takeTurn();
			}
			else {
				userCard = userHand[2];
				userHand[2] = -1;
				ctx.drawImage(deck[userCard], 315, 325, 175, 250);
				ctx.fillRect(350, 640, 140, 200);
				canClick = false;
				AIChooseCard();
			}	
		}
		else if (x <= 648 && x >= 506) {
			if (userHand[3] == -1) {
				alert("Please choose another card");
				takeTurn();
			}
			else {
				userCard = userHand[3];
				userHand[3] = -1;
				ctx.drawImage(deck[userCard], 315, 325, 175, 250);
				ctx.fillRect(507, 640, 140, 200);
				canClick = false;
				AIChooseCard();
			}
		}
		else if (x <= 803 && x >= 661) {
			if (userHand[4] == -1) {
				alert("Please choose another card");
				takeTurn();
			}
			else {
				userCard = userHand[4];
				userHand[4] = -1;
				ctx.drawImage(deck[userCard], 315, 325, 175, 250);
				ctx.fillRect(662, 640, 140, 200);
				canClick = false;
				AIChooseCard();
			}
		}
		else if (x <= 958 && x >= 816) {
			if (userHand[5] == -1) {
				alert("Please choose another card");
				takeTurn();
			}
			else {
				userCard = userHand[5];
				userHand[5] = -1;
				ctx.drawImage(deck[userCard], 315, 325, 175, 250);
				ctx.fillRect(817, 640, 140, 200);
				canClick = false;
				AIChooseCard();
			}
		}
	}
}
	
// Player chooses heads or tails
function coinChoose() {
	update_scores();
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
		$("#tossResult").css("background-image", "url('images/coinTail.png')");
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
}

// This selects the AI's name
function nameAI() {
	rand = Math.floor(Math.random() * 10);
	theirName = "Their Name: ";
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
			theirName += "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.";
			break;
		case 9:
			theirName += "Your Mom";
	}
	startGame();
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
	ctx.fillRect(314, 324, 177, 252);
	ctx.fillRect(569, 324, 177, 252);
	ctx.fillStyle = "rgba(0, 0, 0, 1)";
	ctx.fillRect(25, 50, 950, 250);
	ctx.fillRect(25, 600, 950, 250);
	ctx.fillRect(315, 325, 175, 250);
	ctx.fillRect(570, 325, 175, 250);
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
	ctx.fillText("YOUR", 400, 400);
	ctx.fillText("CARD", 400, 420);
	ctx.fillText("SPACE", 400, 440);
	ctx.fillText("THEIR", 657, 400);
	ctx.fillText("CARD", 657, 420);
	ctx.fillText("SPACE", 657, 440);
	
	// Versus logo
	ctx.font = "40px Impact";
	ctx.fillStyle = "#FF8C00";
	ctx.fillText("VS.", canvas.width/2 + 30, canvas.height/2);
	
	// Bet area
	ctx.fillStyle = "Gold";
	ctx.font = "20px Helvetica";
	ctx.fillText("Bet Amount", 850, 350);
	ctx.fillRect(819, 359, 62, 42);
	ctx.fillStyle = "rgba(0, 0, 0, 1)";
	ctx.fillRect(820, 360, 60, 40);
	
	// Round number
	ctx.fillStyle = "Gold";
	ctx.fillText("Round Number", 850, 450);
	ctx.fillRect(819, 459, 62, 42);
	ctx.fillStyle = "rgba(0, 0, 0, 1)";
	ctx.fillRect(820, 460, 60, 40);
	ctx.fillStyle = "Gold"
	ctx.font = "25px Impact";
	ctx.fillText(round, 850, 490);
	
	// Result section
	ctx.font = "20px Helvetica";
	ctx.fillText("Result", 137, 325);
	ctx.fillRect(14, 334, 252, 252);
	ctx.fillStyle = "rgba(0, 0, 0, 1)";
	ctx.fillRect(15, 335, 250, 250);
	
	// Deal cards
	fillHands();
	ctx.drawImage(cardBack, 40, 90, 140, 200);
	ctx.drawImage(cardBack, 195, 90, 140, 200);
	ctx.drawImage(cardBack, 350, 90, 140, 200);
	ctx.drawImage(cardBack, 507, 90, 140, 200);
	ctx.drawImage(cardBack, 662, 90, 140, 200);
	ctx.drawImage(cardBack, 817, 90, 140, 200);
	ctx.drawImage(deck[userHand[0]], 40, 640, 140, 200);
	ctx.drawImage(deck[userHand[1]], 195, 640, 140, 200);
	ctx.drawImage(deck[userHand[2]], 350, 640, 140, 200);
	ctx.drawImage(deck[userHand[3]], 507, 640, 140, 200);
	ctx.drawImage(deck[userHand[4]], 662, 640, 140, 200);
	ctx.drawImage(deck[userHand[5]], 817, 640, 140, 200);
}

// This makes the initial deal and then moves on
function fillHands() {
	// This for loops repopulate the hands
	for (i = 0; i < userHand.length; ++i) {
		if (userHand[i] < 0) {
			rand = Math.floor(Math.random() * 13);
			userHand[i] = rand;
		}
	}
	for (i = 0; i < AIHand.length; ++i) {
		if (AIHand[i] < 0) {
			rand = Math.floor(Math.random() * 13);
			AIHand[i] = rand;
		}
	}
	
	if (round > 0) {
		redrawCards();
	}
	else {
		bet();
	}
}

// This handles AI and User betting
function bet() {
	// Resets central card area and round number
	ctx.fillStyle = "rgba(0, 0, 0, 1)";
	ctx.fillRect(820, 460, 60, 40);
	ctx.fillStyle = "Gold"
	ctx.textAlign = "center";
	ctx.font = "25px Impact";
	ctx.fillText(round, 850, 490);
	
	// AI bet
	if (userBet == false) {
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

// This handles filling out bet data
function takeTurn() {
	// Fill out bet amount
	ctx.fillStyle = "rgba(0, 0, 0, 1)";
	ctx.fillRect(820, 360, 60, 40);
	ctx.textAlign = "center";
	ctx.fillStyle = "Gold"
	ctx.font = "25px Impact";
	ctx.fillText(betAmount, 850, 390);
	ctx.fillStyle = "rgba(0, 0, 0, 1)";
	canClick = true;
}

// AI chooses card after user does
function AIChooseCard() {
	ctx.fillStyle = "rgba(0, 0, 0, 1)";
	rand = Math.floor(Math.random() * 6);
	
	// Prevents picking already used cards
	while (AIHand[rand] == -1) {
		rand = Math.floor(Math.random() * 6);
	}
	
	AICard = AIHand[rand];
	AIHand[rand] = -1;
	ctx.drawImage(deck[AICard], 570, 325, 175, 250);
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
	
	switch (AICard) {
		case 0:
			AICardText = "Exam";
			break;
		case 1:
			AICardText = "Freshman";
			break;
		case 2:
			AICardText = "Graduating Senior";
			break;
		case 3:
			AICardText = "Debt";
			break;
		case 4:
			AICardText = "Dog";
			break;
		case 5:
			AICardText = "Mines Market";
			break;
		case 6:
			AICardText = "Office Hours";
			break;
		case 7:
			AICardText = "Snow Day";
			break;
		case 8:
			AICardText = "Scholarship";
			break;
		case 9:
			AICardText = "Parking";
			break;
		case 10:
			AICardText = "1.5 GPA";
			break;
		case 11:
			AICardText = "Domino's";
			break;
		case 12:
			AICardText = '"I Prefer Research" Professor';
	}
	
	makeResult();
}

// This handles how the AI and user cards interact
function makeResult() {
	// This is one really ugly and big switch--please advise.
	switch(userCard) {
		
		// Exam case
		case 0:
			yourCardText = "Exam";
			// Inner switch
			switch(AICard) {
				// Exam case
				case 0:
					turnResult = "multiply";
					resultText = "Two exams in the same day...";
					resultTextLine2 = "";
					break;
				// Freshman case
				case 1:
					turnResult = "win";
					resultText = "The first exam never goes well";
					resultTextLine2 = "";
					break;
				// Senior case
				case 2:
					turnResult = "loss";
					resultText = "Seniors know this dance";
					resultTextLine2 = "";
					break;
				// Debt case
				case 3:
					turnResult = "multiply";
					resultText = "What do I stress over??";
					resultTextLine2 = "Exams or debt??";
					break;
				// Dog case
				case 4:
					turnResult = "loss";
					resultText = "The dog ate my exam";
					resultTextLine2 = "";
					break;
				// Market case
				case 5:
					turnResult = "loss";
					resultText = "I too eat ice cream when I'm sad";
					resultTextLine2 = "";
					break;
				// Office case
				case 6:
					turnResult = "loss";
					resultText = "The best study buddy is the";
					resultTextLine2 = "professor";
					break;
				// Snow case
				case 7:
					turnResult = "loss";
					resultText = "No exam today!";
					resultTextLine2 = "";
					break;
				// Scholarship case
				case 8:
					turnResult = "unrelate";
					resultText = "I got nothing";
					resultTextLine2 = "";
					break;
				// Parking case
				case 9:
					turnResult = "multiply";
					resultText = "The only thing worse than parking"
					resultTextLine2 = "is parking for the exam";
					break;
				// GPA case
				case 10:
					turnResult = "multiply";
					resultText = "These things pile up you know";
					resultTextLine2 = "";
					break;
				// Domino's case
				case 11:
					turnResult = "loss";
					resultText = "You won't remember the exam";
					resultTextLine2 = "after this pizza";
					break;
				// Prof case
				case 12:
					turnResult = "multiply";
					resultText = "I heard he just gets these off the";
					resultTextLine2 = "internet";
			}
			break;
			
		// Freshman case
		case 1:
			yourCardText = "Freshman";
			// Inner switch
			switch(AICard) {
				// Exam case
				case 0:
					turnResult = "loss";
					resultText = "The first exam never goes well";
					resultTextLine2 = "";
					break;
				// Freshman case
				case 1:
					turnResult = "multiply";
					resultText = "Dear God their lanyards are";
					resultTextLine2 = "interlocking!";
					break;
				// Senior case
				case 2:
					turnResult = "loss";
					resultText = "Yeah whatever kid";
					resultTextLine2 = "";
					break;
				// Debt case
				case 3:
					turnResult = "loss";
					resultText = "It's never too early to have loans";
					resultTextLine2 = "";
					break;
				// Dog case
				case 4:
					turnResult = "loss";
					resultText = "Good luck leaving this good boy";
					resultTextLine2 = "";
					break;
				// Market case
				case 5:
					turnResult = "loss";
					resultText = "Is that fully cooked?";
					resultTextLine2 = "";
					break;
				// Office case
				case 6:
					turnResult = "multiply";
					resultText = "That's a recipe for early success";
					resultTextLine2 = "";
					break;
				// Snow case
				case 7:
					turnResult = "multiply";
					resultText = "Everyone loves snow";
					resultTextLine2 = "";
					break;
				// Scholarship case
				case 8:
					turnResult = "multiply";
					resultText = "Don't lose it!";
					resultTextLine2 = "";
					break;
				// Parking case
				case 9:
					turnResult = "unrelate";
					resultText = "You don't know the struggle yet";
					resultTextLine2 = "";
					break;
				// GPA case
				case 10:
					turnResult = "loss";
					resultText = "Rough start";
					resultTextLine2 = "";
					break;
				// Domino's case
				case 11:
					turnResult = "multiply";
					resultText = "Gotta avoid Mines Market"; 
					resultTextLine2 = "somehow";
					break;
				// Prof case
				case 12:
					turnResult = "loss";
					resultText = "Good luck learning stuff";
					resultTextLine2 = "";
			}
			break;
		
		// Senior case
		case 2:
			yourCardText = "Graduating Senior";
			// Inner switch
			switch(AICard) {
				// Exam case
				case 0:
					turnResult = "win";
					resultText = "Seniors know this dance";
					resultTextLine2 = "";
					break;
				// Freshman case
				case 1:
					turnResult = "win";
					resultText = "Yeah whatever kid";
					resultTextLine2 = "";
					break;
				// Senior case
				case 2:
					turnResult = "multiply";
					resultText = "Party!";
					resultTextLine2 = "";
					break;
				// Debt case
				case 3:
					turnResult = "loss";
					resultText = "Remember how you paid";
					resultTextLine2 = "for school?";
					break;
				// Dog case
				case 4:
					turnResult = "loss";
					resultText = "I ain't goin to school now";
					resultTextLine2 = "";
					break;
				// Market case
				case 5:
					turnResult = "unrelate";
					resultText = "BRING BACK DIGGERDEN";
					resultTextLine2 = "";
					break;
				// Office case
				case 6:
					turnResult = "multiply";
					resultText = "Going here is like a"; 
					resultTextLine2 = "part-time job";
					break;
				// Snow case
				case 7:
					turnResult = "multiply";
					resultText = "That means I don't have to move";
					resultTextLine2 = "";
					break;
				// Scholarship case
				case 8:
					turnResult = "multiply";
					resultText = "Good job keeping it around";
					resultTextLine2 = "";
					break;
				// Parking case
				case 9:
					turnResult = "loss";
					resultText = "Can they just build a parking";
					resultTextLine2 = "garage already?";
					break;
				// GPA case
				case 10:
					turnResult = "loss";
					resultText = "What do you mean I can't get";
					resultTextLine2 = "an internship?";
					break;
				// Domino's case
				case 11:
					turnResult = "multiply";
					resultText = "I live off this";
					resultTextLine2 = "";
					break;
				// Prof case
				case 12:
					turnResult = "loss";
					resultText = "JUST TEACH ME SOMETHING";
					resultTextLine2 = "";
			}
			break;
			
		// Debt case
		case 3:
			yourCardText = "Debt";
			// Inner switch
			switch(AICard) {
				// Exam case
				case 0:
					turnResult = "multiply";
					resultText = "What do I stress over??";
					resultTextLine2 = "Exams or debt??";
					break;
				// Freshman case
				case 1:
					turnResult = "win";
					resultText = "It's never too early to have loans";
					resultTextLine2 = "";
					break;
				// Senior case
				case 2:
					turnResult = "win";
					resultText = "Remember how you paid";
					resultTextLine2 ="for school?";
					break;
				// Debt case
				case 3:
					turnResult = "multiply";
					resultText = "I am infinitely poor";
					resultTextLine2 = "";
					break;
				// Dog case
				case 4:
					turnResult = "loss";
					resultText = "It's okay he's so cute!";
					resultTextLine2 = "";
					break;
				// Market case
				case 5:
					turnResult = "multiply";
					resultText = "I would have less debt without";
					resultTextLine2 = "a meal plan";
					break;
				// Office case
				case 6:
					turnResult = "unrelate";
					resultText = "My econ TA won't help me";
					resultTextLine2 = "with debt";
					break;
				// Snow case
				case 7:
					turnResult = "unrelate";
					resultText = "Ah look at all that white,";
					resultTextLine2 = "fluffy debt";
					break;
				// Scholarship case
				case 8:
					turnResult = "loss";
					resultText = "Hey, this helps";
					resultTextLine2 = "";
					break;
				// Parking case
				case 9:
					turnResult = "unrelate";
					resultText = "You can't park on debt";
					resultTextLine2 = "";
					break;
				// GPA case
				case 10:
					turnResult = "multiply";
					resultText = "Looks like I'll be here";
					resultTextLine2 = "a little longer...";
					break;
				// Domino's case
				case 11:
					turnResult = "loss";
					resultText = "What debt? I'm eating";
					resultTextLine2 = "";
					break;
				// Prof case
				case 12:
					turnResult = "multiply";
					resultText = "Guess how he funds research";
					resultTextLine2 = "";
			}
			break;
		
		// Dog case
		case 4:
			yourCardText = "Dog";
			// Inner switch
			switch(AICard) {
				// Exam case
				case 0:
					turnResult = "win";
					resultText = "The dog ate my exam";
					resultTextLine2 = "";
					break;
				// Freshman case
				case 1:
					turnResult = "win";
					resultText = "Good luck leaving this good boy";
					resultTextLine2 = "";
					break;
				// Senior case
				case 2:
					turnResult = "win";
					resultText = "I ain't goin to school now";
					resultTextLine2 = "";
					break;
				// Debt case
				case 3:
					turnResult = "win";
					resultText = "It's okay he's so cute!";
					resultTextLine2 = "";
					break;
				// Dog case
				case 4:
					turnResult = "multiply";
					resultText = "This is too much cute in one space";
					resultTextLine2 = "";
					break;
				// Market case
				case 5:
					turnResult = "loss";
					resultText = "Dogs aren't allowed in";
					resultTextLine2 = "Mines Market ):";
					break;
				// Office case
				case 6:
					turnResult = "win";
					resultText = "Office hours? But dog";
					resultTextLine2 = "";
					break;
				// Snow case
				case 7:
					turnResult = "multiply";
					resultText = "He like snow";
					resultTextLine2 = "";
					break;
				// Scholarship case
				case 8:
					turnResult = "unrelate";
					resultText = "Is there a dog scholarship?";
					resultTextLine2 = "";
					break;
				// Parking case
				case 9:
					turnResult = "win";
					resultText = "I'll just walk to school with him";
					resultTextLine2 = "";
					break;
				// GPA case
				case 10:
					turnResult = "win";
					resultText = "DOG is the better 3 letters";
					resultTextLine2 = "";
					break;
				// Domino's case
				case 11:
					turnResult = "win";
					resultText = "The dog ate the pizza";
					resultTextLine2 = "";
					break;
				// Prof case
				case 12:
					turnResult = "win";
					resultText = "The only thing better than research";
					resultTextLine2 = "";
			}
			break;
			
		// Market case
		case 5:
			yourCardText = "Mines Market";
			// Inner switch
			switch(AICard) {
				// Exam case
				case 0:
					turnResult = "unrelate";
					resultText = "I too eat ice cream when I'm sad";
					resultTextLine2 = "";
					break;
				// Freshman case
				case 1:
					turnResult = "win";
					resultText = "Is that fully cooked?";
					resultTextLine2 = "";
					break;
				// Senior case
				case 2:
					turnResult = "unrelate";
					resultText = "BRING BACK DIGGERDEN";
					resultTextLine2 = "";
					break;
				// Debt case
				case 3:
					turnResult = "multiply";
					resultText = "I would have less debt without";
					resultTextLine2 = "a meal plan";
					break;
				// Dog case
				case 4:
					turnResult = "win";
					resultText = "Dogs aren't allowed in";
					resultTextLine2 = "Mines Market ):";
					break;
				// Market case
				case 5:
					turnResult = "multiply";
					resultText = "Ugh why is there two";
					resultTextLine2 = "";
					break;
				// Office case
				case 6:
					turnResult = "unrelate";
					resultText = "Office hours is not gonna be here";
					resultTextLine2 = "";
					break;
				// Snow case
				case 7:
					turnResult = "unrelate";
					resultText = "They ain't got snow days";
					resultTextLine2 = "";
					break;
				// Scholarship case
				case 8:
					turnResult = "unrelate";
					resultText = "I don't know";
					resultTextLine2 = "";
					break;
				// Parking case
				case 9:
					turnResult = "unrelate";
					resultText = "I've never seen anyone park";
					resultTextLine2 = "on campus for Mines Market";
					break;
				// GPA case
				case 10:
					turnResult = "win";
					resultText = "Eat those sorrows friend";
					resultTextLine2 = "";
					break;
				// Domino's case
				case 11:
					turnResult = "loss";
					resultText = "Yeah I prefer one over the";
					resultTextLine2 = "other fight me";
					break;
				// Prof case
				case 12:
					turnResult = "unrelate";
					resultText = "There is no research here";
					resultTextLine2 = "";
			}
			break;
			
		// Office case
		case 6:
			yourCardText = "Office Hours";
			// Inner switch
			switch(AICard) {
				// Exam case
				case 0:
					turnResult = "win";
					resultText = "The best study buddy is";
					resultTextLine2 = "the professor";
					break;
				// Freshman case
				case 1:
					turnResult = "multiply";
					resultText = "That's a recipe for early success";
					resultTextLine2 = "";
					break;
				// Senior case
				case 2:
					turnResult = "multiply";
					resultText = "Going here is like a";
					resultTextLine2 = "part-time job";
					break;
				// Debt case
				case 3:
					turnResult = "unrelate";
					resultText = "My econ TA won't help me";
					resultTextLine2 = "with debt";
					break;
				// Dog case
				case 4:
					turnResult = "loss";
					resultText = "Office hours? But dog";
					resultTextLine2 = "";
					break;
				// Market case
				case 5:
					turnResult = "unrelate";
					resultText = "Office hours is not gonna be here";
					resultTextLine2 = "";
					break;
				// Office case
				case 6:
					turnResult = "multiply";
					resultText = "I live here now";
					resultTextLine2 = "";
					break;
				// Snow case
				case 7:
					turnResult = "loss";
					resultText = "Office hours is cancelled";
					resultTextLine2 = "";
					break;
				// Scholarship case
				case 8:
					turnResult = "unrelate";
					resultText = "Wrong office";
					resultTextLine2 = "";
					break;
				// Parking case
				case 9:
					turnResult = "loss";
					resultText = "Is there any way to park";
					resultTextLine2 = "near office hours??";
					break;
				// GPA case
				case 10:
					turnResult = "win";
					resultText = "1.5 no longer!";
					resultTextLine2 = "";
					break;
				// Domino's case
				case 11:
					turnResult = "multiply";
					resultText = "Pizza HW party!";
					resultTextLine2 = "";
					break;
				// Prof case
				case 12:
					turnResult = "loss";
					resultText = "Does he actually go to these?";
					resultTextLine2 = "";
			}
			break;
			
		// Snow case
		case 7:
			yourCardText = "Snow Day";
			// Inner switch
			switch(AICard) {
				// Exam case
				case 0:
					turnResult = "win";
					resultText = "No exam today!";
					resultTextLine2 = "";
					break;
				// Freshman case
				case 1:
					turnResult = "multiply";
					resultText = "Everyone loves snow";
					resultTextLine2 = "";
					break;
				// Senior case
				case 2:
					turnResult = "multiply";
					resultText = "That means I don't have to move";
					resultTextLine2 = "";
					break;
				// Debt case
				case 3:
					turnResult = "unrelate";
					resultText = "Ah look at all that white,";
					resultTextLine2 = "fluffy debt";
					break;
				// Dog case
				case 4:
					turnResult = "multiply";
					resultText = "He like snow";
					resultTextLine2 = "";
					break;
				// Market case
				case 5:
					turnResult = "unrelate";
					resultText = "They ain't got snow days";
					resultTextLine2 = "";
					break;
				// Office case
				case 6:
					turnResult = "win";
					resultText = "Office hours is cancelled";
					resultTextLine2 = "";
					break;
				// Snow case
				case 7:
					turnResult = "multiply";
					resultText = "TWO snow days??";
					resultTextLine2 = "";
					break;
				// Scholarship case
				case 8:
					turnResult = "multiply";
					resultText = "This is literally the best";
					resultTextLine2 = "";
					break;
				// Parking case
				case 9:
					turnResult = "win";
					resultText = "No school, no parking";
					resultTextLine2 = "";
					break;
				// GPA case
				case 10:
					turnResult = "win";
					resultText = "My GPA doesn't exist if";
					resultTextLine2 = "school's cancelled";
					break;
				// Domino's case
				case 11:
					turnResult = "multiply";
					resultText = "I can't really go anywhere so...";
					resultTextLine2 = "";
					break;
				// Prof case
				case 12:
					turnResult = "win";
					resultText = "He doesn't exist if";
					resultTextLine2 = "school's cancelled";
			}
			break;
		
		// Scholarship case
		case 8:
			yourCardText = "Scholarship";
			// Inner switch
			switch(AICard) {
				// Exam case
				case 0:
					turnResult = "unrelate";
					resultText = "I got nothing";
					resultTextLine2 = "";
					break;
				// Freshman case
				case 1:
					turnResult = "multiply";
					resultText = "Don't lose it!";
					resultTextLine2 = "";
					break;
				// Senior case
				case 2:
					turnResult = "multiply";
					resultText = "Good job keeping it around";
					resultTextLine2 = "";
					break;
				// Debt case
				case 3:
					turnResult = "win";
					resultText = "Hey, this helps";
					resultTextLine2 = "";
					break;
				// Dog case
				case 4:
					turnResult = "unrelate";
					resultText = "Is there a dog scholarship?";
					resultTextLine2 = "";
					break;
				// Market case
				case 5:
					turnResult = "unrelate";
					resultText = "I don't know";
					resultTextLine2 = "";
					break;
				// Office case
				case 6:
					turnResult = "unrelate";
					resultText = "Wrong office";
					resultTextLine2 = "";
					break;
				// Snow case
				case 7:
					turnResult = "multiply";
					resultText = "This is literally the best";
					resultTextLine2 = "";
					break;
				// Scholarship case
				case 8:
					turnResult = "multiply";
					resultText = "Money, money, money, MONEY";
					resultTextLine2 = "";
					break;
				// Parking case
				case 9:
					turnResult = "unrelate";
					resultText = "I've never parked on a"
					resultTextLine2 = "scholarship before";
					break;
				// GPA case
				case 10:
					turnResult = "loss";
					resultText = "So much for that scholarship";
					resultTextLine2 = "";
					break;
				// Domino's case
				case 11:
					turnResult = "multiply";
					resultText = "Now you can buy more Domino's";
					resultTextLine2 = "";
					break;
				// Prof case
				case 12:
					turnResult = "unrelate";
					resultText = "Meh";
					resultTextLine2 = "";
			}
			break;
			
		// Parking case
		case 9:
			yourCardText = "Parking";
			// Inner switch
			switch(AICard) {
				// Exam case
				case 0:
					turnResult = "multiply";
					resultText = "The only thing worse than parking";
					resultTextLine2 = "is parking for the exam";
					break;
				// Freshman case
				case 1:
					turnResult = "unrelate";
					resultText = "You don't know the struggle yet";
					resultTextLine2 = "";
					break;
				// Senior case
				case 2:
					turnResult = "win";
					resultText = "Can they just build a parking";
					resultTextLine2 = "garage already?";
					break;
				// Debt case
				case 3:
					turnResult = "unrelate";
					resultText = "You can't park on debt";
					resultTextLine2 = "";
					break;
				// Dog case
				case 4:
					turnResult = "loss";
					resultText = "I'll just walk to school with him";
					resultTextLine2 = "";
					break;
				// Market case
				case 5:
					turnResult = "unrelate";
					resultText = "I've never seen anyone park";
					resultTextLine2 = "on campus for Mines Market";
					break;
				// Office case
				case 6:
					turnResult = "win";
					resultText = "Is there any way to park";
					resultTextLine2 = "near office hours??";
					break;
				// Snow case
				case 7:
					turnResult = "loss";
					resultText = "No school, no parking";
					resultTextLine2 = "";
					break;
				// Scholarship case
				case 8:
					turnResult = "unrelate";
					resultText = "I've never parked on a";
					resultTextLine2 = "scholarship before";
					break;
				// Parking case
				case 9:
					turnResult = "multiply";
					resultText = "Hey, more parking";
					resultTextLine2 = "";
					break;
				// GPA case
				case 10:
					turnResult = "unrelate";
					resultText = "Grade Parking Average?";
					resultTextLine2 = "";
					break;
				// Domino's case
				case 11:
					turnResult = "win";
					resultText = "Pizza doesn't care about";
					resultTextLine2 = "my grades";
					break;
				// Prof case
				case 12:
					turnResult = "win";
					resultText = "Even he has to try and park";
					resultTextLine2 = "on campus";
			}
			break;
			
		// GPA case
		case 10:
			yourCardText = "1.5 GPA";
			// Inner switch
			switch(AICard) {
				// Exam case
				case 0:
					turnResult = "multiply";
					resultText = "These things pile up you know";
					resultTextLine2 = "";
					break;
				// Freshman case
				case 1:
					turnResult = "win";
					resultText = "Rough start";
					resultTextLine2 = "";
					break;
				// Senior case
				case 2:
					turnResult = "win";
					resultText = "What do you mean I can't get";
					resultTextLine2 = "an internship?";
					break;
				// Debt case
				case 3:
					turnResult = "multiply";
					resultText = "Looks like I'll be here a";
					resultTextLine2 = "little longer...";
					break;
				// Dog case
				case 4:
					turnResult = "loss";
					resultText = "DOG is the better 3 letters";
					resultTextLine2 = "";
					break;
				// Market case
				case 5:
					turnResult = "loss";
					resultText = "Eat those sorrows friend";
					resultTextLine2 = "";
					break;
				// Office case
				case 6:
					turnResult = "loss";
					resultText = "1.5 no longer!";
					resultTextLine2 = "";
					break;
				// Snow case
				case 7:
					turnResult = "loss";
					resultText = "My GPA doesn't exist if";
					resultTextLine2 = "school's cancelled";
					break;
				// Scholarship case
				case 8:
					turnResult = "win";
					resultText = "So much for that scholarship";
					resultTextLine2 = "";
					break;
				// Parking case
				case 9:
					turnResult = "unrelate";
					resultText = "Grade Parking Average?";
					resultTextLine2 = "";
					break;
				// GPA case
				case 10:
					turnResult = "multiply";
					resultText = "Existence is pain";
					resultTextLine2 = "";
					break;
				// Domino's case
				case 11:
					turnResult = "loss";
					resultText = "Maybe they'll hire me...";
					resultTextLine2 = "";
					break;
				// Prof case
				case 12:
					turnResult = "multiply";
					resultText = "I don't wanna say its";
					resultTextLine2 = "his fault but...";
			}
			break;
			
		// Domino's case
		case 11:
			yourCardText = "Domino's";
			// Inner switch
			switch(AICard) {
				// Exam case
				case 0:
					turnResult = "win";
					resultText = "You won't remember the exam";
					resultTextLine2 = "after this pizza";
					break;
				// Freshman case
				case 1:
					turnResult = "multiply";
					resultText = "Gotta avoid Mines Market"; 
					resultTextLine2 = "somehow";
					break;
				// Senior case
				case 2:
					turnResult = "multiply";
					resultText = "I live off this";
					resultTextLine2 = "";
					break;
				// Debt case
				case 3:
					turnResult = "win";
					resultText = "What debt? I'm eating";
					resultTextLine2 = "";
					break;
				// Dog case
				case 4:
					turnResult = "loss";
					resultText = "The dog ate the pizza";
					resultTextLine2 = "";
					break;
				// Market case
				case 5:
					turnResult = "win";
					resultText = "Yeah I prefer one over the";
					resultTextLine2 = "other fight me";
					break;
				// Office case
				case 6:
					turnResult = "multiply";
					resultText = "Pizza HW party!";
					resultTextLine2 = "";
					break;
				// Snow case
				case 7:
					turnResult = "multiply";
					resultText = "I can't really go anywhere so...";
					resultTextLine2 = "";
					break;
				// Scholarship case
				case 8:
					turnResult = "multiply";
					resultText = "Now you can buy more Domino's";
					resultTextLine2 = "";
					break;
				// Parking case
				case 9:
					turnResult = "loss";
					resultText = "Pizza doesn't care about";
					resultTextLine2 = "my grades";
					break;
				// GPA case
				case 10:
					turnResult = "win";
					resultText = "Maybe they'll hire me...";
					resultTextLine2 = "";
					break;
				// Domino's case
				case 11:
					turnResult = "multiply";
					resultText = "This is actually all I eat";
					resultTextLine2 = "";
					break;
				// Prof case
				case 12:
					turnResult = "unrelate";
					resultText = "I'm not sure he eats anything";
					resultTextLine2 = "but coffee";
			}
			break;
			
		// Prof case
		case 12:
			yourCardText = '"I Prefer Research" Professor';
			// Inner switch
			switch(AICard) {
				// Exam case
				case 0:
					turnResult = "multiply";
					resultText = "I heard he just gets these off";
					resultTextLine2 = "the internet";
					break;
				// Freshman case
				case 1:
					turnResult = "win";
					resultText = "Good luck learning stuff";
					resultTextLine2 = "";
					break;
				// Senior case
				case 2:
					turnResult = "win";
					resultText = "JUST TEACH ME SOMETHING";
					resultTextLine2 = "";
					break;
				// Debt case
				case 3:
					turnResult = "multiply";
					resultText = "Guess how he funds research";
					resultTextLine2 = "";
					break;
				// Dog case
				case 4:
					turnResult = "loss";
					resultText = "The only thing better than research";
					resultTextLine2 = "";
					break;
				// Market case
				case 5:
					turnResult = "unrelate";
					resultText = "There is no research here";
					resultTextLine2 = "";
					break;
				// Office case
				case 6:
					turnResult = "win";
					resultText = "Does he actually go to these?";
					resultTextLine2 = "";
					break;
				// Snow case
				case 7:
					turnResult = "loss";
					resultText = "He doesn't exist if";
					resultTextLine2 = "school's cancelled";
					break;
				// Scholarship case
				case 8:
					turnResult = "unrelate";
					resultText = "Meh";
					resultTextLine2 = "";
					break;
				// Parking case
				case 9:
					turnResult = "loss";
					resultText = "Even he has to try and";
					resultTextLine2 = "park on campus";
					break;
				// GPA case
				case 10:
					turnResult = "multiply";
					resultText = "I don't wanna say its";
					resultTextLine2 = "his fault but...";
					break;
				// Domino's case
				case 11:
					turnResult = "unrelate";
					resultText = "I'm not sure he eats anything";
					resultTextLine2 = "but coffee";
					break;
				// Prof case
				case 12:
					turnResult = "multiply";
					resultText = "I guess all my classes are F's now";
					resultTextLine2 = "";
			}
	}
	
	useResult();
}

// This handles what a result actually does
function useResult() {
	// Refresh result box
	ctx.fillStyle = "rgba(0, 0, 0, 1)";
	ctx.fillRect(15, 335, 250, 250);
	ctx.fillStyle = "Gold";
	ctx.textAlign = "center";
	ctx.font = "16px Helvetica";
	ctx.fillText("Your card", 137, 385);
	ctx.fillText(yourCardText, 137, 405);
	ctx.fillText("AI card", 137, 445);
	ctx.fillText(AICardText, 137, 465);
	ctx.fillText("Why", 137, 505);
	ctx.fillText(resultText, 137, 525);
	ctx.fillText(resultTextLine2, 137, 545);
	ctx.font = "20px Helvetica";
	ctx.fillStyle = "rgba(75, 0, 0, 1)";
	ctx.textAlign = "left";
	
	// Affects the screen and stats
	switch(turnResult) {
		// Degrades AI HP
		case "win":
			ctx.fillRect(0, 0, 290, 32);
			ctx.fillStyle = "Gold";
			theirHP -= betAmount;
			ctx.fillText("Their HP: " + theirHP, 25, 30);
			ctx.textAlign = "center";
			ctx.font = "16px Helvetica";
			ctx.fillText("Round win", 135, 355);
			++round;
			multiply = 0;
			didWin();
			break;
		// Degrades User HP
		case "loss":
			ctx.fillRect(0, 860, 290, 40);
			ctx.fillStyle = "Gold";
			yourHP -= betAmount;
			ctx.fillText("Your HP: " + yourHP, 25, 880);
			ctx.textAlign = "center";
			ctx.font = "16px Helvetica";
			ctx.fillText("Round loss", 135, 355);
			multiply = 0;
			++round;
			didWin();
			break;
		// Doubles Bet Amount
		case "multiply":
			if (multiply == 6) {
				fillHands();
			}
			else {
				ctx.fillStyle = "Gold";
				betAmount = betAmount * 2;
				ctx.textAlign = "center";
				ctx.font = "16px Helvetica";
				ctx.fillText("Multiplier (x2)", 135, 355);
				++multiply;
				takeTurn();
			}
			break;
		// Degrades both players HP
		case "unrelate":
			ctx.fillRect(0, 0, 290, 32);
			ctx.fillRect(0, 860, 290, 40);
			ctx.fillStyle = "Gold";
			theirHP -= Math.floor(betAmount / 2);
			yourHP -= Math.floor(betAmount / 2);
			ctx.fillText("Their HP: " + theirHP, 25, 30);
			ctx.fillText("Your HP: " + yourHP, 25, 880);
			ctx.textAlign = "center";
			ctx.font = "16px Helvetica";
			ctx.fillText("These are unrelated", 135, 355);
			multiply = 0;
			++round;
			didWin();
	}
}

// This replenishes card views
function redrawCards() {
	ctx.drawImage(cardBack, 40, 90, 140, 200);
	ctx.drawImage(cardBack, 195, 90, 140, 200);
	ctx.drawImage(cardBack, 350, 90, 140, 200);
	ctx.drawImage(cardBack, 507, 90, 140, 200);
	ctx.drawImage(cardBack, 662, 90, 140, 200);
	ctx.drawImage(cardBack, 817, 90, 140, 200);
	ctx.drawImage(deck[userHand[0]], 40, 640, 140, 200);
	ctx.drawImage(deck[userHand[1]], 195, 640, 140, 200);
	ctx.drawImage(deck[userHand[2]], 350, 640, 140, 200);
	ctx.drawImage(deck[userHand[3]], 507, 640, 140, 200);
	ctx.drawImage(deck[userHand[4]], 662, 640, 140, 200);
	ctx.drawImage(deck[userHand[5]], 817, 640, 140, 200);
	
	bet();
}

// This checks if the game has ended
function didWin() {
	if (yourHP < 1) {
		// Check both loss
		if (theirHP < 1) {
			gameResult = "bothLose";
			endGame();
		}
		else {
			gameResult = "lose";
			endGame();
		}
	}
	else if (theirHP < 1) {
		gameResult = "win";
		endGame();
	}
	
	else {
		fillHands();
	}
}

// This ends the game
function endGame() {	
	switch(gameResult) {
		case "win":
			score = (100 - round) * yourHP * 10;
			$("#tossResult").css("background-image", "url('images/winner.png')");
			$("#tossResult p").html("You defeated the AI! Amazing! <br> Your score is: " + score);
			$("#tossResult").fadeIn(3000);
			canClick = false;
			highscore(score);
			break;
		case "lose":
			score = (100 - round) * theirHP * 10 * -1;
			$("#tossResult").css("background-image", "url('images/lose.jpg')");
			$("#tossResult p").html("You lost, you should try harder <br> Your score is: " + score);
			$("#tossResult").fadeIn(3000);
			canClick = false;
			highscore(score);
			break;
		case "bothLose":
			--yourHP;
			--theirHP;
			score = (100 - round) * yourHP * theirHP * 100 * -1;
			$("#tossResult").css("background-image", "url('images/tie.jpg')");
			$("#tossResult p").html("You both lost, like if the <br> Browns played the Browns <br> Your score is: " + score);
			$("#tossResult").fadeIn(3000);
			canClick = false;
			highscore(score);
	}
	$("#playAgain").css("visibility", "visible");
	$("#quit").css("visibility", "visible");
	
	$("#playAgain").mouseenter(function(){
		$("#playAgain").css("background-color", "Black");
		$("#playAgain").css("color", "White");
	});
	$("#quit").mouseenter(function(){
		$("#quit").css("background-color", "Black");
		$("#quit").css("color", "White");
	});
	$("#playAgain").mouseleave(function(){
		$("#playAgain").css("background-color", "rgb(75, 0, 0)");
		$("#playAgain").css("color", "Gold");
	});
	$("#quit").mouseleave(function(){
		$("#quit").css("background-color", "rgb(75, 0, 0)");
		$("#quit").css("color", "Gold");
	});
	
	// If play again is chosen
	$("#playAgain").click(function(){
		$("#tossResult").css("background-image", "url('images/coinHead.png'");
		$("#tossResult").css("visibility", "hidden");
		$("#playAgain").css("visibility", "hidden");
		$("#quit").css("visibility", "hidden");
		ctx.fillStyle = "rgba(75, 0, 0, 1)";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		theirHP = 100;
		yourHP = 100;
		userHand = [-1, -1, -1, -1, -1, -1];
		AIHand = [-1, -1, -1, -1, -1, -1];
		gameResult = "";
		round = 0;
		canClick = false;
		multiply = 0;
		coinChoose();
	});
	
	// If tails is chosen
	$("#quit").click(function(){
		document.location.href = "https://www.youtube.com/watch?v=WchnQOa2oO8";
	});
}