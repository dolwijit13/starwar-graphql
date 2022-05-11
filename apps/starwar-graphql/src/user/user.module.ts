import { Module } from '@nestjs/common';
import { usersProviders } from './user.provider';

import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  providers: [UserResolver, UserService, ...usersProviders],
})
export class UserModule {}
