var game;
var interval;

$(document).ready(function() {

  game = new Minesweeper();

  $('.face').on('click', function() {
    game.newGame();
  });

  $('.cell').on('mousedown', function(e) {
    if (e.which === 1) { //left click
      game.clickCell(this);
    }
    if (e.which === 3) { //right click
      game.flagMine(this);
    }
  });

  game.newGame();
  showMineCount(leftZeroPadder(game.totalMines));

});

function startTimer() {
  var timerDisplay = document.querySelector('.timeticker');
  var counter = -1; //smoother ui experience with new game

  clearInterval(interval);

  interval = setInterval(function() {
    counter += 1;
    if (counter === 999) {
      clearInterval(interval);
    }
    timerDisplay.textContent = leftZeroPadder(counter);
  }, 1000);
}

function leftZeroPadder(number) {
  if (number >= 10 && number <= 99) return '0' + number;
  if (number < 10) return '00' + number;
  return number;
}

function showMineCount(totalMines) {
  var minesLeftDisplay = document.querySelector('.minesleft');
  minesLeftDisplay.textContent = totalMines;
}

/*
function chooseDifficulty(difficulty) {
  if (difficulty === 'hard') {
    game.rows = 40;
    game.columns = 40;

  }
  if (difficulty === 'medium') {
    game.rows = 25;
    game.columns = 25;
  }
  if (difficulty === 'easy') {
    game.rows = 10;
    game.columns = 10;
  }
}*/
