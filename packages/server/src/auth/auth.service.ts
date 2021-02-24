import {
  User,
  UserDocument,
} from '@packages/server/schema/user';
import {
  FindUserDto,
} from '@packages/shared/design/dto/user';
import { pick } from '@packages/shared/util/object';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  JwtTokenPayload,
  UserPayload,
} from '../types/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService
  ) { }

  async updateUserById(id: string, user: Partial<User>): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, user, { upsert: false }).exec();
  }

  async validateUser(user: FindUserDto): Promise<UserDocument | null> {
    const res = await this.userModel.findOne({
      username: user.username,
    }).exec();

    if (!res) return null;

    return res;
  }

  async sign(user: UserPayload): Promise<JwtTokenPayload> {
    return {
      access_token: this.jwtService.sign(pick(user, ['username', 'lastLogin'])),
    };
  }
}
