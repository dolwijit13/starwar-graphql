import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { Character } from './character.entity';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app/app.module';
import { CharactersModule } from './characters.module';

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
      imports: [CharactersModule, AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
    mockGetAllCharacters.mockClear();
    mockGetCharacterByID.mockClear();
  });

  describe('characters', () => {
    it('should return an array of characters', async () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: `query {characters { id name filmConnection { films { id title } } }}`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.characters).toEqual(characters);
          expect(mockGetAllCharacters.mock.calls.length).toEqual(1);
          expect(mockGetAllCharacters.mock.calls[0]).toEqual([]);
        });
    });

    it('should return an array of characters with only selected attributes', async () => {
      const result = characters.map((character) => ({ name: character.name }));
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: `query {characters { name }}`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.characters).toEqual(result);
          expect(mockGetAllCharacters.mock.calls.length).toEqual(1);
          expect(mockGetAllCharacters.mock.calls[0]).toEqual([]);
        });
    });
  });

  describe('getCharacter', () => {
    it('should return a character', async () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: `query {getCharacter(id: "1") {id name filmConnection { films { id title } }}}`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.getCharacter).toEqual(characters[0]);
          expect(mockGetCharacterByID.mock.calls.length).toEqual(1);
          expect(mockGetCharacterByID.mock.calls[0]).toEqual(['1']);
        });
    });

    it('should return a character with only selected attributes', async () => {
      const result = { name: characters[0].name };
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: `query {getCharacter(id: "1") { name }}`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.getCharacter).toEqual(result);
          expect(mockGetCharacterByID.mock.calls.length).toEqual(1);
          expect(mockGetCharacterByID.mock.calls[0]).toEqual(['1']);
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
