function createShip(name) {
  let health

  switch (name) {
    case 'Carrier':
      health = [1, 1, 1, 1, 1]
      break;
    case 'Battleship':
      health = [1, 1, 1, 1]
      break;
    case 'Destroyer':
      health = [1, 1, 1]
      break;
    case 'Submarine':
      health = [1, 1, 1]
      break;
    case 'Patrol Boat':
      health = [1, 1]
      break;
    default:
      throw new Error('Invalid ship name')
  }

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