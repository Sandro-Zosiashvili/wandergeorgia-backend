// import { NestFactory } from '@nestjs/core';
// import { ValidationPipe, Logger } from '@nestjs/common';
// import { AppModule } from './app.module';
//
// async function bootstrap(): Promise<void> {
//   const app = await NestFactory.create(AppModule);
//
//   // Only allow the frontend origin to call this API.
//   app.enableCors({
//     origin: process.env.FRONTEND_ORIGIN?.split(',').map((o) => o.trim()) ?? true,
//     methods: ['POST'],
//   });
//
//   // Validate every incoming DTO; strip unknown fields; reject extras.
//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true,
//       forbidNonWhitelisted: true,
//       transform: true,
//     }),
//   );
//
//   const port = process.env.PORT ?? 4000;
//   await app.listen(port);
//   Logger.log(`WanderKartli backend listening on http://localhost:${port}`, 'Bootstrap');
// }
//
// void bootstrap();
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);

    // Parse FRONTEND_ORIGIN into array or fallback
    const rawOrigins = process.env.FRONTEND_ORIGIN;
    const allowedOrigins = rawOrigins
        ? rawOrigins.split(',').map((o) => o.trim()).filter(Boolean)
        : [
            'https://wanderkartli.com',
            'https://www.wanderkartli.com',
            'http://localhost:3000',
        ];

    // Configure robust CORS for browsers (handles OPTIONS preflight automatically)
    app.enableCors({
        origin: allowedOrigins,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
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

    const port = process.env.PORT ?? 4000;
    await app.listen(port);
    Logger.log(`WanderKartli backend listening on port ${port}`, 'Bootstrap');
}

void bootstrap();