import { Inject, Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { RedisClientType } from 'redis';
import { CompaniesService } from '../companies/companies.service';
import { Company } from '../companies/company.entity';
import { IDataloaders } from './data-loader.interface';

const REDIS_KEY_EXPIRE_TIME = 30 * 60;

@Injectable()
export class DataloaderService {
  constructor(
    @Inject('DATA_LOADER_REDIS') private dataLoaderRedis: RedisClientType,
    private readonly companiesService: CompaniesService
  ) {}

  async createLoaders(): Promise<IDataloaders> {
    const companiesLoader = new DataLoader<number, Company>(
      async (keys: number[]) => {
        const redisData = await this.dataLoaderRedis.mGet(
          keys.map((k) => `company_${k}`)
        );
        if (!redisData.includes(null)) {
          return redisData.map((data) => JSON.parse(data));
        }
        const companies = await this.companiesService.getCompaniesByBatch(
          keys as number[]
        );
        companies.forEach((company: Company) =>
          this.dataLoaderRedis.set(
            `company_${company.id}`,
            JSON.stringify(company),
            {
              EX: REDIS_KEY_EXPIRE_TIME,
            }
          )
        );
        return companies;
      }
    );

    return {
      companiesLoader,
    };
  }
}
