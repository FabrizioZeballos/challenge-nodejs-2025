import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Validation } from './pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(Validation);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
