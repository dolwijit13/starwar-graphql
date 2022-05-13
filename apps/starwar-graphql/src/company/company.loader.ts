import DataLoader = require('dataloader');

import { Company } from './company.entity';
import { CompanyService } from './company.service';
import redis = require('redis')

const ONE_HOUR = 60 * 60;

const client = redis.createClient({
  url: process.env.redis_url,
});
client.connect()

export const createCompaniesLoader = (companiesService: CompanyService) => {
  return new DataLoader<number, Company>(async (ids: number[]) => {
    const dataFromRedis = await client.mGet(ids.map((id: number) => `company_${id}`))
    const companiesFromRedis = dataFromRedis.map((data) => JSON.parse(data) as Company)
    console.log(dataFromRedis)
    if(dataFromRedis.includes(null)) {
      const results = await companiesService.getCompaniesByIds(ids);
      const clientMulti = client.multi();
      results.forEach((company: Company) => {
        clientMulti.set(`company_${company.id}`, JSON.stringify(company), {
          EX: ONE_HOUR
        })
      });
      clientMulti.exec(false)

      return results;
    }

    return companiesFromRedis;
  });
}
