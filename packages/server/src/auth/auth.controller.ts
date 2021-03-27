import {
  Controller,
  HttpCode,
  Post,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginUserDto } from '@package/shared/src/design/dto/user';
import {
  ResponseBuilder,
  ResponseShape,
  ServerResponse,
} from '@package/shared/src/design/types/response';
import { UTC } from '@package/shared/src/util/time';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { PasswordGuard } from './methods/password.guard';
import { SessionGuard } from './methods/session.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ description: 'Login' })
  @ApiBody({
    type: LoginUserDto,
  })
  @ApiResponse({ status: 200, type: ResponseShape, description: 'no data if success' })
  @UseGuards(PasswordGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Req() req: Request): Promise<ServerResponse> {
    await this.authService.updateUserById(req.user._id, { lastLogin: UTC.MILLIS() });

    return ResponseBuilder.create(undefined);
  }

  @ApiOperation({ description: 'Logout' })
  @ApiResponse({ status: 200, type: ResponseShape, description: 'no data if success' })
  @UseGuards(SessionGuard)
  @Post('logout')
  @HttpCode(200)
  async logout(@Session() session: NonNullable<Request['session']>): Promise<ServerResponse> {

    session.destroy(() => undefined);

    return ResponseBuilder.create(undefined);
  }
}
