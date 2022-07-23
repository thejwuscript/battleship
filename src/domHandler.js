const DomHandler = (() => {
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

  return { displayGrid };
})();

export default DomHandler;
