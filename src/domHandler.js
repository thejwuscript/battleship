const DomHandler = (() => {
  const humanGridDiv = document.querySelector(".human-grid");
  const aiGridDiv = document.querySelector(".ai-grid");

  const updateAIGrid = (board, location, element) => {
    const cell = board.getGrid()[location[0]][location[1]];
    if (cell === null) {
      element.classList.add("empty", "attacked");
    } else if (typeof cell === "string") {
      element.classList.add("occupied", "attacked");
    }
  };

  const updateHumanGrid = (location) => {
    const element = humanGridDiv.querySelector(
      `[data-location="${location[0]},${location[1]}"]`
    );
    element.classList.add("attacked");
  };

  const revealLocation = (divElement, value) => {
    if (value === null) {
      divElement.classList.add("empty");
    } else if (typeof value === "string") {
      divElement.classList.add("occupied");
    }
  };

  const render = (grid, visibility) => {
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const div = document.createElement("div");
        div.classList.add("coordinate");
        div.dataset.location = `${rowIndex},${colIndex}`;
        if (visibility === "visible") {
          revealLocation(div, cell);
          humanGridDiv.appendChild(div);
        } else {
          aiGridDiv.appendChild(div);
        };
      });
    });
  };

  const addListenersToCoordinates = (callback) => {
    aiGridDiv.childNodes.forEach((coordinateDiv) => {
      coordinateDiv.addEventListener("click", callback, { once: true });
    });
  };

  const announceWinner = (message) => {
    setTimeout(() => alert(message), 0);
    aiGridDiv.style.pointerEvents = "none";
  };

  return {
    updateAIGrid,
    updateHumanGrid,
    render,
    addListenersToCoordinates,
    announceWinner,
  };
})();

export default DomHandler;
