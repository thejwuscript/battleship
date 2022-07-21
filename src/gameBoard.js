function GameBoard() {
  let grid = new Array(10).fill(null).map(() => new Array(10).fill(null));

  return {
    getGrid: () => grid,
    placeShip: (ship, location, orientation) => {
      const [col, row] = location.split(''); // ['B', '5']
      const rowIndex = parseInt(row) - 1 // 4
      const colIndex = col.toUpperCase().charCodeAt(0) - 65 // 1
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
  }
}

export default GameBoard;