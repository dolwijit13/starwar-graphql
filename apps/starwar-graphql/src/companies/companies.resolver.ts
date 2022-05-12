import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Company } from './company.entity';
import { CompaniesService } from './companies.service';
import { CreateCompanyInput } from './dto/create-company.input';

@Resolver((of) => Company)
export class CompaniesResolver {
  constructor(private companiesService: CompaniesService) {}

  @Query((returns) => [Company])
  async companies(): Promise<Company[]> {
    return this.companiesService.getAllCompanies();
  }

  @Mutation((returns) => Company)
  async createCompany(
    @Args('createCompanyInput') createCompanyInput: CreateCompanyInput
  ): Promise<Company> {
    return this.companiesService.createCompany(createCompanyInput);
  }
}
