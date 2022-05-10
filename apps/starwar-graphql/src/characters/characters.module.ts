import { Module } from '@nestjs/common';
import { InfrastructureModule } from '@/infrastructure/infrastructure.module';
import { CharactersResolver } from './characters.resolver';

@Module({
  imports: [InfrastructureModule],
  providers: [CharactersResolver],
})
export class CharactersModule {}
