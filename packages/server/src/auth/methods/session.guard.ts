import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class SessionGuard extends AuthGuard('session') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const res = context.switchToHttp().getRequest<Request>().isAuthenticated();

    if (!res) throw new UnauthorizedException();

    return res;
  }
}
