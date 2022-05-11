import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@/src/app/app.module';
import { UsersModule } from './users.module';

const gql = '/graphql';
const users = [
  { id: 1, name: 'test' },
  { id: 2, name: 'name' },
];

const mockGetAllUsers = jest.fn().mockResolvedValue(users);
const mockGetUserByID = jest.fn().mockResolvedValue(users[0]);
const mockCreateUser = jest.fn().mockResolvedValue(users[1]);
const mockDeleteUserByID = jest.fn().mockResolvedValue(null);

jest.mock('./users.service', () => {
  return {
    UsersService: jest.fn().mockImplementation(() => {
      return {
        getAllUsers: mockGetAllUsers,
        getUserByID: mockGetUserByID,
        createUser: mockCreateUser,
        deleteUserByID: mockDeleteUserByID,
      };
    }),
  };
});

describe('e2e Users', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule, AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
    mockGetAllUsers.mockClear();
    mockGetUserByID.mockClear();
    mockCreateUser.mockClear();
    mockDeleteUserByID.mockClear();
  });

  describe('users', () => {
    it('should return array of users', async () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: `query {users {id name}}`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.users).toEqual(users);
          expect(mockGetAllUsers.mock.calls.length).toEqual(1);
          expect(mockGetAllUsers.mock.calls[0]).toEqual([]);
        });
    });

    it('should return array of users with selected query', async () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: `query {users {name}}`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.users).toEqual(
            users.map((user) => ({
              name: user.name,
            }))
          );
          expect(mockGetAllUsers.mock.calls.length).toEqual(1);
          expect(mockGetAllUsers.mock.calls[0]).toEqual([]);
        });
    });
  });

  describe('getUser', () => {
    it('should return a user', async () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: `query {getUser(id: 1) {id name}}`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.getUser).toEqual(users[0]);
          expect(mockGetUserByID.mock.calls.length).toEqual(1);
          expect(mockGetUserByID.mock.calls[0]).toEqual([1]);
        });
    });

    it('should return a user with selected query', async () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: `query {getUser(id: 1) {name}}`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.getUser).toEqual({ name: users[0].name });
          expect(mockGetUserByID.mock.calls.length).toEqual(1);
          expect(mockGetUserByID.mock.calls[0]).toEqual([1]);
        });
    });
  });

  describe('createUser', () => {
    it('should return a user', async () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: `mutation {createUser(createUserInput: { name: "firstname" }) {id name} }`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createUser).toEqual(users[1]);
          expect(mockCreateUser.mock.calls.length).toEqual(1);
          expect(mockCreateUser.mock.calls[0]).toEqual([{ name: 'firstname' }]);
        });
    });

    it('should return a user with selected query', async () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: `mutation {createUser(createUserInput: { name: "firstname" }) {name}}`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createUser).toEqual({ name: users[1].name });
          expect(mockCreateUser.mock.calls.length).toEqual(1);
          expect(mockCreateUser.mock.calls[0]).toEqual([{ name: 'firstname' }]);
        });
    });
  });

  describe('deleteUser', () => {
    it('should return true', async () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: `mutation {deleteUser(id: 10)}`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.deleteUser).toBeTruthy;
          expect(mockDeleteUserByID.mock.calls.length).toEqual(1);
          expect(mockDeleteUserByID.mock.calls[0]).toEqual([10]);
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
