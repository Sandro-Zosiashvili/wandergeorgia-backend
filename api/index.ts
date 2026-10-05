import 'reflect-metadata';
import type { IncomingMessage, ServerResponse } from 'http';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { configureApp } from '../src/setup';

type NodeHandler = (req: IncomingMessage, res: ServerResponse) => void;

// Reuse the booted Nest app across warm invocations; only cold starts pay the
// init (and TypeORM connect) cost. A single in-flight promise de-dupes
// concurrent cold-start requests.
let server: NodeHandler | null = null;
let booting: Promise<NodeHandler> | null = null;

async function bootstrap(): Promise<NodeHandler> {
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn'] });
  configureApp(app);
  await app.init();
  // The default platform is Express; its instance is a (req, res) handler.
  return app.getHttpAdapter().getInstance() as NodeHandler;
}

/** Vercel serverless entry — all routes are proxied here via vercel.json. */
export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  if (!server) {
    booting ??= bootstrap();
    server = await booting;
  }
  server(req, res);
}
