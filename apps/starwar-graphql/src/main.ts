/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import configuration from '@/config/configuration';
import { Logger } from '@nestjs/common';
import { LazyModuleLoader, NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  const lazyModuleLoader = app.get(LazyModuleLoader);
  const { DatabaseModule } = await import('./database/database.module');
  await lazyModuleLoader.load(() =>
    DatabaseModule.register({
      dialect: 'postgres',
      database: configuration().db,
      host: configuration().dbHost,
      port: +configuration().dbPort,
      username: configuration().dbUsername,
      password: configuration().dbPassword,
    })
  );

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
