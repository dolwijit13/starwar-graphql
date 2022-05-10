import { Query, Resolver } from '@nestjs/graphql';
import { StarWarService } from '../infrastructure/starWar.service';
import { Person } from './models/people.model';

@Resolver('People')
export class PeopleResolver {
  constructor(
    private readonly starWarService: StarWarService,
  ) {}

  @Query(returns => [Person])
  getAllPeople() {
    return this.starWarService.getAllPeople();
  }
}
