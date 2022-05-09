import { Module } from '@nestjs/common';
import { CharactersResolver } from './characters.resolver';
import { CharactersService } from './characters.service';

@Module({
  providers: [CharactersService, CharactersResolver],
})
export class CharactersModule {}
