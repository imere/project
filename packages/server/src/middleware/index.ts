import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';
import compression from 'compression';
import session from 'express-session';
import connectRedis from 'connect-redis';
import redis from 'redis';
import passport from 'passport';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';
import env from '../util/env';
import { AllExceptionsFilter } from '../globals/filter';

export function registerMiddleware(app: INestApplication): void {
  app.useGlobalFilters(new AllExceptionsFilter());


  app.use(helmet({
    dnsPrefetchControl: {
      allow: true,
    },
  }));


  app.use(compression());


  const RedisStore = connectRedis(session);
  app.use(
    session({
      secret: env.auth.secret.session,
      cookie: {
        maxAge: 1000 * 60 * 60,
      },
      resave: false,
      saveUninitialized: false,
      store: new RedisStore({
        client: redis.createClient({
          host: env.session.redis.HOST,
          port: env.session.redis.PORT,
        }),
      }),
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());


  const config = new DocumentBuilder()
    .setTitle('Doc')
    .setDescription('The API doc')
    .setVersion('0.0')
    .addTag('Doc tag')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}
