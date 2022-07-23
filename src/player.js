function Player(enemyBoard) {
  return {
    attack(location) {
      enemyBoard.receiveAttack(location);
    }
  }
};

export default Player;