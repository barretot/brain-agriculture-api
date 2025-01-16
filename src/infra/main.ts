import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import crypto from 'node:crypto';
import { join } from 'path';

import { AppModule } from './app.module';
import { Env } from './env/env';
import { HttpExceptionFilter } from './http/interceptors/http-exception.filter';
import { LoggingInterceptor } from './http/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'https://cdn.jsdelivr.net'],
        styleSrc: ["'self'", "'unsafe-inline'"],
        fontSrc: ["'self'", 'https://fonts.googleapis.com'],
        imgSrc: ["'self'", 'data:'],
      },
    }),
  );

  app.enableCors({
    origin: '*',
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type,Authorization,x-api-key',
  });

  app.use((req, res, next) => {
    const nonce = crypto.randomBytes(16).toString('base64');
    res.locals.nonce = nonce;
    res.setHeader(
      'Content-Security-Policy',
      `default-src 'self'; script-src 'self' 'nonce-${nonce}' https://cdn.jsdelivr.net; style-src 'self' 'nonce-${nonce}';`,
    );
    next();
  });

  app.setBaseViewsDir(join(__dirname, 'views'));

  app.setViewEngine('ejs');

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  const configService = app.get<ConfigService<Env, true>>(ConfigService);

  app.setGlobalPrefix('api');

  app.use('/', (req: Request, res: Response, next: NextFunction) => {
    if (req.url === '/') {
      return res.redirect(301, '/docs/v1');
    }
    next();
  });

  const config = new DocumentBuilder()
    .setTitle('NestJS Api')
    .setDescription('')
    .setVersion('1.0')
    .addApiKey(
      { type: 'apiKey', name: 'x-api-key', in: 'header' },
      'api-key', // Identificador
    )
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs/v1', app, document);

  const port = configService.get('PORT');

  await app.listen(port);
}
bootstrap();
