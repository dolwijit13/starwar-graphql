import { Module } from '@nestjs/common';
import { databaseProviders } from './database.test.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
