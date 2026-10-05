import { INestApplication, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

/**
 * Shared app configuration applied in both the local server (main.ts) and the
 * Vercel serverless handler (api/index.ts), so the two never drift apart.
 */
export function configureApp(app: INestApplication): void {
  // Read HttpOnly auth cookies (JwtStrategy pulls the token from here).
  app.use(cookieParser());

  const rawOrigins = process.env.FRONTEND_ORIGIN;
  const allowedOrigins = rawOrigins
    ? rawOrigins.split(',').map((o) => o.trim()).filter(Boolean)
    : [
        'https://wanderkartli.com',
        'https://www.wanderkartli.com',
        'http://localhost:3000',
      ];

  // Robust CORS for browsers (handles OPTIONS preflight automatically).
  app.enableCors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  });

  // Validate every incoming DTO; strip unknown fields; reject extras.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
}
