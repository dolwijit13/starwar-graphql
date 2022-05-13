import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { CharactersModule } from '../characters/characters.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '@/config/configuration';
import { UsersModule } from '../users/users.module';
import { DatabaseModule } from '@/src/database/database.module';
import { CompaniesModule } from '../companies/companies.module';
import { DataLoaderModule } from '../data-loader/data-loader.module';
import { DataloaderService } from '../data-loader/data-loader.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [DataLoaderModule.register()],
      inject: [DataloaderService],
      useFactory: (dataloaderService: DataloaderService) => {
        return {
          autoSchemaFile: join(
            process.cwd(),
            'apps/starwar-graphql/src/schema.gql'
          ),
          context: () => ({
            loaders: dataloaderService.createLoaders(),
          }),
        };
      },
    }),
    CharactersModule,
    DatabaseModule.register({
      dialect: 'postgres',
      database: configuration().db,
      host: configuration().dbHost,
      port: +configuration().dbPort,
      username: configuration().dbUsername,
      password: configuration().dbPassword,
    }),
    UsersModule,
    CompaniesModule,
  ],
})
export class AppModule {}
