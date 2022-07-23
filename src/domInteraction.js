const domInteraction = (() => {
  const displayGrid = (grid, container) => {
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const coordinateDiv = document.createElement("div");
        coordinateDiv.classList.add("coordinate");
        coordinateDiv.dataset.location = `${rowIndex},${colIndex}`;
        if (cell === null) {
          coordinateDiv.classList.add("empty");
        } else {
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

  return { displayGrid, addListeners, disableClicks, aiMove };
})();

export default domInteraction;
