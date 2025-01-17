import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class User {
  @ApiProperty()
  @Prop({
    required: true,
    unique: true,
  })
  username!: string

  @ApiProperty()
  @Prop({ required: true })
  password!: string

  @ApiProperty()
  @Prop({ required: true })
  passwordEnctype!: string

  @ApiProperty({ required: false })
  @Prop()
  email?: string

  @ApiProperty({ required: false })
  @Prop({ required: true })
  createdAt!: number

  @ApiProperty()
  @Prop({ required: true })
  lastLogin!: number
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
