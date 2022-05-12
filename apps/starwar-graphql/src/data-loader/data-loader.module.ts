import { Module } from '@nestjs/common';
import { CompaniesModule } from '../companies/companies.module';
import { DataloaderService } from './data-loader.service';

@Module({
  providers: [DataloaderService],
  imports: [CompaniesModule],
  exports: [DataloaderService],
})
export class DataLoaderModule {}
