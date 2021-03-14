import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy,
} from 'passport-local';
import { AuthService } from '../auth.service';
import { UserDocument } from '../../schema/user';

@Injectable()
export class PasswordStrategy extends PassportStrategy(Strategy, 'password') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
      successRedirect: '/',
      failureRedirect: '/login',
    });
  }

  async validate(username: string, password: string): Promise<UserDocument> {
    const user = await this.authService.validateUser({ username, password });

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
