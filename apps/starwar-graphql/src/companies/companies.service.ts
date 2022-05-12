import { Inject, Injectable } from '@nestjs/common';
import { Company } from './company.entity';
import { CreateCompanyInput } from './dto/create-company.input';

@Injectable()
export class CompaniesService {
  constructor(
    @Inject('COMPANIES_REPOSITORY') private companiesRepository: typeof Company
  ) {}

  async getAllCompanies(): Promise<Company[]> {
    return this.companiesRepository.findAll<Company>();
  }

  async createCompany(
    createCompanyInput: CreateCompanyInput
  ): Promise<Company> {
    const newCompany = this.companiesRepository.build(createCompanyInput);
    return newCompany.save();
  }

  async getCompanyByID(id: number): Promise<Company> {
    return this.companiesRepository.findOne<Company>({ where: { id } });
  }
}
