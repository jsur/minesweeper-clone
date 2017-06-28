var game;

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

  game.createRandomMinePositions();
  //start timer here

});
