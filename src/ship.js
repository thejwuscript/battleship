function Ship(name) {
  let mapping = {
    "Carrier": 5,
    "Battleship": 4,
    "Destroyer": 3,
    "Submarine": 3,
    "Patrol Boat": 2,
  }
  let length = mapping[name];
  let health = Array(length).fill(1);

  return {
    getName: () => name,
    getLength: () => length,
    getHealth: () => health,
    hit(position) {
      if (position >= 0 && position < health.length) {
        health[position] = 0
      } else {
        throw new Error('Invalid position')
      }
    },
    isSunk: () => health.every(n => n === 0)
  }
};

export default Ship;