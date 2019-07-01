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

    $("#player1-wins-text").text(player1Wins);
    $("#player2-wins-text").text(player2Wins);
    $("#player1-losses-text").text(player1Losses);
    $("#player2-losses-text").text(player2Losses);
    $("#player1-ties-text").text(player1Wins);
    $("#player2-ties-text").text(player1Wins);

    $("#player-1-text").text(yourTurn1);
    $("#player-2-text").text(pleaseWait);

    console.log(playerOneActive);
    console.log(playerTwoActive);
    console.log("Player one is up: " + playerOneTurn);
    console.log("Player two is up: " + playerTwoTurn);

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
                }
            } else {
                if((userGuess === "a") || (userGuess === "b") || (userGuess === "c")) {
                playerTwoOption = userGuess;
                playerTwoTurn = false;
                console.log("Player two has chosen:" + playerTwoOption)
                console.log("Player two is up:" + playerTwoTurn)
            }
        }
    
        }

}
}
//// CREATE FUNCTIONS ///////

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
