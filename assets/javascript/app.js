console.log("The javascript is linked")



///// CREATE VARIABLES /////
var playerOneActive = true;
var playerTwoActive = true;
///
var playerOneTurn = true;
var playerTwoTurn = false;
///
var liveData
///
var playerOneOption
var playerTwoOption
var winnerDisplay
///
var player1Wins = 0;
var player1Ties = 0;
var player1Losses = 0;
///
var player2Wins = 0;
var player2Ties = 0;
var player2Losses = 0;
///

var pleaseWait = "Please wait player!";
var yourTurn1 = "Your turn, player! Press X, Y or Z";
var yourTurn2 = "Your turn, player! Press A, B or C";

///




function initializeValues() {

    $("#p1-login").text(" " + playerOneActive);
    $("#p2-login").text(" " + playerTwoActive);

    $("#player-1-text").text(yourTurn1);
    $("#player-2-text").text(pleaseWait);

    console.log(playerOneActive);
    console.log(playerTwoActive);
    console.log("Player one is up: " + playerOneTurn);
    console.log("Player two is up: " + playerTwoTurn);

    updateScores();
}


function updateScores() {
    console.log("The Scores have been updated")
    $("#player1-wins-text").text(player1Wins);
    $("#player2-wins-text").text(player2Wins);
    $("#player1-losses-text").text(player1Losses);
    $("#player2-losses-text").text(player2Losses);
    $("#player1-ties-text").text(player1Ties);
    $("#player2-ties-text").text(player2Ties);
    playerOneTurn = true;
    $("#player-1-text").text(yourTurn1);
    return playerOneTurn;

    };

function displayOption1() {
    if (playerOneOption === "x"){
        $("#winning-choice").text("Player 1 Won with Rock!")
    }
    else if (playerOneOption === "y") {
        $("#winning-choice").text("Player 1 Won with Paper!")
    } 
    else if (playerOneOption === "z") {
        $("#winning-choice").text("Player 1 Won with Scissors!")
    }
};

function displayOption2() {
    if (playerTwoOption === "a") {
        $("#winning-choice").text("Player 2 Won with Rock!")
    } 
    else if (playerTwoOption === "b") {
        $("#winning-choice").text("Player 2 Won with Paper!")
    } else if (playerTwoOption === "c") {
        $("#winning-choice").text("Player 2 Won with Scissors!")
    }
}



document.onkeyup = function (event) {

    userGuess = event.key;
    console.log(userGuess);

    if ((playerOneActive === true) && (playerTwoActive === true)) {
        if ((playerOneTurn === true) || (playerTwoTurn === true)) {

            if (playerOneTurn === true) {
                if ((userGuess === "x") || (userGuess === "y") || (userGuess === "z")) {
                    playerOneOption = userGuess;
                    playerOneTurn = false;
                    playerTwoTurn = true;
                    console.log("Player one has chosen:" + playerOneOption);
                    console.log("Player one is up:" + playerOneTurn);
                    $("#player-1-text").text(pleaseWait);
                    $("#player-2-text").text(yourTurn2);
                    $("#winning-choice").text("");
                    $("#rps-result").text("");
                }
            } else {
                if ((userGuess === "a") || (userGuess === "b") || (userGuess === "c")) {
                    playerTwoOption = userGuess;
                    playerTwoTurn = false;
                    console.log("Player two has chosen:" + playerTwoOption)
                    console.log("Player two is up:" + playerTwoTurn)
                    $("#player-2-text").text(pleaseWait);
                    runGame();
                }
            }

        }

    }
}

//x is rock //y is paper //z is scissors
//a is rock //b is paper //c is scissors
//x beats c // y beats a // z beats b 
//a beats z // b beats x // c beats y


function runGame() {
    console.log("runGame function has successfully been ran!")
    if ((playerOneTurn === false) && (playerTwoTurn === false)) {
        if (
            ((playerOneOption === "x") && (playerTwoOption === "c")) ||
            ((playerOneOption === "y") && (playerTwoOption === "a")) ||
            ((playerOneOption === "z") && (playerTwoOption === "b"))
        ) {
                player1Wins++;
                player2Losses++;
                console.log("----------------")
                console.log("Player One Wins!")
                console.log("Player One Has won " + player1Wins + " Times!")
                console.log("Player Two Has lost " + player2Losses + " Times!")
                // PlayerOneTurn = true;
                updateScores();
                displayOption1();
                $("#rps-result").text("Player 1 Wins")



        } else if (
            ((playerTwoOption === "a") && (playerOneOption === "z")) ||
            ((playerTwoOption === "b") && (playerOneOption === "x")) ||
            ((playerTwoOption === "c") && (playerOneOption === "y"))
        ) {
                player2Wins++;
                player1Losses++;
                console.log("----------------");
                console.log("Player Two Wins!");
                console.log("Player Two Has won " + player2Wins + " Times!");
                console.log("Player One Has lost " + player1Losses + " Times!");
                // playerOneTurn = true;
                updateScores();
                displayOption2();
                $("#rps-result").text("Player 2 Wins!")
        } else {
                player1Ties++;
                player2Ties++;
                console.log("----------------")
                console.log("Both Players have Tied!")
                console.log("Player One Has tied " + player1Ties + " Times!");
                console.log("Player Two Has Tied " + player2Ties + " Times!");
                // playerOneTurn = true;
                updateScores();
                $("#rps-result").text("Both Players have tied!")
        }
    }
};
// //// CREATE FUNCTIONS ///////

//player1 options will be x, y, z
//player2 options will be a, b, c

//if player 1 hits x then his chosen value is rock
//if player 1 hits y then his chosen value is paper
//if player 1 hits z then his chosen value is scissors
//////////////////////////////////////////////////////////lockin player
//display value




//if player 2 hits a then his chosen value is rock
//if player 2 hits b then his chosen value is paper
//if player 2 hits c then his chosen value is scissors
/////////////////////////////////////////////////////////lockin player
//display value


//Compare player 1 choice versus player 2 choice
//display winner and options chosen
//increment player score based on the options
//display those scores into the div




//This will be a simple Firebase initializer


//This will be a test of the firebase initializer

initializeValues();
