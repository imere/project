import { TextEngine } from '@packages/shared/design/types/presentation';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Post {
  @ApiProperty()
  @Prop({ required: true })
  userId!: string


  @ApiProperty()
  @Prop({ required: true })
  title!: string


  @ApiProperty()
  @Prop({ required: true })
  rawContent!: string


  @ApiProperty()
  @Prop({ required: true })
  engine!: string


  @ApiProperty()
  @Prop()
  createdAt!: number


  @ApiProperty()
  @Prop({ required: true })
  updatedAt!: number
}

export type PostDocument = Post & Document;

export const PostSchema = SchemaFactory.createForClass(Post);
