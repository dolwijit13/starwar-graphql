import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll<User>();
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOne<User>({ where: { id } });
  }

  async remove(id: number): Promise<boolean> {
    await this.usersRepository.destroy<User>({ where: { id } });

    return true;
  }

  async createUser(firstName: string, lastName: string): Promise<User> {
    return await this.usersRepository.create({
      firstName,
      lastName
    })
  }
}
