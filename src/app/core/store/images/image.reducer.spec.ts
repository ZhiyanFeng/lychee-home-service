import { imageReducer, initialState } from './image.reducer';

describe('Image Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = imageReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
