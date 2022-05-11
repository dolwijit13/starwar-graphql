import { Module } from '@nestjs/common';

import { PeopleResolver } from './people.resolver';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';

@Module({
  imports: [
    InfrastructureModule
  ],
  providers: [PeopleResolver],
})
export class PeopleModule {}
