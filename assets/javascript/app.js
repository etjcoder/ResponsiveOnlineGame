console.log("The javascript is linked")

document.addEventListener("DOMContentLoaded", event => {

///// CREATE VARIABLES /////
var playerOneActive = false;
var playerTwoActive = false;
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

// Initialize Firebase
// This is the code we copied and pasted from our app page
var firebaseConfig = {
    apiKey: 'AIzaSyDU1ZW-gZ0piJWBDmZT5dEhVeB-v5P5w0A',
    authDomain: 'evanRPSonlineproject.firebaseapp.com',
    databaseURL: 'https://evanRPSonlineproject.firebaseio.com',
    projectId: 'evanRPSonlineproject',
    storageBucket: '',
    // messagingSenderId: '893336609914',
    // appId: '1:893336609914:web:21a305b4f0cd4746',
};

firebase.initializeApp(firebaseConfig);


// ================================================================================
// Assigning database variable as well as connections child folder and connections tracker aka .info/connect
// ================================================================================
// Get a reference to the database service
var database = firebase.database();

// This creates a reference location where we will store connections
var connectionsRef = database.ref("/connections");

//'.info/connected' is a firebase special location that is updated whenever the client connection state changes, it is a boolean value
var connectedRef = database.ref(".info/connected");

// When there is a value change in info/connected aka connectedRef
connectedRef.on("value", function(snap) {

// If they are connected
if (snap.val()) {
    //add User to connections list
    var con = connectionsRef.push(true);
    //remove User from connections list when logged off
    con.onDisconnect().remove();
    
}

});

// ========================================================================
// Firebase Authentication code
// ========================================================================

var auth = firebase.auth();
var user = firebase.auth().currentUser;
console.log(auth);
console.log(user);


// user.updateProfile({
//     displayName: "Evan J. Cleary",
// }).then(function(){
//     console.log("Update successful")
// }).catch(function(){
//     console.log("There was an error");
// });


// console.log(user.displayName);
// $("#display-name").text(user.displayName);

//
//This will sign in an existing user and return a promise you can use to resolve that user
// auth.signInWithEmailAndPassword(email, pass); 

//This will create a user with an email and password.
// auth.createUserWithEmailAndPassword(email, pass);

//If someone logs in this firebaseUser paramater will be filled, but if the user logs out it will show as null
// auth.onAuthStateChanged(firebaseUser => {});

//Getting Elements
var txtEmail = document.getElementById("txtEmail");
var txtPassword = document.getElementById("txtPassword");
var btnLogin = document.getElementById("btnLogin");
var btnSignUp = document.getElementById("btnSignUp");
var btnLogout = document.getElementById("btnLogout");
var googleLogin = document.getElementById("googleLogin");
 
//Add Login Event
btnLogin.addEventListener('click', e=> {
     //Get email and password from user inputs
         var email = txtEmail.value;
         var pass = txtPassword.value;
         var auth = firebase.auth();
    //Sign In 
          var promise = auth.signInWithEmailAndPassword(email, pass);
         promise.catch(e => console.log(e.message));


})

googleLogin.addEventListener('click', e=> {
    function googleLogin() {
        var provider = new firebase.auth.GoogleAuthProvider();
    
        firebase.auth().signInWithPopup(provider)
        .then(result => {
            var user = result.user;
            console.log(`Hello ${user.displayName}`);
            console.log(user)
        }).catch(console.log)
    }
    googleLogin();
    
    
})



//Sign up a new user
btnSignUp.addEventListener('click', e => {
    //Get email and password from user inputs
    //TODO: Check 4 Real Emailz
    var email = txtEmail.value;
     var pass = txtPassword.value;
    //  var auth = firebase.auth();
     //Create User
     firebase.auth().createUserWithEmailAndPassword(email, pass)
     .then(
         (user) => {
         user.updateProfile({
             displayName: "Evan Cleary"
         
            }).then(
                (s)=> {console.log(displayName)}
            ).
            
            catch(function(error) {
             console.log(error);
         })
     })





    //  promise.catch(e => console.log(e.message));
})

//Logout function
btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
})

// console.log(user.displayName);
//Add a realtime listener for authentication
// firebase.auth().onAuthStateChanged(firebaseUser => {
//     if(firebaseUser) {
//         console.log(firebaseUser);
//     } else {
//         console.log("not logged in")
//     }
// })

//Setting an authentication state observer and getting user data
firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
        console.log("User is signed in");
        console.log(user);
        var displayName = user.displayName;
        var email = user.email;
        var uid = user.uid;
        var providerData = user.providerData;
    } else {
        console.log("User is signed out")
    }
});



//==================================================================

connectionsRef.on("value", function(snap) {
    
        // Display viewer count in the console log
        //This is really just a placeholder event listener for when we need to build out functions ofr the user
        console.log(snap.numChildren());
        if (snap.numChildren() === 1) {
            $("#data-feed").append("One player is in the lobby!" + "<br>")
            playerOneActive = true;
            
    $("#p1-login").text(" " + playerOneActive);
    $("#p2-login").text(" " + playerTwoActive);
        } else if (snap.numChildren() === 2 ) {
            $("#data-feed").append("Two players are in the lobby!" + "<br>")
            $("#data-feed").append("You are ready to play!" + "<br>");
            playerOneActive = true;
            playerTwoActive = true;
            
    $("#p1-login").text(" " + playerOneActive);
    $("#p2-login").text(" " + playerTwoActive);
        } else {
            console.log("Too many players in the game!");
            playerOneActive = false;
            playerTwoActive = false;
            
    $("#p1-login").text(" " + playerOneActive);
    $("#p2-login").text(" " + playerTwoActive);
        }
});
//=======================================================
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
    if (playerOneOption === "x") {
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

//NEXT STEPS

// Create a Chat Box
// Sync users to an Authenticator
// Apply the text saying "Player 1/Player2 has entered/exited" to say "Username1/Username2 has entered/exited"
// Make it so that the users can press the same keys










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
});