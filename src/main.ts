import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthExceptionFilter } from './filters/auth-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log', 'verbose'], // デバッグ用
  });

  app.useGlobalFilters(new AuthExceptionFilter());

  await app.listen(3001);
}
bootstrap();
