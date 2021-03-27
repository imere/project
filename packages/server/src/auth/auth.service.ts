import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import {
  FindUserDto,
} from '@package/shared/src/design/dto/user';
import { pick } from '@package/shared/src/util/object';
import { Model } from 'mongoose';
import { CryptService } from '../crypt/crypt.service';
import {
  User,
  UserDocument,
} from '../schema/user';
import {
  JwtTokenPayload,
  UserPayload,
} from '../types/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    private readonly cryptService: CryptService
  ) { }

  async updateUserById(id: string, user: Partial<User>): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, user, { upsert: false }).exec();
  }

  async validateUser(user: FindUserDto): Promise<UserDocument | null> {
    const res = await this.userModel.findOne({
      username: user.username,
    }).exec();

    if (!res) return null;

    if (this.cryptService.decPassword(res.password) !== user.password) return null;

    return res;
  }

  async sign(user: UserPayload): Promise<JwtTokenPayload> {
    return {
      access_token: this.jwtService.sign(pick(user, ['username', 'lastLogin'])),
    };
  }
}
