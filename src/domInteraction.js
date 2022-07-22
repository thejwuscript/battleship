const domInteraction = (() => {
  const displayGrid = (grid, container) => {
    const flattenedGrid = grid.flat();
    flattenedGrid.forEach(cell => {
      const coordinateDiv = document.createElement('div');
      coordinateDiv.classList.add('coordinate');
      if (cell === null) {
        coordinateDiv.classList.add('empty');
      } else {
        coordinateDiv.classList.add('occupied');
      }
      container.appendChild(coordinateDiv);
    })
  }
  // select the div element with the class of "human-board"
  // select the div element with the class of "ai-board"
  // get the game board grid from each player and store them in a variable separately
  // flatten the multidimensional array into a single array with 100 elements and store that into a variable
  // element will be either null or a string
  // iterate through the array
  // for each element, create a new div element
  // add the class "coordinate" to the div element
  // if the element is null, add a class of 'empty' to the div
  // if the element is a string, add a class of 'occupied' to the div
  // append the div element to each respective player's div

  return { displayGrid }
})();

export default domInteraction;