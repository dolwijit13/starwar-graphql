import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { CompaniesService } from '../companies/companies.service';
import { Company } from '../companies/company.entity';
import { IDataloaders } from './data-loader.interface';

@Injectable()
export class DataloaderService {
  constructor(private readonly companiesService: CompaniesService) {}

  async createLoaders(): Promise<IDataloaders> {
    const companiesLoader = new DataLoader<number, Company>(
      async (keys: readonly number[]) =>
        await this.companiesService.getCompaniesByBatch(keys as number[])
    );

    return {
      companiesLoader,
    };
  }
}
