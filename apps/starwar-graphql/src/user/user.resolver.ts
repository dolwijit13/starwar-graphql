import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver('People')
export class UserResolver {
  constructor(
    private userService: UserService,
  ) {}

  @Query(() => [User])
  getAllUsers() {
    return this.userService.findAll();
  }

  @Query(() => User)
  getUser(@Args({ name: 'id' }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  async createUser(@Args({ name: 'firstName' }) firstName: string, @Args({ name: 'lastName' }) lastName: string) {
    return this.userService.createUser(firstName, lastName);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args({ name: 'id' }) id: number) {
    return this.userService.remove(id);
  }
}