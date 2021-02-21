import { User } from '@packages/server/schema/user';
import { pick } from '@packages/shared/util/object';
import { ValidationPipe } from '../globals/validation.pipe';
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Patch,
  Post,
  Put,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';
import {
  ResponseBuilder,
  ServerResponse,
} from '@packages/shared/design/types';
import {
  CreateUserDto,
  UpdateUserDto,
} from '@packages/shared/design/dto/user';
import { UserService } from './user.service';
import { Request } from 'express';
import { SessionGuard } from '../auth/methods/session.guard';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  PickType,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({ description: 'Get user info' })
  @ApiResponse({ status: 200, type: PickType(User, ['username', 'email', 'roles', 'lastLogin']) })
  @UseGuards(SessionGuard)
  @Post()
  @HttpCode(200)
  async get(@Req() req: Request): Promise<ServerResponse> {
    return ResponseBuilder.create(pick(req.user, ['username', 'email', 'roles', 'lastLogin']));
  }

  @ApiOperation({ description: 'Register' })
  @Put()
  @HttpCode(201)
  async create(@Body(ValidationPipe) userDto: CreateUserDto): Promise<ServerResponse> {
    await this.userService.create(userDto);

    return ResponseBuilder.create(undefined);
  }

  @ApiOperation({ description: 'Update user info' })
  @UseGuards(SessionGuard)
  @Patch()
  @HttpCode(204)
  async update(@Req() req: Request, @Body() userDto: UpdateUserDto): Promise<void> {
    await this.userService.updateById(req.user._id, userDto);
  }

  @ApiOperation({ description: 'Delete user' })
  @UseGuards(SessionGuard)
  @Delete()
  @HttpCode(204)
  async remove(@Req() req: Request, @Session() session: Request['session']): Promise<void> {
    await this.userService.removeById(String(req.user._id));
    session?.destroy(() => undefined);
  }
}
