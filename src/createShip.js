function createShip(name) {
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
    getHealth: () => health,
    hit(position) {
      if (position >= 0 && position < health.length) {
        health[position] = 0
      } else {
        throw new Error('Invalid position')
      }
    },
  }
};

export default createShip;