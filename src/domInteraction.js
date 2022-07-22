const domInteraction = (() => {
  const displayGrid = (grid, container) => {
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const coordinateDiv = document.createElement('div');
        coordinateDiv.classList.add('coordinate');
        coordinateDiv.dataset.location = `${rowIndex},${colIndex}`;
        if (cell === null) {
          coordinateDiv.classList.add('empty');
        } else {
          coordinateDiv.classList.add('occupied');
        }
        container.appendChild(coordinateDiv);
      });
    });
  };

  return { displayGrid }
})();

export default domInteraction;