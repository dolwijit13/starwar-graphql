import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Company } from '../company/company.entity';
import { CompanyService } from '../company/company.service';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private companyService: CompanyService
  ) {}

  @ResolveField('company', () => Company)
  getCompany(@Parent() user: User) {
    return this.companyService.findOne(user.companyID);
  }

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
