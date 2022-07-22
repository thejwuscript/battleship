import AIPlayer from '../src/aiPlayer';
import GameBoard from '../src/gameBoard';

describe('AI Player', () => {
  let aiPlayer;
  let gameBoard;

  beforeEach(() => {
    gameBoard = GameBoard();
    aiPlayer = AIPlayer(gameBoard);
  })

  describe('attack', () => {
    it('attacks a randomly chosen location on the game board', () => {
      const spy = jest.spyOn(gameBoard, 'receiveAttack');
      aiPlayer.attack();
      expect(spy).toBeCalled();
    });
  });

  describe('chooseLocation', () => {
    const locations = [
      [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9],
      [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9],
      [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9],
      [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9],
      [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9],
      [5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [5, 8], [5, 9],
      [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9],
      [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9],
      [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9],
      [9, 0], [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8], [9, 9],
    ]
    it('returns a location on the game board', () => {
      const chosenLocation = aiPlayer.chooseLocation();
      expect(locations).toContainEqual(chosenLocation);
    });

    it('returns a location that has not been attacked', () => {
      const chosenLocation1 = aiPlayer.chooseLocation();
      const chosenLocation2 = aiPlayer.chooseLocation();
      expect(chosenLocation1).not.toEqual(chosenLocation2);
    });

    it('shortens the list of locations to attack by one', () => {
      const beforeLength = aiPlayer.getLocations().length;
      aiPlayer.chooseLocation();
      const afterLength = aiPlayer.getLocations().length;
      expect(beforeLength).toEqual(afterLength + 1);
    })
  });
});