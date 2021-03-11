import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtGuard } from './jwt.guard';
import { SessionGuard } from './session.guard';

export function StrictGuard(): ReturnType<typeof applyDecorators> {
  return applyDecorators(
    UseGuards(JwtGuard),
    UseGuards(SessionGuard)
  );
}
