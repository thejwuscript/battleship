import Ship from './ship';

function GameBoard() {
  const grid = new Array(10).fill(null).map(() => new Array(10).fill(null));

  const missedShots = [];

  const ships = {
    Carrier: Ship('Carrier'),
    Battleship: Ship('Battleship'),
    Submarine: Ship('Submarine'),
    Destroyer: Ship('Destroyer'),
    "Patrol Boat": Ship('Patrol Boat'),
  }

  const getGrid = () => grid;

  const getMissedShots = () => missedShots;

  const getShips = () => ships;

  const placeShip = (ship, location, orientation) => {
    //location is an array [row, column]
    let [rowIndex, colIndex] = location;
    const length = ship.getLength();
    if (orientation === 'horizontal') {
      for (let i = 0; i < length; i++) {
        grid[rowIndex][colIndex + i] = ship.getName() + i;
      }
    } else {
      for (let i = 0; i < length; i++) {
        grid[rowIndex + i][colIndex] = ship.getName() + i;
      }
    }
  }

  const receiveAttack = function(location) {
    const [rowIndex, colIndex] = location;
    if (this.getGrid()[rowIndex][colIndex] === null) {
      console.log("Miss!");
      this.getMissedShots().push(location);
    } else if (typeof this.getGrid()[rowIndex][colIndex] === 'string') {
      let shipString = this.getGrid()[rowIndex][colIndex];
      let shipName = shipString.split(/(\d+)/)[0];
      let shipIndex = parseInt(shipString.split(/(\d+)/)[1]);
      ships[shipName].hit(shipIndex);
    };
  };

  const allShipsSunk = () => {
    for (let ship in ships) {
      if (ships[ship].isSunk() === false) {
        return false;
      } else {
        continue;
      };
    };
    return true;
  };

  return { getGrid, getShips, getMissedShots, placeShip, receiveAttack, allShipsSunk }
}

export default GameBoard;