import { Module } from '@nestjs/common';
import { PeopleModule } from '../people/people.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [PeopleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
