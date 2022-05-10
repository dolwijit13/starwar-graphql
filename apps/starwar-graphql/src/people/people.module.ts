import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PeopleResolver } from './people.resolver';
import { StarWarService } from './starWar.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      typePaths: ['./**/*.graphql'],
      driver: ApolloDriver
    }),
    ConfigModule.forRoot()
  ],
  providers: [PeopleResolver, StarWarService],
})
export class PeopleModule {}
