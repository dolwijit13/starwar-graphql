import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PeopleModule } from './people.module';
import { AppModule } from '../app/app.module';

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
const mockGetAllPeople = jest.fn(async () => mockPeople)

jest.mock('../infrastructure/starWar.adapter', () => {
  return {
    StarWarAdapter: jest.fn().mockImplementation(() => {
      return {getAllPeople: mockGetAllPeople};
    }),
  };
});

describe('[e2e] PeopleResolver', () => {
  let app: INestApplication;

  beforeEach(async () => {
    mockGetAllPeople.mockClear();

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [PeopleModule, AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const gql = '/graphql';

  describe('getAllPeople', () => {
    it('should return an array of people', () => {
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
            expect(mockGetAllPeople.mock.calls.length).toBe(1)
            expect(mockGetAllPeople.mock.calls[0]).toEqual([]);
          })
      )
    })

    it('should return an array of people with only selected attributes', () => {
      return (
        request(app.getHttpServer())
          .post(gql)
          .send({
            query:
              `
              query getAllPeople {
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
            }))
            expect(mockGetAllPeople.mock.calls.length).toBe(1)
            expect(mockGetAllPeople.mock.calls[0]).toEqual([]);
          })
      )
    })
  })
});
