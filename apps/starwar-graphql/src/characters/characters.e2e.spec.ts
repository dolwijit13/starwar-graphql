import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { CharactersModule } from './characters.module';
import { StarwarAdapter } from '@/infrastructure/starwar.adapter';
import { Character } from './character.entity';
import { INestApplication } from '@nestjs/common';

const gql = '/graphql';

describe('Characters', () => {
  let app: INestApplication;
  let starwarAdapter: StarwarAdapter;
  let characters: Character[];

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CharactersModule],
    }).compile();
    starwarAdapter = moduleRef.get<StarwarAdapter>(StarwarAdapter);

    characters = [
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

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('characters', () => {
    it('should return an array of characters', async () => {
      jest
        .spyOn(starwarAdapter, 'getAllCharacters')
        .mockResolvedValue(characters);

      request(app.getHttpServer())
        .post(gql)
        .send({
          query: `query {characters {id name filmsConnection { films { id title } }}}`,
        })
        .expect(200)
        .expect({ data: characters });
    });

    it('should return an array of characters with only selected attributes', async () => {
      const result = characters.map((character) => ({ name: character.name }));
      jest
        .spyOn(starwarAdapter, 'getAllCharacters')
        .mockResolvedValue(characters);

      request(app.getHttpServer())
        .post(gql)
        .send({
          query: `query {characters { name }}`,
        })
        .expect(200)
        .expect({ data: result });
    });
  });

  describe('getCharacter', () => {
    it('should return a character', async () => {
      jest
        .spyOn(starwarAdapter, 'getCharacterByID')
        .mockResolvedValue(characters[1]);

      request(app.getHttpServer())
        .post(gql)
        .send({
          query: `query {getcharacter(id: '1') {id name filmsConnection { films { id title } }}}`,
        })
        .expect(200)
        .expect({ data: characters[1] });
    });

    it('should return a character with only selected attributes', async () => {
      const result = { name: characters[1].name };
      jest
        .spyOn(starwarAdapter, 'getCharacterByID')
        .mockResolvedValue(characters[1]);

      request(app.getHttpServer())
        .post(gql)
        .send({
          query: 'query {characters { name }}',
        })
        .expect(200)
        .expect({ data: result });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
