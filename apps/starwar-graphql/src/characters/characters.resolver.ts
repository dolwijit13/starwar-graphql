import { Args, Query, Resolver } from '@nestjs/graphql';
import { Character } from './character.entity';
import { StarwarAdapter } from '../infrastructure/starwar.adapter';

@Resolver((of) => Character)
export class CharactersResolver {
  constructor(private starwarAdapter: StarwarAdapter) {}

  @Query((returns) => [Character])
  characters(): Promise<Character[]> {
    return this.starwarAdapter.getAllCharacters();
  }

  @Query((returns) => Character)
  getCharacter(
    @Args('id', { type: () => String }) id: string
  ): Promise<Character> {
    return this.starwarAdapter.getCharacterByID(id);
  }
}
