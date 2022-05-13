import DataLoader = require('dataloader');

import { Company } from './company.entity';
import { CompanyService } from './company.service';
import redis = require('redis')

const client = redis.createClient({
  url: process.env.redis_url
});
client.connect()

export const createCompaniesLoader = (companiesService: CompanyService) => {
  return new DataLoader<number, Company>(async (ids: number[]) => {
    const dataFromRedis = await client.mGet(ids.map((id: number) => `company_${id}`))
    const companiesFromRedis = dataFromRedis.map((data) => JSON.parse(data) as Company)
    if(dataFromRedis.includes(null)) {
      const records = {}
      const results = await companiesService.getCompaniesByIds(ids);
      results.forEach((company: Company) => {
        records[`company_${company.id}`] = JSON.stringify(company);
      });
      client.mSet(records)

      return results;
    }

    return companiesFromRedis;
  });
}
