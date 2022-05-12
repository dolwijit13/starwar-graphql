import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Company } from './company.entity';
import { CompanyService } from './company.service';

@Resolver('Company')
export class CompanyResolver {
  constructor(
    private companyService: CompanyService,
  ) {}

  @Query(() => [Company])
  getAllCompanies() {
    return this.companyService.findAll();
  }

  @Query(() => Company)
  getCompany(@Args({ name: 'id' }) id: number) {
    return this.companyService.findOne(id);
  }

  @Mutation(() => Company)
  async createCompany(@Args({ name: 'name' }) name: string) {
    return this.companyService.createCompany(name);
  }
}
