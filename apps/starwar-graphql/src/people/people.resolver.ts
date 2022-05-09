import { Info, Query, Resolver } from '@nestjs/graphql';
import { StarWarService } from './starWar.service';

@Resolver('People')
export class PeopleResolver {
  constructor(
    private readonly starWarService: StarWarService,
  ) {}

  @Query('allPeople')
  getAllPeople(@Info() info) {
    return this.starWarService.getAllPeople(info.fieldNodes[0].selectionSet.selections.map(item => item.name.value))
  }
}
