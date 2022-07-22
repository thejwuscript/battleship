function Player(gameBoard) {
  return {
    attack(location) {
      gameBoard.receiveAttack(location);
    }
  }
};

export default Player;