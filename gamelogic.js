function Minesweeper() {

  this.points = 0;
  this.minesFlagged = 0;
  this.totalMines = 0;

  for (var row = 0; row < 10; row++) {
    for (var col = 0; col < 10; col++) {
      $('.container').append($('<div>')
        .addClass('cell active')
        .attr('data-row', row)
        .attr('data-col', col)
      );
    }
  }
}

Minesweeper.prototype.newGame = function() {
  //remove unnecessary classes
  $('.cell').removeClass('mine pressed minesnear mine-clicked flag');
  for (var i = 0; i <= 10; i++) {
    $('.cell').removeClass('minesnear-' + i);
  }
  //remove numbers
  $('.cell').html('');
  //all cells must be active
  $('.cell').addClass('active');
  //happy face
  $('.face').removeClass('sad');
  $('.face').addClass('happy');

  this.points = 0;
  this.minesFlagged = 0;
  this.totalMines = 0;
  this.createRandomMinePositions();
  startTimer();
};

Minesweeper.prototype.clickCell = function(elem) {
  $(elem).addClass('pressed');
  var x = parseInt($(elem).attr('data-row'));
  var y = parseInt($(elem).attr('data-col'));
  this.checkClickedCell(x, y);
};

Minesweeper.prototype.checkClickedCell = function(x, y) {

  // CHECK: IS THIS THE FIRST CLICK?

  var selector = '[data-row=' + x + ']' + '[data-col=' + y + ']';

  if ($(selector).hasClass('has-mine')) {
    this.gameOver(selector);

  } else if (this.hasMinesNearby(x, y)) {

    console.log('code branch: has mines near');
    //something else??

  } else {
    $(selector).addClass('pressed');
    $(selector).removeClass('active');

    var adjacentCells = this.getAdjacentCellCoordinates(x, y);
    //go through relevant cells recursively
    adjacentCells.forEach(function(arr) {
      var cell = '[data-row=' + arr[0] + ']' + '[data-col=' + arr[1] + ']';
      if (!$(cell).hasClass('pressed')) {
        this.checkClickedCell(arr[0], arr[1]);
      }
    }.bind(this));
  }
};

Minesweeper.prototype.hasMinesNearby = function(x, y) {

  var minesNear = false;
  var mineCounter = 0;
  var selector = '[data-row=' + x + ']' + '[data-col=' + y + ']';

  //above
  if($('[data-row=' + (x-1) + ']' + '[data-col=' + y + ']').hasClass('has-mine')) {
    mineCounter += 1;
    minesNear = true;
  }
  //above and right
  if($('[data-row=' + (x-1) + ']' + '[data-col=' + (y+1) + ']').hasClass('has-mine')) {
    mineCounter += 1;
    minesNear = true;
  }
  //above and left
  if($('[data-row=' + (x-1) + ']' + '[data-col=' + (y-1) + ']').hasClass('has-mine')) {
    mineCounter += 1;
    minesNear = true;
  }
  //left
  if($('[data-row=' + (x) + ']' + '[data-col=' + (y-1) + ']').hasClass('has-mine')) {
    mineCounter += 1;
    minesNear = true;
  }
  //right
  if($('[data-row=' + (x) + ']' + '[data-col=' + (y+1) + ']').hasClass('has-mine')) {
    mineCounter += 1;
    minesNear = true;
  }
  //below
  if($('[data-row=' + (x+1) + ']' + '[data-col=' + (y) + ']').hasClass('has-mine')) {
    mineCounter += 1;
    minesNear = true;
  }
  //below and right
  if($('[data-row=' + (x+1) + ']' + '[data-col=' + (y+1) + ']').hasClass('has-mine')) {
    mineCounter += 1;
    minesNear = true;
  }
  //below and left
  if($('[data-row=' + (x+1) + ']' + '[data-col=' + (y-1) + ']').hasClass('has-mine')) {
    mineCounter += 1;
    minesNear = true;
  }

  if (mineCounter > 0) this.addCellNumber(mineCounter, selector);

  return minesNear;
};

Minesweeper.prototype.addCellNumber = function(number, selector) {
  $(selector).addClass('minesnear minesnear-' + number);
  $(selector).html(number);
};

Minesweeper.prototype.getAdjacentCellCoordinates = function(x, y) {

  var coordinateArray = [];

  //check all relevant directions
    //above
    if ((x-1) >= 0) coordinateArray.push([x-1, y]);
    //above and right
    if ((x-1) >= 0 && (y+1) < 10) coordinateArray.push([x-1, y+1]);
    //above and left
    if ((x-1) >= 0 && (y-1) >= 0) coordinateArray.push([x-1, y-1]);
    //left
    if ((y-1) >= 0) coordinateArray.push([x, y-1]);
    //right
    if ((y+1) < 10) coordinateArray.push([x, y+1]);
    //below
    if ((x+1 < 10)) coordinateArray.push([x+1, y]);
    //below and right
    if ((x+1) < 10 && (y+1) < 10) coordinateArray.push([x+1, y+1]);
    //below and left
    if ((x+1) < 10 && (y-1) >= 0) coordinateArray.push([x+1, y-1]);

    return coordinateArray;
};

Minesweeper.prototype.createRandomMinePositions = function() {

  //first remove all old mines so that newGame button will work
  $('.cell').removeClass('has-mine');

  for (var row = 0; row < 10; row++) {
    var array = [];
    for (var col = 0; col < 10; col++) {
      array.push(col);
    }
    var randomY = (this.randomNum(array));
    //at least there's one mine on each row
    //maybe I'll make a better algorithm one day
    $('[data-row=' + row + ']' + '[data-col=' + randomY + ']').addClass('has-mine');
    this.totalMines += 1;
  }
};

Minesweeper.prototype.firstClick = function() {
  console.log('first click should move mine positions if necessary');
};

Minesweeper.prototype.gameOver = function(selector) {

  $(selector).addClass('mine mine-clicked');
  var mineCells = document.querySelectorAll('.has-mine');
  mineCells.forEach(function(cell){
    cell.classList.add('mine');
  });
  $('.face').removeClass('happy');
  $('.face').addClass('sad');
  clearInterval(interval);
};

Minesweeper.prototype.winGame = function() {

  if(this.minesFlagged === this.totalMines && this.checkFlaggedMineCoordinates()) {
    alert('You win! Nice!');
  }
};

Minesweeper.prototype.flagMine = function(cell) {

  var x = parseInt($(cell).attr('data-row'));
  var y = parseInt($(cell).attr('data-col'));
  var selector = '[data-row=' + x + ']' + '[data-col=' + y + ']';

  if ($(selector).hasClass('flag')) {
    $(selector).removeClass('flag');
    this.minesFlagged -= 1;
    showMineCount(leftZeroPadder(game.totalMines - this.minesFlagged));
  } else {
    $(selector).addClass('flag');
    this.minesFlagged += 1;
    showMineCount(leftZeroPadder(game.totalMines - this.minesFlagged));
  }

  var timeout = setTimeout(function(){
    this.winGame();
  }.bind(this), 500);

};

Minesweeper.prototype.randomNum = function(arr) {
  return Math.floor(Math.random() * arr.length);
};

Minesweeper.prototype.checkFlaggedMineCoordinates = function() {

  var mines = document.querySelectorAll('.has-mine');
  var win = 0;
  mines.forEach(function(mine) {
    if (mine.classList.contains('flag')) {
      win += 1;
    }
  });

  var gamewon = win === 10 ? true : false;
  return gamewon;

};
