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
var result = "";

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
			theirName += "Your Mom";
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
	ctx.drawImage(deck[userHand[0]], 40, 640, 140, 200);
	ctx.drawImage(deck[userHand[1]], 195, 640, 140, 200);
	ctx.drawImage(deck[userHand[2]], 350, 640, 140, 200);
	ctx.drawImage(deck[userHand[3]], 507, 640, 140, 200);
	ctx.drawImage(deck[userHand[4]], 662, 640, 140, 200);
	ctx.drawImage(deck[userHand[5]], 817, 640, 140, 200);
}

// This makes the initial deal and then moves on
function firstDeal() {
	for (i = 0; i < userHand.length; ++i) {
		rand = Math.floor(Math.random() * 13);
		userHand[i] = rand;
	}
	for (i = 0; i < AIHand.length; ++i) {
		rand = Math.floor(Math.random() * 13);
		AIHand[i] = rand;
	}
	
	bet();
}

// This handles AI and User betting
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

// This handles the User choosing a card
function takeTurn() {
	// Fill out bet amount
	ctx.fillStyle = "rgba(0, 0, 0, 1)";
	ctx.fillRect(820, 360, 60, 40);
	ctx.textAlign = "center";
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
				userCard = userHand[0];
				ctx.drawImage(deck[userCard], 285, 325, 175, 250);
				ctx.fillRect(40, 640, 140, 200);
				canvas.removeEventListener("mousedown", getPosition, false);
				AIChooseCard();
			}
			else if (x <= 336 && x >= 194) {
				userCard = userHand[1];
				ctx.drawImage(deck[userCard], 285, 325, 175, 250);
				ctx.fillRect(195, 640, 140, 200);
				canvas.removeEventListener("mousedown", getPosition, false);
				AIChooseCard();
			}
			else if (x <= 491 && x >= 349) {
				userCard = userHand[2];
				ctx.drawImage(deck[userCard], 285, 325, 175, 250);
				ctx.fillRect(350, 640, 140, 200);
				canvas.removeEventListener("mousedown", getPosition, false);
				AIChooseCard();
			}
			else if (x <= 648 && x >= 506) {
				userCard = userHand[3];
				ctx.drawImage(deck[userCard], 285, 325, 175, 250);
				ctx.fillRect(507, 640, 140, 200);
				canvas.removeEventListener("mousedown", getPosition, false);
				AIChooseCard();
			}
			else if (x <= 803 && x >= 661) {
				userCard = userHand[4];
				ctx.drawImage(deck[userCard], 285, 325, 175, 250);
				ctx.fillRect(662, 640, 140, 200);
				canvas.removeEventListener("mousedown", getPosition, false);
				AIChooseCard();
			}
			else if (x <= 958 && x >= 816) {
				userCard = userHand[5];
				ctx.drawImage(deck[userCard], 285, 325, 175, 250);
				ctx.fillRect(817, 640, 140, 200);
				canvas.removeEventListener("mousedown", getPosition, false);
				AIChooseCard();
			}
		}
	}
}

// AI chooses card after user does
function AIChooseCard() {
	rand = Math.floor(Math.random() * 6);
	AICard = AIHand[rand];
	ctx.drawImage(deck[AICard], 540, 325, 175, 250);
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
	
	makeResult();
}

// This handles how the AI and user cards interact
function makeResult() {
	// This is one really ugly and big switch--please advise.
	switch(userCard) {
		
		// Exam case
		case 0:
			// Inner switch
			switch(AICard) {
				// Exam case
				case 0:
					result = "multiply";
					break;
				// Freshman case
				case 1:
					result = "win";
					break;
				// Senior case
				case 2:
					result = "loss";
					break;
				// Debt case
				case 3:
					result = "multiply";
					break;
				// Dog case
				case 4:
					result = "loss";
					break;
				// Market case
				case 5:
					result = "unrelate";
					break;
				// Office case
				case 6:
					result = "loss";
					break;
				// Snow case
				case 7:
					result = "loss";
					break;
				// Scholarship case
				case 8:
					result = "unrelate";
					break;
				// Parking case
				case 9:
					result = "multiply";
					break;
				// GPA case
				case 10:
					result = "multiply";
					break;
				// Domino's case
				case 11:
					result = "loss";
					break;
				// Prof case
				case 12:
					result = "multiply";
			}
			break;
			
		// Freshman case
		case 1:
			// Inner switch
			switch(AICard) {
				// Exam case
				case 0:
					result = "loss";
					break;
				// Freshman case
				case 1:
					result = "multiply";
					break;
				// Senior case
				case 2:
					result = "loss";
					break;
				// Debt case
				case 3:
					result = "loss";
					break;
				// Dog case
				case 4:
					result = "loss";
					break;
				// Market case
				case 5:
					result = "loss";
					break;
				// Office case
				case 6:
					result = "multiply";
					break;
				// Snow case
				case 7:
					result = "multiply";
					break;
				// Scholarship case
				case 8:
					result = "multiply";
					break;
				// Parking case
				case 9:
					result = "unrelate";
					break;
				// GPA case
				case 10:
					result = "loss";
					break;
				// Domino's case
				case 11:
					result = "multiply";
					break;
				// Prof case
				case 12:
					result = "loss";
			}
			break;
		
		// Senior case
		case 2:
			// Inner switch
			switch(AICard) {
				// Exam case
				case 0:
					result = "win";
					break;
				// Freshman case
				case 1:
					result = "win";
					break;
				// Senior case
				case 2:
					result = "multiply";
					break;
				// Debt case
				case 3:
					result = "loss";
					break;
				// Dog case
				case 4:
					result = "loss";
					break;
				// Market case
				case 5:
					result = "unrelate";
					break;
				// Office case
				case 6:
					result = "multiply";
					break;
				// Snow case
				case 7:
					result = "multiply";
					break;
				// Scholarship case
				case 8:
					result = "multiply";
					break;
				// Parking case
				case 9:
					result = "loss";
					break;
				// GPA case
				case 10:
					result = "loss";
					break;
				// Domino's case
				case 11:
					result = "multiply";
					break;
				// Prof case
				case 12:
					result = "loss";
			}
			break;
			
		// Debt case
		case 3:
			// Inner switch
			switch(AICard) {
				// Exam case
				case 0:
					result = "multiply";
					break;
				// Freshman case
				case 1:
					result = "win";
					break;
				// Senior case
				case 2:
					result = "win";
					break;
				// Debt case
				case 3:
					result = "multiply";
					break;
				// Dog case
				case 4:
					result = "loss";
					break;
				// Market case
				case 5:
					result = "multiply";
					break;
				// Office case
				case 6:
					result = "unrelate";
					break;
				// Snow case
				case 7:
					result = "unrelate";
					break;
				// Scholarship case
				case 8:
					result = "loss";
					break;
				// Parking case
				case 9:
					result = "unrelate";
					break;
				// GPA case
				case 10:
					result = "multiply";
					break;
				// Domino's case
				case 11:
					result = "loss";
					break;
				// Prof case
				case 12:
					result = "multiply";
			}
			break;
		
		// Dog case
		case 4:
			// Inner switch
			switch(AICard) {
				// Exam case
				case 0:
					result = "win";
					break;
				// Freshman case
				case 1:
					result = "win";
					break;
				// Senior case
				case 2:
					result = "win";
					break;
				// Debt case
				case 3:
					result = "win";
					break;
				// Dog case
				case 4:
					result = "multiply";
					break;
				// Market case
				case 5:
					result = "loss";
					break;
				// Office case
				case 6:
					result = "win";
					break;
				// Snow case
				case 7:
					result = "multiply";
					break;
				// Scholarship case
				case 8:
					result = "unrelate";
					break;
				// Parking case
				case 9:
					result = "win";
					break;
				// GPA case
				case 10:
					result = "win";
					break;
				// Domino's case
				case 11:
					result = "win";
					break;
				// Prof case
				case 12:
					result = "win";
			}
			break;
			
		// Market case
		case 5:
			// Inner switch
			switch(AICard) {
				// Exam case
				case 0:
					result = "unrelate";
					break;
				// Freshman case
				case 1:
					result = "win";
					break;
				// Senior case
				case 2:
					result = "unrelate";
					break;
				// Debt case
				case 3:
					result = "multiply";
					break;
				// Dog case
				case 4:
					result = "win";
					break;
				// Market case
				case 5:
					result = "multiply";
					break;
				// Office case
				case 6:
					result = "unrelate";
					break;
				// Snow case
				case 7:
					result = "unrelate";
					break;
				// Scholarship case
				case 8:
					result = "unrelate";
					break;
				// Parking case
				case 9:
					result = "unrelate";
					break;
				// GPA case
				case 10:
					result = "win";
					break;
				// Domino's case
				case 11:
					result = "loss";
					break;
				// Prof case
				case 12:
					result = "unrelate";
			}
			break;
			
		// Office case
		case 6:
			// Inner switch
			switch(AICard) {
				// Exam case
				case 0:
					result = "win";
					break;
				// Freshman case
				case 1:
					result = "multiply";
					break;
				// Senior case
				case 2:
					result = "multiply";
					break;
				// Debt case
				case 3:
					result = "unrelate";
					break;
				// Dog case
				case 4:
					result = "loss";
					break;
				// Market case
				case 5:
					result = "unrelate";
					break;
				// Office case
				case 6:
					result = "multiply";
					break;
				// Snow case
				case 7:
					result = "loss";
					break;
				// Scholarship case
				case 8:
					result = "unrelate";
					break;
				// Parking case
				case 9:
					result = "loss";
					break;
				// GPA case
				case 10:
					result = "win";
					break;
				// Domino's case
				case 11:
					result = "multiply";
					break;
				// Prof case
				case 12:
					result = "loss";
			}
			break;
			
		// Snow case
		case 7:
			// Inner switch
			switch(AICard) {
				// Exam case
				case 0:
					result = "win";
					break;
				// Freshman case
				case 1:
					result = "multiply";
					break;
				// Senior case
				case 2:
					result = "multiply";
					break;
				// Debt case
				case 3:
					result = "unrelate";
					break;
				// Dog case
				case 4:
					result = "multiply";
					break;
				// Market case
				case 5:
					result = "unrelate";
					break;
				// Office case
				case 6:
					result = "win";
					break;
				// Snow case
				case 7:
					result = "multiply";
					break;
				// Scholarship case
				case 8:
					result = "multiply";
					break;
				// Parking case
				case 9:
					result = "win";
					break;
				// GPA case
				case 10:
					result = "win";
					break;
				// Domino's case
				case 11:
					result = "multiply";
					break;
				// Prof case
				case 12:
					result = "win";
			}
			break;
		
		// Scholarship case
		case 8:
			// Inner switch
			switch(AICard) {
				// Exam case
				case 0:
					result = "unrelate";
					break;
				// Freshman case
				case 1:
					result = "multiply";
					break;
				// Senior case
				case 2:
					result = "multiply";
					break;
				// Debt case
				case 3:
					result = "win";
					break;
				// Dog case
				case 4:
					result = "unrelate";
					break;
				// Market case
				case 5:
					result = "unrelate";
					break;
				// Office case
				case 6:
					result = "unrelate";
					break;
				// Snow case
				case 7:
					result = "multiply";
					break;
				// Scholarship case
				case 8:
					result = "multiply";
					break;
				// Parking case
				case 9:
					result = "unrelate";
					break;
				// GPA case
				case 10:
					result = "loss";
					break;
				// Domino's case
				case 11:
					result = "multiply";
					break;
				// Prof case
				case 12:
					result = "unrelate";
			}
			break;
			
		// Parking case
		case 9:
			// Inner switch
			switch(AICard) {
				// Exam case
				case 0:
					result = "multiply";
					break;
				// Freshman case
				case 1:
					result = "unrelate";
					break;
				// Senior case
				case 2:
					result = "win";
					break;
				// Debt case
				case 3:
					result = "unrelate";
					break;
				// Dog case
				case 4:
					result = "loss";
					break;
				// Market case
				case 5:
					result = "unrelate";
					break;
				// Office case
				case 6:
					result = "win";
					break;
				// Snow case
				case 7:
					result = "loss";
					break;
				// Scholarship case
				case 8:
					result = "unrelate";
					break;
				// Parking case
				case 9:
					result = "multiply";
					break;
				// GPA case
				case 10:
					result = "unrelate";
					break;
				// Domino's case
				case 11:
					result = "win";
					break;
				// Prof case
				case 12:
					result = "win";
			}
			break;
			
		// GPA case
		case 10:
			// Inner switch
			switch(AICard) {
				// Exam case
				case 0:
					result = "multiply";
					break;
				// Freshman case
				case 1:
					result = "win";
					break;
				// Senior case
				case 2:
					result = "win";
					break;
				// Debt case
				case 3:
					result = "multiply";
					break;
				// Dog case
				case 4:
					result = "loss";
					break;
				// Market case
				case 5:
					result = "loss";
					break;
				// Office case
				case 6:
					result = "loss";
					break;
				// Snow case
				case 7:
					result = "loss";
					break;
				// Scholarship case
				case 8:
					result = "win";
					break;
				// Parking case
				case 9:
					result = "unrelate";
					break;
				// GPA case
				case 10:
					result = "multiply";
					break;
				// Domino's case
				case 11:
					result = "loss";
					break;
				// Prof case
				case 12:
					result = "multiply";
			}
			break;
			
		// Domino's case
		case 11:
			// Inner switch
			switch(AICard) {
				// Exam case
				case 0:
					result = "win";
					break;
				// Freshman case
				case 1:
					result = "multiply";
					break;
				// Senior case
				case 2:
					result = "multiply";
					break;
				// Debt case
				case 3:
					result = "win";
					break;
				// Dog case
				case 4:
					result = "loss";
					break;
				// Market case
				case 5:
					result = "win";
					break;
				// Office case
				case 6:
					result = "multiply";
					break;
				// Snow case
				case 7:
					result = "multiply";
					break;
				// Scholarship case
				case 8:
					result = "multiply";
					break;
				// Parking case
				case 9:
					result = "loss";
					break;
				// GPA case
				case 10:
					result = "win";
					break;
				// Domino's case
				case 11:
					result = "multiply";
					break;
				// Prof case
				case 12:
					result = "unrelate";
			}
			break;
			
		// Prof case
		case 12:
			// Inner switch
			switch(AICard) {
				// Exam case
				case 0:
					result = "multiply";
					break;
				// Freshman case
				case 1:
					result = "win";
					break;
				// Senior case
				case 2:
					result = "win";
					break;
				// Debt case
				case 3:
					result = "multiply";
					break;
				// Dog case
				case 4:
					result = "loss";
					break;
				// Market case
				case 5:
					result = "unrelate";
					break;
				// Office case
				case 6:
					result = "win";
					break;
				// Snow case
				case 7:
					result = "loss";
					break;
				// Scholarship case
				case 8:
					result = "unrelate";
					break;
				// Parking case
				case 9:
					result = "loss";
					break;
				// GPA case
				case 10:
					result = "multiply";
					break;
				// Domino's case
				case 11:
					result = "unrelate";
					break;
				// Prof case
				case 12:
					result = "multiply";
			}
	}
	
	useResult();
}

// This handles what a result actually does
function useResult() {
	ctx.font = "20px Helvetica";
	ctx.textAlign = "left";
	ctx.fillStyle = "rgba(75, 0, 0, 1)";
	
	// Affects the screen and stats
	switch(result) {
		// Degrades AI HP
		case "win":
			ctx.fillRect(0, 0, 290, 32);
			ctx.fillStyle = "Gold";
			theirHP -= betAmount;
			ctx.fillText("Their HP: " + theirHP, 25, 30);
			bet();
			break;
		// Degrades User HP
		case "loss":
			ctx.fillRect(0, 860, 290, 40);
			ctx.fillStyle = "Gold";
			yourHP -= betAmount;
			ctx.fillText("Your HP: " + yourHP, 25, 880);
			bet();
			break;
		// Doubles Bet Amount
		case "multiply":
			ctx.fillStyle = "Gold";
			betAmount = betAmount * 2;
			takeTurn();
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
			bet();
	}
}