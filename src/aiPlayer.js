function AIPlayer(gameBoard) {
  const locations = gameBoard
    .getGrid()
    .map((row, rowIndex) => {
      return row.map((cell, columnIndex) => {
        return [rowIndex, columnIndex];
      });
    })
    .flat();

  const attackedLocations = [];

  const getLocations = () => locations;

  const chooseLocation = function () {
    shuffleLocations();
    const chosen = locations.pop();
    attackedLocations.push(chosen);
    return chosen;
  };

  const shuffleLocations = () => {
    locations.sort(() => Math.random() - 0.5);
  };

  const attack = () => {
    const chosenLocation = chooseLocation();
    gameBoard.receiveAttack(chosenLocation);
  }

  return { chooseLocation, getLocations, attack };
}

export default AIPlayer;
