import { Args, Context, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Company } from '../company/company.entity';
import { CompanyService } from '../company/company.service';
import { User } from './user.entity';
import { UserService } from './user.service';
import * as DataLoader from 'dataloader';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
  ) {}

  @ResolveField('company', () => Company)
  getCreatedBy(
    @Parent() user: User,
    @Context('companiesLoader') companiesLoader: DataLoader<number, Company>,
  ) {
    const { companyID } = user;
    return companiesLoader.load(companyID);
  }

  @Query(() => [User])
  getAllUsers() {
    return this.userService.findAll();
  }

  @Query(() => User)
  getUser(@Args({ name: 'id', type: () => Int }) id: number) {
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
