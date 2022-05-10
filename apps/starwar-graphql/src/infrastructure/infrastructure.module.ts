import { Module } from '@nestjs/common';
import { StarWarAdapter } from './starWar.adapter';

@Module({
  providers: [StarWarAdapter],
  exports: [StarWarAdapter]
})
export class InfrastructureModule {}
