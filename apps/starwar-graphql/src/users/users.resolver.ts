import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private userService: UsersService) {}

  @Query((returns) => [User])
  users(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
}
