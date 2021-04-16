import { INestApplication } from '@nestjs/common';
import compression from 'compression';
import { useFilter } from './filter';
import { useSecurity } from './security';
import { useSession } from './session';
import { useSwagger } from './swagger';

export function registerMiddleware(app: INestApplication): void {
  app.use(compression());

  [
    useFilter,
    useSecurity,
    useSession,
    useSwagger,
  ]
    .forEach(fn => fn(app));
}
