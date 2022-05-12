import { Module } from '@nestjs/common';
import { CompaniesModule } from '../companies/companies.module';
import { usersProviders } from './users.providers';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [CompaniesModule],
  providers: [UsersResolver, UsersService, ...usersProviders],
})
export class UsersModule {}
