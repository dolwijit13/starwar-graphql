import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SetResolver } from './set.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      typePaths: ['./**/*.graphql'],
      driver: ApolloDriver
    })
  ],
  controllers: [AppController],
  providers: [AppService, SetResolver],
})
export class AppModule {}
