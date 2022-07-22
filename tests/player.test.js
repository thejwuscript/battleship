import Player from '../src/player';
import GameBoard from '../src/gameBoard';

describe('Player factory', () => {
  let player

  beforeEach(() => {
    player = Player();
  });

  describe('attack', () => {
    it('attacks a location on the game board', () => {
      const gameBoard = GameBoard();
      const location = [1, 3];
      const spy = jest.spyOn(gameBoard, 'receiveAttack');
      player.attack(gameBoard, location);
      expect(spy).toHaveBeenCalledWith(location);
    })
  })
})