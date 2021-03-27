import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';

export function useSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Doc')
    .setDescription('The API doc')
    .setVersion('0.0')
    .addTag('Doc tag')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}
