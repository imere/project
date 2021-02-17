import { Body, Controller, HttpCode, Post, Put } from '@nestjs/common';
import { Response, ServerResponse } from '@packages/shared/design/struct';
import { CreateUser, LoginUser } from '@packages/shared/design/dto/user';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Post()
  async login(@Body() user: LoginUser): Promise<ServerResponse> {
    return Response.build(await this.userService.findOne(user));
  }

  @Put()
  @HttpCode(201)
  async register(@Body() user: CreateUser): Promise<ServerResponse> {
    await this.userService.create(user);
    return Response.build(null);
  }
}
