import { Module } from '@nestjs/common';
import { companiesProviders } from './companies.providers';
import { CompaniesResolver } from './companies.resolver';
import { CompaniesService } from './companies.service';

@Module({
  providers: [CompaniesResolver, CompaniesService, ...companiesProviders],
  exports: [CompaniesService],
})
export class CompaniesModule {}
