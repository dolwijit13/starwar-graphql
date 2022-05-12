import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { createCompaniesLoader } from '../company/company.loader';
import { CompanyModule } from '../company/company.module';
import { CompanyService } from '../company/company.service';
import { DatabaseModule } from '../database/database.module';
import { PeopleModule } from '../people/people.module';
import { UserModule } from '../user/user.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRootAsync({
      imports: [CompanyModule],
      driver: ApolloDriver,
      useFactory: (companyService: CompanyService) => ({
        autoSchemaFile: join(process.cwd(), 'apps/starwar-graphql/src/schema.gql'),
        context: () => ({
          companiesLoader: createCompaniesLoader(companyService),
        }),
      }),
      inject: [CompanyService],
    }),
    PeopleModule,
    UserModule,
    CompanyModule,
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
