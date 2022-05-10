import { StarWarAdapter } from './starWar.adapter';

describe('StarWarAdapter', () => {
  let starWarAdapter: StarWarAdapter;

  beforeEach(() => {
    starWarAdapter = new StarWarAdapter();
  });

  describe('getAllPeople', () => {
    it('should return an array of person', async () => {
      const response = await starWarAdapter.getAllPeople()
      expect(response).toBeInstanceOf(Array);
      expect(response.map(response => response.id))
        .toContain("cGVvcGxlOjE=")
    });
  });
});
