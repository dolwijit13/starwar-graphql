import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { PeopleModule } from './people.module';
import { StarWarAdapter } from '../infrastructure/starWar.adapter';

describe('CustomerResolver (e2e)', () => {
  let app: INestApplication;
  let starWarAdapter: StarWarAdapter;

  const mockPeople = [
    {
      "id": "cGVvcGxlOjEz",
      "name": "Chewbacca",
      "species": {
        "name": "Wookie",
        "homeworld": {
          "name": "Kashyyyk",
          "diameter": 12765
        }
      }
    },
    {
      "id": "cGVvcGxlOjE0",
      "name": "Han Solo",
      "species": null
    }
  ]

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [PeopleModule],
    }).compile();

    starWarAdapter = moduleRef.get<StarWarAdapter>(StarWarAdapter);
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const gql = '/graphql';

  describe('getAllPeople', () => {
    it('should return id and name', () => {
      jest.spyOn(starWarAdapter, 'getAllPeople').mockImplementation(async () => mockPeople);
      return (
        request(app.getHttpServer())
          .post(gql)
          .send({
            query:
              `
              query getCharacters {
                getAllPeople{
                  id,
                  name
                }
              }
              `,
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.getAllPeople.sort()).toEqual(mockPeople.sort().map((person) => {
              return {id: person.id, name: person.name}
            }));
          })
      )
    })
  })

  it('should return id, species and homeworld name', () => {
    jest.spyOn(starWarAdapter, 'getAllPeople').mockImplementation(async () => mockPeople);
    return (
      request(app.getHttpServer())
        .post(gql)
        .send({
          query:
            `
            query getCharacters {
              getAllPeople{
                id,
                species {
                  name,
                  homeworld {
                    name
                  }
                }
              }
            }
            `,
        })
        .expect(200)
        .expect((res) => {
          console.log(res.body.data.getAllPeople)
          expect(res.body.data.getAllPeople.sort()).toEqual(mockPeople.sort().map((person) => {
            return {
              id: person.id,
              species: person.species ?
                {
                  name: person.species?.name,
                  homeworld: {
                    name: person.species?.homeworld?.name
                  }
                } : null
            }
          }));
        })
    )
  })
});
