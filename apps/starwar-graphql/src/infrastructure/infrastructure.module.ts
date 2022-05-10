import { Module } from '@nestjs/common';
import { StarwarAdapter } from './starwar.adapter';

@Module({
  providers: [StarwarAdapter],
  exports: [StarwarAdapter],
})
export class InfrastructureModule {}
