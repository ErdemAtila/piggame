'use strict';

// declaring variables
let player1CurrentPoints = 0;
let player1TotalPoints = 0;
let player2CurrentPoints = 0;
let player2TotalPoints = 0;

let activePlayer = 'player-1';
let isFinished = false;

function resetStartingValues() {
    player1CurrentPoints = 0;
    player1TotalPoints = 0;
    player2CurrentPoints = 0;
    player2TotalPoints = 0;

    activePlayer = 'player-1';
    isFinished = false;
}


// declaring HTML elements
let player1CurrentScoreElement = document.querySelector('#current--0');
let player1TotalScoreElement = document.querySelector('#score--0');
let player1SectionElement = document.querySelector('section.player--0');
let player2CurrentScoreElement = document.querySelector('#current--1');
let player2TotalScoreElement = document.querySelector('#score--1');
let player2SectionElement = document.querySelector('section.player--1');
let diceElement = document.querySelector('.dice');


// 'Roll Dice' button
function rollDice() {
    if (!isFinished) {

        let diceNumber = Math.ceil(Math.random()*6); // randoming dice number with random number

        if(diceElement.classList.contains('hidden')) {
            diceElement.classList.remove('hidden');
        }
        
        diceElement.src = 'dice-'+ diceNumber + '.png'; // assigning dice image with 'diceNumber' variable 

        if(diceNumber != 1) { // player keep continue playing
            if(activePlayer == 'player-1') {
                player1CurrentPoints += diceNumber; // P1 - adding diceNumber to currentPoint
                player1CurrentScoreElement.innerHTML = player1CurrentPoints; // P1 changing currentpoint in html
            }
            else {
                player2CurrentPoints += diceNumber; // P2 - adding diceNumber to currentPoint
                player2CurrentScoreElement.innerHTML = player2CurrentPoints; // P2 - changing currentpoint in html
            }
        }
        else { // if diceNumber is 1
            if(activePlayer == 'player-1') { // currentPoints will be 0, activePlayer will be changed, html and css files will be manipulated
                player1CurrentPoints = 0;
                player1CurrentScoreElement.innerHTML = player1CurrentPoints; // html file manipulation
                activePlayer = 'player-2';
                player1SectionElement.classList.remove('player--active'); // css file manipulation
                player2SectionElement.classList.add('player--active');
            }
            else {
                player2CurrentPoints = 0;
                player2CurrentScoreElement.innerHTML = player1CurrentPoints;
                activePlayer = 'player-1';
                player1SectionElement.classList.add('player--active');
                player2SectionElement.classList.remove('player--active');
            }
        }
    }

}
document.querySelector('.btn--roll').addEventListener('click', rollDice);

// 'Hold' button
function hold() {
    if (!isFinished) {
        if(activePlayer == 'player-1') {
            player1TotalPoints += player1CurrentPoints; // adding currentPoint to totalPoints
            player1CurrentPoints = 0; // zeroing currentPoint
            player1CurrentScoreElement.innerHTML = player1CurrentPoints; // manipulating current and total Scores elements in html
            player1TotalScoreElement.innerHTML = player1TotalPoints;

            if(player1TotalPoints >= 100) { 
                player1SectionElement.classList.remove('player--active');
                player1SectionElement.classList.add('player--winner');
                isFinished = true;
                diceElement.classList.add('hidden');
            }
            else {
                activePlayer = 'player-2';
                player1SectionElement.classList.remove('player--active');
                player2SectionElement.classList.add('player--active');
            }

        }
        else {
            player2TotalPoints += player2CurrentPoints;
            player2CurrentPoints = 0;
            player2CurrentScoreElement.innerHTML = player2CurrentPoints;
            player2TotalScoreElement.innerHTML = player2TotalPoints;

            if(player2TotalPoints >= 100) {
                player2SectionElement.classList.remove('player--active');
                player2SectionElement.classList.add('player--winner');
                isFinished = true;
                diceElement.classList.add('hidden');
            }
            else {
                activePlayer = 'player-1';
                player2SectionElement.classList.remove('player--active');
                player1SectionElement.classList.add('player--active');
            }

            activePlayer = 'player-1';
            player2SectionElement.classList.remove('player--active');
            player1SectionElement.classList.add('player--active');
        }
    }
}
document.querySelector('.btn--hold').addEventListener('click', hold);

// new game button
function newGame() {
    player1CurrentPoints = 0;
    player1TotalPoints = 0;
    player2CurrentPoints = 0;
    player2TotalPoints = 0;

    player1TotalScoreElement.innerHTML = player1TotalPoints;
    player1CurrentScoreElement.innerHTML = player1CurrentPoints;
    player2TotalScoreElement.innerHTML = player2TotalPoints;
    player2CurrentScoreElement.innerHTML = player2CurrentPoints;

    diceElement.classList.add('hidden');

    if(player1SectionElement.classList.contains('player--winner')) {
        player1SectionElement.classList.remove('player--winner');
        player1SectionElement.classList.add('player--active');
    }
    else if(player2SectionElement.classList.contains('player--winner')) {
        player2SectionElement.classList.remove('player--winner');
        player1SectionElement.classList.add('player--active');
    }
    else if (activePlayer != 'player-1') {
        player2SectionElement.classList.remove('player--active');
        player1SectionElement.classList.add('player--active');
    }

    activePlayer = 'player-1';
    isFinished = false;
}
document.querySelector('.btn--new').addEventListener('click', newGame);

