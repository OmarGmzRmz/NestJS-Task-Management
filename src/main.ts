import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const environment = process.env.STAGE;
  const port = 3000;
  await app.listen(port);
  const msg = `Application listening on port ${port} under ${environment} environment`;
  logger.log(msg);
}
bootstrap();
