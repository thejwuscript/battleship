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

  const shuffleLocations = () => {
    locations.sort(() => Math.random() - 0.5);
  };

  const chooseLocation = function () {
    shuffleLocations();
    const chosen = locations.pop();
    attackedLocations.push(chosen);
    return chosen;
  };

  return { chooseLocation, getLocations };
}

export default AIPlayer;
