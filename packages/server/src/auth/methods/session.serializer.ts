import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserPayload } from '../../types/jwt';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: UserPayload, done: (err: Error | null, user: UserPayload) => void): void {
    done(null, user);
  }

  deserializeUser(payload: string, done: (err: Error | null, payload: string) => void): void {
    done(null, payload);
  }
}
