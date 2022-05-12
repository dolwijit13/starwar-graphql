import { Inject, Injectable } from '@nestjs/common';
import { Company } from './company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('COMPANIES_REPOSITORY')
    private companiesRepository: typeof Company
  ) {}

  async findAll(): Promise<Company[]> {
    return this.companiesRepository.findAll<Company>();
  }

  async findOne(id: number): Promise<Company> {
    console.log(`loading Company ${id}`)
    return this.companiesRepository.findOne<Company>({ where: { id } });
  }

  async createCompany(name: string): Promise<Company> {
    return this.companiesRepository.create({
      name,
    })
  }

  async getCompaniesByIds (companyIds: number[]): Promise<Array<Company | Error>> {
    console.debug(`loading ids ${companyIds}`);
    const companies = await this.findAll()
    const results = companies.filter((company) => companyIds.includes(company.id));
    const mappedResults = companyIds.map(
      (id) =>
        results.find((result) => result.id === id) ||
        new Error(`Could not load company ${id}`),
    );
    return mappedResults;
  }
}
