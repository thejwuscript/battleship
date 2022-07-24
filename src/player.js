function Player(enemyBoard) {
  return {
    attack(location) {
      enemyBoard.receiveAttack(location, "Enemy");
    }
  }
};

export default Player;