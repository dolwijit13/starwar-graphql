import { Module } from '@nestjs/common';
import { CompanyModule } from '../company/company.module';
import { usersProviders } from './user.provider';

import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [CompanyModule],
  providers: [UserResolver, UserService, ...usersProviders],
})
export class UserModule {}
