import { pick } from '@packages/shared/util/object';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';
import env from '@packages/server/util/env';
import { UserPayload } from '@packages/server/types/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.auth.secret.jwt,
    });
  }

  async validate(payload: UserPayload): Promise<UserPayload> {
    return pick(payload, ['username', 'lastLogin']);
  }
}
