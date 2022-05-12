import { UsersService } from '@/src/users/users.service';
import { usersProviders } from '@/src/users/users.providers';
import { Test } from '@nestjs/testing';
import { DatabaseModule } from '@/src/database/database.module';
import { User } from './user.entity';

describe('integration UsersService', () => {
  let usersService: UsersService;
  let user1: User;
  let user2: User;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        DatabaseModule.register({
          dialect: 'sqlite',
          database: ':memory:',
        }),
      ],
      providers: [UsersService, ...usersProviders],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);

    user1 = await User.create({ name: 'test test' });
    user2 = await User.create({ name: 'first last' });
  });

  describe('users', () => {
    it('should return array of users', async () => {
      const users = (await usersService.getAllUsers()).map((user) => user.id);
      expect(users).toEqual([user1.id, user2.id]);
    });
  });

  describe('getUserByID', () => {
    it('should return a user when exist', async () => {
      const user = (await usersService.getUserByID(user1.id)).id;
      expect(user).toEqual(user1.id);
    });

    it('should return null when not exist', async () => {
      const user = await usersService.getUserByID(-1);
      expect(user).toBeNull;
    });
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const newName = 'newuser';
      await usersService.createUser({ name: newName });
      const newUser = await User.findOne({ where: { name: newName } });
      expect(newUser.name).toEqual(newName);
    });
  });

  describe('deleteUserByID', () => {
    it('should delete a user when exist', async () => {
      const id = user2.id;
      await usersService.deleteUserByID(id);
      const deletedUser = await User.findOne({ where: { id } });
      expect(deletedUser).toBeNull;
    });
  });
});
