context = describe;
var game = new Minesweeper();

describe("Minesweeper constructor functions", function() {

  console.log('meni tänne');
  describe("hasMinesNearby return true values | ", function() {
    it("Above given x,y and has class has-mine", function() {
      expect(game.hasMinesNearby(5,5)).toBeTruthy();
    });
    it("Above and right of given x,y and has class has-mine", function() {
      expect(game.hasMinesNearby(1,6)).toBeTruthy();
    });
    it("Above and left of given x,y and has class has-mine", function() {
      expect(game.hasMinesNearby(4,6)).toBeTruthy();
    });
    it("Left of given x,y and has class has-mine", function() {
      expect(game.hasMinesNearby(6,5)).toBeTruthy();
    });
    it("Right of given x,y and has class has-mine", function() {
      expect(game.hasMinesNearby(1,1)).toBeTruthy();
    });
    it("Below given x,y and has class has-mine", function() {
      expect(game.hasMinesNearby(6,1)).toBeTruthy();
    });
    it("Below and right given x,y and has class has-mine", function() {
      expect(game.hasMinesNearby(8,4)).toBeTruthy();
    });
    it("Below and left given x,y and has class has-mine", function() {
      expect(game.hasMinesNearby(3,9)).toBeTruthy();
    });
  });
});
