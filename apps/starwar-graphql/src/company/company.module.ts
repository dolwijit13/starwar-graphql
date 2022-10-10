import { Module } from '@nestjs/common';
import { companiesProviders } from './company.provider';
import { CompanyResolver } from './company.resolver';
import { CompanyService } from './company.service';

@Module({
  providers: [CompanyResolver, CompanyService, ...companiesProviders],
  exports: [CompanyService]
})
export class CompanyModule {}
