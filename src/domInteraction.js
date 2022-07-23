const domInteraction = (() => {
  const displayGrid = (grid, container) => {
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

  const addListeners = (player, container) => {
    container.childNodes.forEach((coordinateDiv) => {
      coordinateDiv.addEventListener(
        "click",
        () => {
          const location = coordinateDiv.dataset.location.split(",");
          player.attack(location);
        },
        { once: true }
      );
    });
  };

  const disableClicks = (container) => {
    container.childNodes.forEach((coordinateDiv) => {
      coordinateDiv.style.pointerEvents = "none";
    });
  };

  const enableClicks = (container) => {
    container.childNodes.forEach((coordinateDiv) => {
      coordinateDiv.style.pointerEvents = "auto";
    });
  };

  const aiMove = (aiPlayer, container) => {
    container.childNodes.forEach((coordinateDiv) => {
      coordinateDiv.addEventListener("click", () => {
        disableClicks(container);
        const location = aiPlayer.chooseLocation();
        const humanGrid = document.querySelector(".human-grid");
        humanGrid
          .querySelector(`[data-location="${location[0]},${location[1]}"]`)
          .classList.add("attacked");
        //aiPlayer.attack(location);
        enableClicks(container);
      }, { once: true });
    });
  };

  const hitOrMiss = (gameBoard, container) => {
    const grid = gameBoard.getGrid();
    container.childNodes.forEach((coordinateDiv) => {
      coordinateDiv.addEventListener('click', (e) => {
        const location = coordinateDiv.dataset.location.split(",");
        if (grid[location[0]][location[1]] === null) {
          coordinateDiv.classList.add("empty", "attacked");
        } else if (typeof grid[location[0]][location[1]] === "string") {
          coordinateDiv.classList.add("occupied", "attacked");
        };
      });
    });
  }

  const changeDivClass = (div, className) => {
    div.classList.add(className);
  };

  return { displayGrid, addListeners, disableClicks, aiMove, hitOrMiss, changeDivClass };
})();

export default domInteraction;
