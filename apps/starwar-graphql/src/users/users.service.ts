import { Inject, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY') private usersRepository: typeof User
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.findAll<User>();
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const newUser = this.usersRepository.build(createUserInput);
    return newUser.save();
  }

  async getUserByID(id: number): Promise<User> {
    return this.usersRepository.findOne<User>({ where: { id } });
  }

  async deleteUserByID(id: number): Promise<void> {
    this.usersRepository.destroy({ where: { id } });
  }
}
