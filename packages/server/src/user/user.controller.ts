import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Put,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  PickType,
} from '@nestjs/swagger';
import {
  CreateUserDto,
  UpdateUserDto,
} from '@package/shared/src/design/dto/user';
import {
  ResponseBuilder,
  ResponseShape,
  ServerResponse,
} from '@package/shared/src/design/types/response';
import { isNullOrUndef, pick } from '@package/shared/src/util/object';
import { Request } from 'express';
import { SessionGuard } from '../auth/methods/session.guard';
import { ValidationPipe } from '../globals/validation.pipe';
import { User } from '../schema/user';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({ description: 'Get user info' })
  @ApiResponse({ status: 200, type: PickType(User, ['username', 'email', 'lastLogin']) })
  @UseGuards(SessionGuard)
  @Get()
  @HttpCode(200)
  async get(@Req() req: Request): Promise<ServerResponse> {
    return ResponseBuilder.create(pick(req.user, ['username', 'email', 'lastLogin']));
  }

  @ApiOperation({ description: 'Register' })
  @ApiResponse({ status: 200, type: ResponseShape, description: 'no data if success' })
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
  async update(@Req() req: Request, @Body() userDto: UpdateUserDto, @Session() session: NonNullable<Request['session']>): Promise<void> {
    await this.userService.updateById(req.user._id, userDto);
    if (!isNullOrUndef(userDto.password)) session.destroy(() => undefined);
  }

  @ApiOperation({ description: 'Delete user' })
  @UseGuards(SessionGuard)
  @Delete()
  @HttpCode(204)
  async remove(@Req() req: Request, @Session() session: NonNullable<Request['session']>): Promise<void> {
    await this.userService.removeById(req.user._id);
    session.destroy(() => undefined);
  }
}
