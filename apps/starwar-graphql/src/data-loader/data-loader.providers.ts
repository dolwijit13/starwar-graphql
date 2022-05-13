import { Provider } from '@nestjs/common';
import configuration from '@/config/configuration';
import redis = require('redis');

export function createDataLoaderProvider(): Provider {
  return {
    provide: 'DATA_LOADER_REDIS',
    useFactory: async () => {
      const client = redis.createClient({
        url: configuration().redisUrl,
      });
      client.connect();
      return client;
    },
  };
}
