import { CreateUser, FindUser } from '@packages/shared/design/dto/user';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '@packages/server/schema/user';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  findOne(user: FindUser): Promise<UserDocument | null> {
    return this.userModel.findOne(user).exec();
  }

  create(user: CreateUser): Promise<User> {
    const res = new this.userModel(user);
    return res.save();
  }
}
