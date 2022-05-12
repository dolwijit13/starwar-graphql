import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver('User')
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
  async createUser(
    @Args({ name: 'firstName' }) firstName: string,
    @Args({ name: 'lastName' }) lastName: string,
    @Args({ name: 'companyID', type: () => Int }) companyID?: number,
  ) {
    return this.userService.createUser(firstName, lastName, companyID);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args({ name: 'id' }) id: number) {
    return this.userService.remove(id);
  }
}
