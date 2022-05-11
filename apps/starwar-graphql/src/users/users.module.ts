import { Module } from '@nestjs/common';
import { usersProviders } from './users.providers';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  providers: [UsersResolver, UsersService, ...usersProviders],
})
export class UsersModule {}
