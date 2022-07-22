function Player() {
  return {
    attack(gameBoard, location) {
      gameBoard.receiveAttack(location);
    }
  }
};

export default Player;