import { INestApplication } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { Request } from 'express';
import helmet from 'helmet';

export function useSecurity(app: INestApplication): void {
  app.use(helmet({
    dnsPrefetchControl: {
      allow: true,
    },
  }));


  app.enableCors(function (req: Request, callback) {
    const corsOptions: CorsOptions = {
      origin: [/^https?:\/\/(127\.0\.0\.1|localhost)/],
      methods: [req.method],
      credentials: true,
    };

    callback(null as unknown as Error, corsOptions);
  });
}
