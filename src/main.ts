import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthExceptionFilter } from './filters/auth-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',');

  if (!allowedOrigins || allowedOrigins.length === 0) {
    throw new Error('ALLOWED_ORIGINS environment variable is not set or is empty');
  }

  app.enableCors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.useGlobalFilters(new AuthExceptionFilter());

  await app.listen(3001);
}
bootstrap();
