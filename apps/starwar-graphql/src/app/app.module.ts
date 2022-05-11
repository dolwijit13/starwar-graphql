import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { CharactersModule } from '../characters/characters.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '@/config/configuration';
import { UsersModule } from '../users/users.module';
import { DatabaseModule } from '@/src/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(
        process.cwd(),
        'apps/starwar-graphql/src/schema.gql'
      ),
    }),
    CharactersModule,
    DatabaseModule,
    UsersModule,
  ],
})
export class AppModule {}
