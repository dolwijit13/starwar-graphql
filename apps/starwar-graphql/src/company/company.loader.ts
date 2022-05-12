import * as DataLoader from 'dataloader';

import { Company } from './company.entity';
import { CompanyService } from './company.service';

export const createCompaniesLoader = (companiesService: CompanyService) => {
  return new DataLoader<number, Company>(async (ids: number[]) => {
    return await companiesService.getCompaniesByIds(ids);
  });
}
