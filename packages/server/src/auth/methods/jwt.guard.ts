import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserPayload } from '@packages/server/types/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<TUser extends UserPayload>(err: unknown, user: TUser | null): TUser {
    if (err || !user) throw err ?? new UnauthorizedException();

    return user;
  }
}
