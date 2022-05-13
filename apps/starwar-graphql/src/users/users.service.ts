import configuration from '@/config/configuration';
import { Inject, Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { Dialect } from 'sequelize/types';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  @Inject('USERS_REPOSITORY') private usersRepository: typeof User;

  constructor(private lazyModuleLoader: LazyModuleLoader) {}

  async getAllUsers(): Promise<User[]> {
    await this.checkUsersRepository();
    return this.usersRepository.findAll<User>();
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    await this.checkUsersRepository();
    const newUser = this.usersRepository.build(createUserInput);
    return newUser.save();
  }

  async getUserByID(id: number): Promise<User> {
    await this.checkUsersRepository();
    return this.usersRepository.findOne<User>({ where: { id } });
  }

  async deleteUserByID(id: number): Promise<void> {
    await this.checkUsersRepository();
    this.usersRepository.destroy({ where: { id } });
  }

  async lazyLoadDB(): Promise<void> {
    const { DatabaseModule } = await import('@/src/database/database.module');
    await this.lazyModuleLoader.load(() =>
      DatabaseModule.register({
        dialect: configuration().dbDialect as Dialect,
        database: configuration().db,
        host: configuration().dbHost,
        port: +configuration().dbPort,
        username: configuration().dbUsername,
        password: configuration().dbPassword,
      })
    );
  }

  private async checkUsersRepository(): Promise<void> {
    if (!this.usersRepository) await this.lazyLoadDB();
  }
}
