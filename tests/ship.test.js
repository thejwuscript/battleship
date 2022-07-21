import Ship from '../src/ship';

describe('Ship factory function', () => {
  let ship

  describe('hit', () => {
    it('changes 1 to 0 at the given position of the health array', () => {
      ship = Ship('Patrol Boat')
      let position = 1;
      ship.hit(position)
      expect(ship.getHealth()).toEqual([1, 0])
    })

    it('throws an invalid position error if given position does not exist', () => {
      ship = Ship('Submarine');
      let position = 4;
      expect(() => {ship.hit(position)}).toThrow('Invalid position');
    })

    it('health array is not mutated if given position does not exist', () => {
      ship = Ship('Destroyer');
      let position = 4;
      try {
        ship.hit(position);
      } catch (e) {};
      expect(ship.getHealth()).toEqual([1, 1, 1]);
    })
  });

  describe('getHealth', () => {
    it('returns the health array of a Carrier', () => {
      ship = Ship('Carrier')
      expect(ship.getHealth()).toEqual([1, 1, 1, 1, 1])
    })

    it('returns the health array of a Battleship', () => {
      ship = Ship('Battleship');
      expect(ship.getHealth()).toEqual([1, 1, 1, 1]);
    })

    it('returns the health array of a Destroyer', () => {
      ship = Ship('Destroyer');
      expect(ship.getHealth()).toEqual([1, 1, 1]);
    })

    it('returns the health array of a Submarine', () => {
      ship = Ship('Submarine');
      expect(ship.getHealth()).toEqual([1, 1, 1]);
    })

    it('returns the health array of a Patrol Boat', () => {
      ship = Ship('Patrol Boat');
      expect(ship.getHealth()).toEqual([1, 1]);
    })
  });

  describe('isSunk', () => {
    it('returns true if all health is 0', () => {
      ship = Ship('Patrol Boat');
      ship.hit(0);
      ship.hit(1);
      expect(ship.isSunk()).toBe(true);
    })

    it('returns false if all health is not 0', () => {
      ship = Ship('Patrol Boat');
      ship.hit(0);
      expect(ship.isSunk()).toBe(false);
    })
  });
})