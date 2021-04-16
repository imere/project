import { INestApplication } from '@nestjs/common';
import { AllExceptionsFilter } from '../globals/filter';

export function useFilter(app: INestApplication): void {
  app.useGlobalFilters(new AllExceptionsFilter());
}
