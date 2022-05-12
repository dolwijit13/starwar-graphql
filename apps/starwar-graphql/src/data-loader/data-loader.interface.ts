import DataLoader from 'dataloader';
import { Company } from '../companies/company.entity';

export interface IDataloaders {
  companiesLoader: DataLoader<number, Company>;
}
