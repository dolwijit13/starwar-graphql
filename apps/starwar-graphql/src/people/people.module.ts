import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PeopleResolver } from './people.resolver';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'apps/starwar-graphql/src/people/schema.gql'),
      driver: ApolloDriver
    }),
    InfrastructureModule
  ],
  providers: [PeopleResolver],
})
export class PeopleModule {}
