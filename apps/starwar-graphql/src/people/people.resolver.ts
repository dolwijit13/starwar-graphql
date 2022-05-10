import { Query, Resolver } from '@nestjs/graphql';
import { StarWarAdapter } from '../infrastructure/starWar.adapter';
import { Person } from './models/people.model';

@Resolver('People')
export class PeopleResolver {
  constructor(
    private readonly starWarAdapter: StarWarAdapter,
  ) {}

  @Query(returns => [Person])
  getAllPeople() {
    return this.starWarAdapter.getAllPeople();
  }
}
