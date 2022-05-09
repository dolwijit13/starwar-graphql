import { Args, Query, Resolver } from '@nestjs/graphql';
import { Character } from './character.entity';
import { CharactersService } from './characters.service';

@Resolver((of) => Character)
export class CharactersResolver {
  constructor(private charactersService: CharactersService) {}

  @Query((returns) => [Character])
  characters(): Promise<Character[]> {
    return this.charactersService.findAll();
  }

  @Query((returns) => Character)
  getCharacter(
    @Args('id', { type: () => String }) id: string
  ): Promise<Character> {
    return this.charactersService.findByID(id);
  }
}
