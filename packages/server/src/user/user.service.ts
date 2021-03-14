import { CryptService } from '../crypt/crypt.service';
import { UTC } from '@package/shared/src/util/time';
import {
  CreateUserDto,
  FindUserDto,
  UpdateUserDto,
} from '@package/shared/src/design/dto/user';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  User,
  UserDocument,
} from '../schema/user';
import { EncType } from '@package/shared/src/design/types/encryption';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly cryptService: CryptService
  ) { }

  async findOne(user: Partial<FindUserDto>): Promise<UserDocument | null> {
    return this.userModel.findOne(user).exec();
  }

  async create(user: CreateUserDto): Promise<UserDocument> {
    const query: User = {
      ...user,
      passwordEnctype: EncType.RSA,
      password: this.cryptService.encPassword(user.password),
      createdAt: UTC.MILLIS(),
      lastLogin: 0,
    };
    const res = new this.userModel(query);
    return res.save();
  }

  async updateById(id: string, user: Partial<UpdateUserDto>): Promise<UserDocument | null> {
    return this.userModel.findByIdAndUpdate(id, user).exec();
  }

  async removeById(id: string): Promise<UserDocument | null> {
    return this.userModel.findByIdAndRemove(id).exec();
  }
}
