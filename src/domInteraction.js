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

  const addListeners = (player, container) => {
    container.childNodes.forEach((coordinateDiv) => {
      coordinateDiv.addEventListener('click', () => {
        const location = coordinateDiv.dataset.location.split(',');
        player.attack(location);
      }, {once: true});
    });
  };

  const disableClicks = (container) => {
    container.childNodes.forEach((coordinateDiv) => {
      coordinateDiv.style.pointerEvents = 'none';
    });
  }

  return { displayGrid, addListeners, disableClicks };
})();

export default domInteraction;