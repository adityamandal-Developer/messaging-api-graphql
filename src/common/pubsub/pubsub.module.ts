import { Global, Module } from '@nestjs/common';
import { INJECTION_TOKEN } from '../constants/injection-token';
import { PubSub } from 'graphql-subscriptions';

@Global()
@Module({
  providers: [
    {
      provide: INJECTION_TOKEN,
      useValue: new PubSub(),
    },
  ],
  exports: [INJECTION_TOKEN],
})
export class PubSubModule {}
