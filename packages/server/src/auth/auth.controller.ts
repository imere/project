import { UTC } from '@packages/shared/util/time';
import { Request } from 'express';
import { AuthService } from './auth.service';
import {
  ResponseBuilder,
  ServerResponse,
} from '@packages/shared/design/types/response';
import { LoginUserDto } from '@packages/shared/design/dto/user';
import {
  Controller,
  HttpCode,
  Post,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';
import { PasswordGuard } from './methods/password.guard';
import { SessionGuard } from './methods/session.guard';
import {
  ApiBody,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ description: 'Login' })
  @ApiBody({
    type: LoginUserDto,
  })
  @UseGuards(PasswordGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Req() req: Request): Promise<ServerResponse> {
    const res = this.authService.updateUserById(req.user._id, { lastLogin: UTC.MILLIS() });

    return ResponseBuilder.create(res);
  }


  @ApiOperation({ description: 'Logout' })
  @UseGuards(SessionGuard)
  @Post('logout')
  @HttpCode(200)
  async logout(@Session() session: NonNullable<Request['session']>): Promise<ServerResponse> {

    session.destroy(() => undefined);

    return ResponseBuilder.create(undefined);
  }
}
