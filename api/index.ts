import 'reflect-metadata';
import type { IncomingMessage, ServerResponse } from 'http';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { configureApp } from '../src/setup';

type NodeHandler = (req: IncomingMessage, res: ServerResponse) => void;

/** Env vars the app needs to boot — checked up front for a clear error. */
const REQUIRED_ENV = ['DATABASE_URL', 'JWT_SECRET'];

// Reuse the booted Nest app across warm invocations; only cold starts pay the
// init (and TypeORM connect) cost. A single in-flight promise de-dupes
// concurrent cold-start requests.
let server: NodeHandler | null = null;
let booting: Promise<NodeHandler> | null = null;

async function bootstrap(): Promise<NodeHandler> {
  const missing = REQUIRED_ENV.filter((k) => !process.env[k]);
  if (missing.length) {
    throw new Error(
      `Missing required environment variable(s): ${missing.join(', ')}. ` +
        `Set them in the Vercel project (Settings → Environment Variables) and redeploy.`,
    );
  }

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
  try {
    if (!server) {
      booting ??= bootstrap();
      server = await booting;
    }
    server(req, res);
  } catch (err) {
    // Surface the real boot failure instead of an opaque FUNCTION_INVOCATION_FAILED.
    booting = null; // let the next request retry (e.g. after env vars are added)
    const message = err instanceof Error ? err.message : String(err);
    // eslint-disable-next-line no-console
    console.error('[api] bootstrap failed:', err);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify({ error: 'Backend failed to start', detail: message }));
    }
  }
}
