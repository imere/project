import { Request } from 'express';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class PasswordGuard extends AuthGuard('password') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const res = await super.canActivate(context) as boolean;

    await super.logIn(context.switchToHttp().getRequest<Request>());

    return res;
  }

  handleRequest<TUser extends Request['user']>(err: unknown, user: TUser | null): TUser {
    if (err || !user) throw err ?? new UnauthorizedException();

    return user;
  }
}
