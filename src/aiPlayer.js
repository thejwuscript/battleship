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

  const getLastAttackedLocation = () => attackedLocations[attackedLocations.length - 1];

  const chooseLocation = function () {
    shuffleLocations();
    const chosen = locations.pop();
    storeAttackedLocation(chosen)
    return chosen;
  };

  const storeAttackedLocation = (location) => {
    attackedLocations.push(location);
  }

  const shuffleLocations = () => {
    locations.sort(() => Math.random() - 0.5);
  };

  const attack = () => {
    const chosenLocation = chooseLocation();
    gameBoard.receiveAttack(chosenLocation);
  }

  return { chooseLocation, getLocations, attack, getLastAttackedLocation };
}

export default AIPlayer;
