import { DynamicModule, Module, Provider } from '@nestjs/common';
import { CompaniesModule } from '../companies/companies.module';
import { DataloaderService } from './data-loader.service';
import { createDataLoaderProvider } from './data-loader.providers';
@Module({})
export class DataLoaderModule {
  static register(): DynamicModule {
    const provider: Provider = createDataLoaderProvider();

    return {
      module: DataLoaderModule,
      imports: [CompaniesModule],
      providers: [DataloaderService, provider],
      exports: [DataloaderService, provider],
    };
  }
}
