import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { CharactersModule } from '../characters/characters.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '@/config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { User } from '../users/user.entity';

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
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configuration().dbHost,
      port: configuration().dbPort as number,
      username: configuration().dbUsername,
      password: configuration().dbPassword,
      database: configuration().db,
      entities: [User],
      synchronize: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}
