import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({id});
  }

  async remove(id: number): Promise<boolean> {
    await this.usersRepository.delete(id);

    return true;
  }

  async createUser(firstName: string, lastName: string): Promise<User> {
    return await this.usersRepository.save({
      firstName,
      lastName
    })
  }
}
