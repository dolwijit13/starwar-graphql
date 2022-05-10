import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PeopleModule } from '../people/people.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
    PeopleModule,
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
