import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { CharactersModule } from './characters.module';
import { Character } from './character.entity';
import { INestApplication } from '@nestjs/common';

const gql = '/graphql';
const characters: Character[] = [
  {
    id: '1',
    name: 'Sky walker',
    filmConnection: {
      films: [
        {
          id: '1',
          title: 'movie 1',
        },
        {
          id: '2',
          title: 'movie 2',
        },
      ],
    },
  },
  {
    id: '2',
    name: 'Jedi',
    filmConnection: {
      films: [
        {
          id: '1',
          title: 'movie 1',
        },
        {
          id: '3',
          title: 'movie 3',
        },
      ],
    },
  },
];

const mockGetAllCharacters = jest.fn().mockResolvedValue(characters);
const mockGetCharacterByID = jest.fn().mockResolvedValue(characters[0]);

jest.mock('@/infrastructure/starwar.adapter', () => {
  return {
    StarwarAdapter: jest.fn().mockImplementation(() => {
      return {
        getAllCharacters: mockGetAllCharacters,
        getCharacterByID: mockGetCharacterByID,
      };
    }),
  };
});

describe('e2e Characters', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CharactersModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
    mockGetAllCharacters.mockClear();
    mockGetCharacterByID.mockClear();
  });

  describe('characters', () => {
    it('should return an array of characters', async () => {
      request(app.getHttpServer())
        .post(gql)
        .send({
          query: `query {characters {id name filmsConnection { films { id title } }}}`,
        })
        .expect(200)
        .expect({ data: characters })
        .expect(mockGetAllCharacters.mock.calls.length, 1)
        .expect(mockGetAllCharacters.mock.calls[0], []);
    });

    it('should return an array of characters with only selected attributes', async () => {
      const result = characters.map((character) => ({ name: character.name }));
      request(app.getHttpServer())
        .post(gql)
        .send({
          query: `query {characters { name }}`,
        })
        .expect(200)
        .expect({ data: result })
        .expect(mockGetAllCharacters.mock.calls.length, 1)
        .expect(mockGetAllCharacters.mock.calls[0], []);
    });
  });

  describe('getCharacter', () => {
    it('should return a character', async () => {
      request(app.getHttpServer())
        .post(gql)
        .send({
          query: `query {getcharacter(id: '1') {id name filmsConnection { films { id title } }}}`,
        })
        .expect(200)
        .expect({ data: characters[0] })
        .expect(mockGetCharacterByID.mock.calls.length, 1)
        .expect(mockGetCharacterByID.mock.calls[0], ['1']);
    });

    it('should return a character with only selected attributes', async () => {
      const result = { name: characters[0].name };
      request(app.getHttpServer())
        .post(gql)
        .send({
          query: 'query {characters { name }}',
        })
        .expect(200)
        .expect({ data: result })
        .expect(mockGetCharacterByID.mock.calls.length, 1)
        .expect(mockGetCharacterByID.mock.calls[0], ['1']);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
