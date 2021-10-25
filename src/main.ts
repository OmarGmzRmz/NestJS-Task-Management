import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.use(LoggerMiddleware);
  app.useGlobalPipes(new ValidationPipe());
  const environment = process.env.STAGE;
  const port = 3000;
  await app.listen(port);
  const msg = `Application listening on port ${port} under ${environment} environment\n`;
  logger.log(msg);
}
bootstrap();
