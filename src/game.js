import AIPlayer from '../src/aiPlayer';
import GameBoard from '../src/gameBoard';
import Player from '../src/player';

const game = (() => {
  const humanBoard = GameBoard();
  const aiBoard = GameBoard();
  const humanPlayer = Player(humanBoard);
  const aiPlayer = AIPlayer(aiBoard);

  Object.values(humanBoard.getShips()).forEach((ship, index) => {
    humanBoard.placeShip(ship, [index, index], 'horizontal');
  })

  Object.values(aiBoard.getShips()).forEach((ship, index) => {
    aiBoard.placeShip(ship, [index, index], 'vertical');
  });

  return {}
})();