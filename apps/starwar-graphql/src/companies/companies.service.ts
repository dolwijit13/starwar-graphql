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

  async getCompaniesByBatch(
    companyIDs: number[]
  ): Promise<(Company | Error)[]> {
    const allCompanies = await this.getAllCompanies();
    const results = allCompanies.filter((company) =>
      companyIDs.includes(company.id)
    );
    const mappedResults = companyIDs.map(
      (id) =>
        results.find((result) => result.id === id) ||
        new Error(`Could not load company ${id}`)
    );
    return mappedResults;
  }
}
