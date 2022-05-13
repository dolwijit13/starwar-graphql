import { Company } from '../companies/company.entity';
import DataLoader = require('dataloader');

export interface IDataloaders {
  companiesLoader: DataLoader<number, Company>;
}
