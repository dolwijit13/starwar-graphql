import { Test } from '@nestjs/testing';

import { UserService } from './user.service';
import { DatabaseModule } from '../test-database/database.module';
import { usersProviders } from './user.provider';
import { User } from './user.entity';

describe('UserService', () => {
  let userService: UserService;
  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [UserService, ...usersProviders],
    }).compile();

    userService = app.get<UserService>(UserService);
  });

  describe('findAll', () => {
    it('return all users', async () => {
      const user = await User.create({firstName: 'first', lastName: 'last'})
      const actual = await userService.findAll()
      expect(actual.length).toBe(1);
      expect(actual[0].id).toEqual(user.id);
    });
  });

  describe('findOne', () => {
    it('return a user', async () => {
      const user = await User.create({firstName: 'first', lastName: 'last'})
      await User.create({firstName: 'other', lastName: 'other'})
      const actual = await userService.findOne(user.id)
      expect(actual.id).toEqual(user.id);
    });
  });

  describe('remove', () => {
    it('should remove user', async () => {
      const user = await User.create({firstName: 'first', lastName: 'last'})
      await User.create({firstName: 'other', lastName: 'other'})
      await userService.remove(user.id)
      const actual = await User.findOne({where: { id: user.id }})
      expect(actual).toBe(null);
    });
  });

  describe('create', () => {
    it('should create user', async () => {
      await userService.createUser('create', 'create')
      const actual = await User.findOne({where: { firstName: 'create', lastName: 'create' }})
      expect(actual).toBeDefined();
    });
  });
});
