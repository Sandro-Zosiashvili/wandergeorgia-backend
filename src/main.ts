import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { configureApp } from './setup';

/** Local / long-running server entry (not used on Vercel — see api/index.ts). */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  configureApp(app);

  const port = process.env.PORT ?? 4000;
  await app.listen(port);
  Logger.log(`WanderKartli backend listening on port ${port}`, 'Bootstrap');
}

void bootstrap();
