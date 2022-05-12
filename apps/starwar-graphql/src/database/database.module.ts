import { DynamicModule, Module, Provider } from '@nestjs/common';
import { SequelizeOptions } from 'sequelize-typescript';
import { createDatabaseProvider } from './database.providers';

@Module({})
export class DatabaseModule {
  static register(option: SequelizeOptions): DynamicModule {
    const provider: Provider = createDatabaseProvider(option);
    return {
      module: DatabaseModule,
      providers: [provider],
      exports: [provider],
    };
  }
}
