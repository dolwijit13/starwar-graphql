import { StarwarAdapter } from './starwar.adapter';

describe('StarwarAdapter', () => {
  let starwarAdapter: StarwarAdapter;

  beforeEach(() => {
    starwarAdapter = new StarwarAdapter();
  });

  describe('getAllCharacters', () => {
    it('should return an array of characters', async () => {
      const result = await starwarAdapter.getAllCharacters();
      expect(result).toBeInstanceOf(Array);
      expect(result.filter((c) => c.name === 'Luke Skywalker')).toBeTruthy;
    });
  });

  describe('getCharacterByID', () => {
    it('should return a character', async () => {
      const id = 'cGVvcGxlOjE=';
      const result = await starwarAdapter.getCharacterByID(id);
      expect(result.id).toBe(id);
      expect(result.name).toBe('Luke Skywalker');
    });

    it('should return a character', async () => {
      const id = '1';
      const result = await starwarAdapter.getCharacterByID(id);
      expect(result).toBeNull;
    });
  });
});
