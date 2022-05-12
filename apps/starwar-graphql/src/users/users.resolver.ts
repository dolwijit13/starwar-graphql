import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private userService: UsersService) {}

  @Query((returns) => [User])
  async users(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Mutation((returns) => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput
  ): Promise<User> {
    return this.userService.createUser(createUserInput);
  }

  @Query((returns) => User)
  async getUser(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.userService.getUserByID(id);
  }

  @Mutation((returns) => Boolean)
  async deleteUser(
    @Args('id', { type: () => Int }) id: number
  ): Promise<boolean> {
    this.userService.deleteUserByID(id);
    return true;
  }
}