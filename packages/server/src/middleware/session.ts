import { INestApplication } from '@nestjs/common';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import passport from 'passport';
import env from '../util/env';

export function useSession(app: INestApplication): void {
  // const RedisStore = connectRedis(session);
  // const store = new RedisStore({
  //   client: redis.createClient({
  //     host: env.session.redis.HOST,
  //     port: env.session.redis.PORT,
  //   }),
  // }),

  const store = MongoStore.create({
    mongoUrl: env.DB_MONGO,
    dbName: '_session',
  });

  app.use(
    session({
      secret: env.auth.secret.session,
      cookie: {
        maxAge: 1000 * 60 * 60,
      },
      resave: false,
      saveUninitialized: false,
      store,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
}
