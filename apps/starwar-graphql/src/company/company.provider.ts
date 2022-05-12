import { Company } from './company.entity';

export const companiesProviders = [
  {
    provide: 'COMPANIES_REPOSITORY',
    useValue: Company,
  },
];
