import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';
import compression from 'compression';
import session from 'express-session';
import connectRedis from 'connect-redis';
import redis from 'redis';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import env from '../util/env';
import { AllExceptionsFilter } from '../exception';

export function registerMiddleware(app: INestApplication): void {

  app.useGlobalFilters(new AllExceptionsFilter());

  app.use(helmet());

  app.use(compression());

  const RedisStore = connectRedis(session);
  app.use(
    session({
      secret: 'cab98d7bfca9e7bed09aef',
      resave: true,
      saveUninitialized: false,
      store: new RedisStore({
        client: redis.createClient({
          host: env.session.redis.HOST,
          port: env.session.redis.PORT,
        }),
      }),
    })
  );

  const config = new DocumentBuilder()
    .setTitle('Doc')
    .setDescription('The API doc')
    .setVersion('0.0')
    .addTag('doc')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}
