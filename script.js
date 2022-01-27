'use strict';

//select the classes and ids of the respective fields
const playerOneScore = document.querySelector('#score--0');
const playerTwoScore = document.getElementById('score--1');
const rollDice = document.querySelector('.btn--roll');
const holdDice = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');
const diceCuboid = document.querySelector('.dice');
const currentOneScore = document.getElementById('current--0');
const currentTwoScore = document.getElementById('current--1');
const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');


//create initial values of players and set them to zero 
playerOneScore.textContent = 0;
playerTwoScore.textContent = 0;

let scores, currentScore, activePlayer, stillPlaying;

//create a function that initializes the variables
const initializeVariables = () => {
    // console.log(`I am clicked`);
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    stillPlaying = true;

    currentOneScore.textContent = 0;
    currentTwoScore.textContent = 0;
    playerOneScore.textContent = 0;
    playerTwoScore.textContent = 0;
  
    diceCuboid.classList.add('hidden');
    playerOne.classList.add('player--active');
    playerTwo.classList.remove('player--active');
    playerOne.classList.remove('player--winner');
    playerTwo.classList.remove('player--winner');
   
}

//create a function that switches the players
const switchPlayer = function () {
    currentOneScore.textContent = 0;
    currentTwoScore.textContent = 0;
    currentScore = 0;
    //assign a dynamic value of 0 or 1 to the active player
    activePlayer = activePlayer === 0 ? 1 : 0;
    // console.log(activePlayer);
    playerOne.classList.toggle('player--active');
    playerTwo.classList.toggle('player--active');
}


//set initial visibility of dice to be hidden before rolling the dice
diceCuboid.classList.add('hidden');

rollDice.addEventListener(('click'), function () {
    if (stillPlaying) {
        //create the dice random selections
        const diceRandomNumber = Math.trunc(Math.random() * 6) + 1;
        // console.log(diceRandomNumber);
        diceCuboid.classList.remove('hidden');

        //display the image correponding to the random number
        diceCuboid.src = `dice-${diceRandomNumber}.png`
            if (diceRandomNumber !== 1) {
                // currentScore = currentScore + diceRandomNumber ;
                currentScore += diceRandomNumber;
                // console.log(currentScore);
                document.getElementById(`current--${activePlayer}`).textContent = currentScore;

                // console.log(`the player score is ${scores[activePlayer]}`);
            } else {
                switchPlayer();
            }
            // console.log(currentScore);
            // console.log(currentOneScore.textContent, currentTwoScore.textContent);
        }
    
});

holdDice.addEventListener(('click'), function () {

    if (stillPlaying) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 20) {
            stillPlaying = false;
            diceCuboid.classList.add('hidden');
            // document.querySelector(`.player--${activePlayer}`).classList.add('player--won--color');
            // document.getElementById(`name--${activePlayer}`).textContent = `Player ${activePlayer + 1} has won the game`;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            // document.getElementById(`score--${activePlayer}`).textContent = currentScore;
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            switchPlayer();
        }
    }
});

newGame.addEventListener(('click'), initializeVariables);

