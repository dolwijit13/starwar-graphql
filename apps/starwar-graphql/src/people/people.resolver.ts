import { Info, Query, Resolver } from '@nestjs/graphql';
import { StarWarService } from './starWar.service';

@Resolver('People')
export class PeopleResolver {
  constructor(
    private readonly starWarService: StarWarService,
  ) {}

  @Query('allPeople')
  getAllPeople() {
    return this.starWarService.getAllPeople();
  }
}
