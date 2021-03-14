import { pick } from '@package/shared/src/util/object';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';
import env from '../../util/env';
import { UserPayload } from '../../types/jwt';

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
