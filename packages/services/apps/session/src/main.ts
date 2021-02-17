import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const url = 'redis://localhost:6379';
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.REDIS,
    options: {
      url,
    },
  });
  app.listen(() => {
    console.log(`[services.session] Listening on ${url}`);
  });
}

bootstrap();
