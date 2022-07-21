import GameBoard from '../src/gameBoard'

describe('GameBoard factory', () => {
  let gameBoard;

  beforeEach(() => {
    gameBoard = GameBoard();
  });

  it('creates a game board with a grid of 10x10', () => {
    expect(gameBoard.getGrid()).toEqual([
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null]
    ]);
  });

  describe('placeShip', () => {
    it('places a ship on the game board', () => {
      // mock a ship
      const ship = jest.fn((name) => {
        return {
          getName: () => name,
          getLength: () => 4,
        }
      });
      // specify a location on the grid
      const location = 'B5';
      // specify the orientation whether it is horizontal or vertical
      const orientation = 'horizontal';
      // call placeShip
      gameBoard.placeShip(ship('Battleship'), location, orientation);
      // check if the ship is placed on the grid
      expect(gameBoard.getGrid()).toEqual([
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, 'Battleship0', 'Battleship1', 'Battleship2', 'Battleship3', null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null]
      ]);
    });
  })
});