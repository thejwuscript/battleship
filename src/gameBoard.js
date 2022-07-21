function GameBoard() {
  let grid = new Array(10).fill(null).map(() => new Array(10).fill(null));

  return {
    getGrid: () => grid,
  }
}

export default GameBoard;