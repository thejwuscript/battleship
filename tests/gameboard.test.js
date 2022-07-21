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
    it('places a Battleship on the game board horizontally at a location', () => {
      const ship = jest.fn((name) => {
        return {
          getName: () => name,
          getLength: () => 4,
        }
      });
      const location = 'B5';
      const orientation = 'horizontal';
      gameBoard.placeShip(ship('Battleship'), location, orientation);
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

    it('places a Battleship on the game board vertically at a location', () => {
      const ship = jest.fn((name) => {
        return {
          getName: () => name,
          getLength: () => 4,
        }
      })
      const location = 'C2';
      const orientation = 'vertical';
      gameBoard.placeShip(ship('Battleship'), location, orientation);
      expect(gameBoard.getGrid()).toEqual([
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, 'Battleship0', null, null, null, null, null, null, null],
        [null, null, 'Battleship1', null, null, null, null, null, null, null],
        [null, null, 'Battleship2', null, null, null, null, null, null, null],
        [null, null, 'Battleship3', null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
      ])
      
    })
  })
});