const DomHandler = (() => {
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

  const addGameLoopListeners = (container, callback) => {
    container.childNodes.forEach((coordinateDiv) => {
      coordinateDiv.addEventListener("click", callback, { once: true });
    });
  }

  return { render, addGameLoopListeners };
})();

export default DomHandler;
