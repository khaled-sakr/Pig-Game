'use strict';
// selectting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let scores,currentScore,activePlayer,playing;
const init = function () {
     scores = [0, 0];
     currentScore = 0;
     activePlayer = 0;
     playing = true;
    score0El.textContent = 0;
    score1El.textContent = 0;
    current1El.textContent = 0;
    current0El.textContent = 0;
    diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  //document .querySelector(`.player--${activePlayer}`)
  // .classList.remove('player--winner');
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// startting a game
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.gemeratting random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2.display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      // add a dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //3. check for rolled 1? switch tha anoter player
      currentScore = 0;
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1]= scores[1]+activePlayer;
    console.log(activePlayer);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // score is at lessest 100
    if (scores[activePlayer] >= 20) {
      // fishish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
      playing = false;
      diceEl.classList.add('hidden');
    } else {
      // switch the another one
      switchPlayer();
    }
  }
});

// btnNew.addEventListener('click',function(){
//     location.reload()
// })
btnNew.addEventListener('click', function () {
  init();
});

document.addEventListener('keydown', function (e) {
  console.log(e);
  if (e.key === 'Escape') {
    init();
  }
});
