import GameBoard from '../src/gameBoard'
import Ship from '../src/ship'

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
      const location = [4, 1];
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
      const location = [1, 2];
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

  describe('receiveAttack', () => {
    describe('when the location is empty', () => {
      it('records the location of the missed shot', () => {
        gameBoard.getGrid = jest.fn().mockReturnValue([
          [null, null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null, null],
          [null, null, null, null, 'Destroyer0', 'Destroyer1', 'Destroyer2', null, null, null],
          [null, null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null, null]
        ]);
        const locationOne = [6, 3];
        const locationTwo = [2, 2];
        gameBoard.receiveAttack(locationOne);
        gameBoard.receiveAttack(locationTwo);
        expect(gameBoard.getMissedShots()).toEqual([locationOne, locationTwo]);
      })
    })

    describe('when the location is a ship', () => {
      it('sends a hit message to the ship with an index of the hit location', () => {
        let ship = gameBoard.getShips().Destroyer;
        gameBoard.getGrid = jest.fn().mockReturnValue([
          [null, null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null, null],
          [null, null, null, null, 'Destroyer0', 'Destroyer1', 'Destroyer2', null, null, null],
          [null, null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null, null, null]
        ]);
        const location = [3, 5];
        let spy = jest.spyOn(ship, 'hit');
        gameBoard.receiveAttack(location);
        expect(spy).toHaveBeenCalledWith(1);
      })
    })
  })

  describe('allShipsSunk', () => {
    it('returns true if all ships are sunk', () => {
      const ships = gameBoard.getShips();

      ships.Carrier.isSunk = jest.fn().mockReturnValue(true);
      ships.Battleship.isSunk = jest.fn().mockReturnValue(true);
      ships.Submarine.isSunk = jest.fn().mockReturnValue(true);
      ships.Destroyer.isSunk = jest.fn().mockReturnValue(true);
      ships["Patrol Boat"].isSunk = jest.fn().mockReturnValue(true);

      expect(gameBoard.allShipsSunk()).toBe(true);
    })

    it('returns false if one or more ships are not sunk', () => {
      const ships = gameBoard.getShips();

      ships.Carrier.isSunk = jest.fn().mockReturnValue(true);
      ships.Battleship.isSunk = jest.fn().mockReturnValue(false);
      ships.Submarine.isSunk = jest.fn().mockReturnValue(true);
      ships.Destroyer.isSunk = jest.fn().mockReturnValue(true);
      ships["Patrol Boat"].isSunk = jest.fn().mockReturnValue(true);

      expect(gameBoard.allShipsSunk()).toBe(false);
    })
  })
});