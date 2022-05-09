import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PeopleResolver } from './people.resolver';
import { StarWarService } from './starWar.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      typePaths: ['./**/*.graphql'],
      driver: ApolloDriver
    })
  ],
  providers: [PeopleResolver, StarWarService],
})
export class PeopleModule {}
