import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { registerMiddleware } from './middleware';
import env from './util/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['verbose'],
  });

  registerMiddleware(app);

  await app.listen(env.PORT, env.HOST, () => {
    console.log(`Listening on ${env.HOST}:${env.PORT}`);
  });
}

bootstrap();
