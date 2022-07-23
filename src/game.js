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

  const randomNumber = (max) => Math.floor(Math.random() * max);

  const randomOrientation = () => {
    const orientations = ["horizontal", "vertical"];
    return orientations[randomNumber(2)];
  }
  
  const gameOver = () => {
    return (humanBoard.allShipsSunk() || aiBoard.allShipsSunk())
  }

  const play = () => {
    Object.values(humanBoard.getShips()).forEach((ship, index) => {
      let location
      let orientation 
      while (true) {
        orientation = randomOrientation();
        let randomArray = [randomNumber(9), randomNumber(9)];
        location = humanBoard.validateLocation(randomArray, ship.getLength(), orientation)
        if (location) break;
      }
      humanBoard.placeShip(ship, location, orientation);
      //humanBoard.placeShip(ship, [index + 1, Math.floor(Math.random() * 5)], "horizontal");
    });

    Object.values(aiBoard.getShips()).forEach((ship, index) => {
      let location
      let orientation 
      while (true) {
        orientation = randomOrientation();
        let randomArray = [randomNumber(9), randomNumber(9)];
        location = aiBoard.validateLocation(randomArray, ship.getLength(), orientation)
        if (location) break;
      }
       // while true
       // orientation = randomOrientation()
      // let randomArray = [randomNumber(9), randomNumber(9)]
      // location = aiBoard.validateLocation(randomArray, ship.getLength(), orientation)
      // if location is false then continue, else break

      //aiBoard.placeShip(ship, [index + 1, Math.floor(Math.random() * 5)], "vertical");
      aiBoard.placeShip(ship, location, orientation);
    });

    const humanGridDiv = document.querySelector(".human-grid");
    const aiGridDiv = document.querySelector(".ai-grid");
   
    domInteraction.displayGrid(humanBoard.getGrid(), humanGridDiv);
    domInteraction.displayGrid(aiBoard.getGrid(), aiGridDiv);
    
    aiGridDiv.childNodes.forEach(coordinateDiv => {
      coordinateDiv.addEventListener('click', (e) => {
        const location = coordinateDiv.dataset.location.split(",");
        humanPlayer.attack(location);
        if (aiBoard.getGrid()[location[0]][location[1]] === null) {
          coordinateDiv.classList.add("empty", "attacked");
        } else if (typeof aiBoard.getGrid()[location[0]][location[1]] === "string") {
          coordinateDiv.classList.add("occupied", "attacked");
        }
        if (gameOver()) {
          setTimeout(() => alert("You win!"), 0);
          aiGridDiv.style.pointerEvents = "none";
        } else {
          aiPlayer.attack();
          const aiLocation = aiPlayer.getLastAttackedLocation()
          humanGridDiv.querySelector(`[data-location="${aiLocation[0]},${aiLocation[1]}"]`).classList.add("attacked");
          if (gameOver()) {
            setTimeout(() => alert("You lose!"), 0);
            aiGridDiv.style.pointerEvents = "none";
          }
        }
      }, {once: true})
    })

    //domInteraction.addListeners(humanPlayer, aiGridDiv);
    // domInteraction.aiMove(aiPlayer, aiGridDiv);
    // domInteraction.hitOrMiss(aiBoard, aiGridDiv);
    // aiGridDiv.childNodes.forEach(cellDiv => {
    //   cellDiv.addEventListener('click', () => {
    //     gameOver();
    //   }, { once: true });
    // });
  };

  return { play };
})();

export default Game;
