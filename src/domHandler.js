const DomHandler = (() => {
  const humanGridDiv = document.querySelector(".human-grid");
  const aiGridDiv = document.querySelector(".ai-grid");

  const updateAIGrid = (board, location, element) => {
    const cell = board.getGrid()[location[0]][location[1]];
    if (cell === null) {
      element.classList.add("empty", "attacked");
    } else if (typeof cell === "string") {
      element.classList.add("occupied", "attacked");
    };
  };

  const updateHumanGrid = (location) => {
    const element = humanGridDiv.querySelector(`[data-location="${location[0]},${location[1]}"]`);
    element.classList.add("attacked");
  };
  
  const render = (grid, container) => {
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const coordinateDiv = document.createElement("div");
        coordinateDiv.classList.add("coordinate");
        coordinateDiv.dataset.location = `${rowIndex},${colIndex}`;
        if (cell === null && container.classList.contains("human-grid")) {
          coordinateDiv.classList.add("empty");
        } else if (typeof cell === "string" && container.classList.contains("human-grid")) {
          coordinateDiv.classList.add("occupied");
        }
        container.appendChild(coordinateDiv);
      });
    });
  };

  const oneLoop = (e) => {
    const location = e.target.dataset.location.split(",");
    humanPlayer.attack(location);
    if (aiBoard.getGrid()[location[0]][location[1]] === null) {
      e.target.classList.add("empty", "attacked");
    } else if (
      typeof aiBoard.getGrid()[location[0]][location[1]] === "string"
    ) {
      e.target.classList.add("occupied", "attacked");
    }
    if (gameOver()) {
      setTimeout(() => alert("You win!"), 0);
      aiGridDiv.style.pointerEvents = "none";
    } else {
      aiPlayer.attack();
      const aiLocation = aiPlayer.getLastAttackedLocation();
      humanGridDiv
        .querySelector(`[data-location="${aiLocation[0]},${aiLocation[1]}"]`)
        .classList.add("attacked");
      if (gameOver()) {
        setTimeout(() => alert("You lose!"), 0);
        aiGridDiv.style.pointerEvents = "none";
      }
    }
  };

  const addListenersToCoordinates = (callback) => {
    aiGridDiv.childNodes.forEach((coordinateDiv) => {
      coordinateDiv.addEventListener("click", callback, { once: true });
    });
  }

  const announceWinner = (message) => {
    setTimeout(() => alert(message), 0);
    aiGridDiv.style.pointerEvents = "none";
  }

  return { render, addListenersToCoordinates, updateAIGrid, updateHumanGrid, announceWinner };
})();

export default DomHandler;
