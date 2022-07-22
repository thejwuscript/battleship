import Player from '../src/player';
import GameBoard from '../src/gameBoard';

describe('Player factory', () => {
  let player
  let gameBoard

  beforeEach(() => {
    gameBoard = GameBoard();
    player = Player(gameBoard);
  });

  describe('attack', () => {
    it('attacks a location on the game board', () => {
      const location = [1, 3];
      const spy = jest.spyOn(gameBoard, 'receiveAttack');
      player.attack(location);
      expect(spy).toHaveBeenCalledWith(location);
    })
  })
})