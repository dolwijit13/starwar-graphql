import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { AppModule } from '../app/app.module';
import { UserModule } from './user.module';

const mockUsers = [
  {
    id: 1,
    firstName: 'one',
    lastName: 'last'
  },
  {
    id: 2,
    firstName: 'two',
    lastName: 'last'
  },
]
const mockGetUsers = jest.fn(async () => mockUsers)
const mockGetUser = jest.fn(async () => mockUsers[0])
const mockGetTrue = jest.fn(async () => true)

jest.mock('./user.service.ts', () => {
  return {
    UserService: jest.fn().mockImplementation(() => {
      return {
        findAll: mockGetUsers,
        findOne: mockGetUser,
        remove: mockGetTrue,
        createUser: mockGetUser,
      };
    }),
  };
});

describe('[e2e] UserResolver', () => {
  let app: INestApplication;

  beforeEach(async () => {
    mockGetUser.mockClear();

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [UserModule, AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const gql = '/graphql';

  describe('getAllUsers', () => {
    it('should return id and first name', () => {
      return (
        request(app.getHttpServer())
          .post(gql)
          .send({
            query:
              `
              query getAllUsers {
                getAllUsers{
                  id,
                  firstName
                }
              }
              `,
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.getAllUsers.sort()).toEqual(mockUsers.sort().map((user) => {
              return {id: user.id, firstName: user.firstName}
            }))
            expect(mockGetUsers.mock.calls.length).toBe(1)
            expect(mockGetUsers.mock.calls[0]).toEqual([]);
          })
      )
    })
  })

  describe('getUser', () => {
    it('should return id and first name of selected user', () => {
      return (
        request(app.getHttpServer())
          .post(gql)
          .send({
            query:
              `
              query getUser {
                getUser(id: 1) {
                  id,
                  firstName
                }
              }
              `,
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.getUser).toEqual({
              id: mockUsers[0].id,
              firstName: mockUsers[0].firstName
            })
            expect(mockGetUser.mock.calls.length).toBe(1)
            expect(mockGetUser.mock.calls[0]).toEqual([1]);
          })
      )
    })
  })

  describe('deleteUser', () => {
    it('should call remove with user id 1', () => {
      return (
        request(app.getHttpServer())
          .post(gql)
          .send({
            query:
              `
              mutation deleteUser {
                deleteUser(id: 1)
              }
              `,
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.deleteUser).toBe(true)
            expect(mockGetTrue.mock.calls.length).toBe(1)
            expect(mockGetTrue.mock.calls[0]).toEqual([1]);
          })
      )
    })
  })

  describe('createUser', () => {
    it('should call create user with new user', () => {
      return (
        request(app.getHttpServer())
          .post(gql)
          .send({
            query:
              `
              mutation createUser {
                createUser(firstName: "new", lastName: "user") {
                  id,
                  firstName,
                }
              }
              `,
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.createUser).toEqual({
              id: mockUsers[0].id,
              firstName: mockUsers[0].firstName
            })
            expect(mockGetUser.mock.calls.length).toBe(1)
            expect(mockGetUser.mock.calls[0]).toEqual(['new', 'user']);
          })
      )
    })
  })
});
