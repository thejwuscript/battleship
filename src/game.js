import AIPlayer from "../src/aiPlayer";
import GameBoard from "../src/gameBoard";
import Player from "../src/player";
import domInteraction from "./domInteraction";

const Game = (() => {
  const humanBoard = GameBoard();
  const aiBoard = GameBoard();
  const humanPlayer = Player(aiBoard);
  const aiPlayer = AIPlayer(humanBoard);
  let currentPlayer = humanPlayer;

  const gameOver = () => { humanBoard.allShipsSunk() || aiBoard.allShipsSunk() }

  const play = () => {
    Object.values(humanBoard.getShips()).forEach((ship, index) => {
      humanBoard.placeShip(ship, [index, index], "horizontal");
    });

    Object.values(aiBoard.getShips()).forEach((ship, index) => {
      aiBoard.placeShip(ship, [index, index], "vertical");
    });

    const humanGridDiv = document.querySelector(".human-grid");
    const aiGridDiv = document.querySelector(".ai-grid");
   
    domInteraction.displayGrid(humanBoard.getGrid(), humanGridDiv);
    domInteraction.displayGrid(aiBoard.getGrid(), aiGridDiv);

    //domInteraction.addListeners(humanPlayer, aiGridDiv);
    domInteraction.aiMove(aiPlayer, aiGridDiv);
    domInteraction.hitOrMiss(aiBoard, aiGridDiv);
    // aiGridDiv.childNodes.forEach(cellDiv => {
    //   cellDiv.addEventListener('click', () => {
    //     gameOver();
    //   }, { once: true });
    // });
  };

 

  return { play };
})();

export default Game;
