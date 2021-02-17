import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Post {
  @Prop({ required: true })
  userId!: string

  @Prop({ required: true })
  title!: string

  @Prop({ required: true })
  rawContent!: string

  @Prop({ required: true })
  engine!: string

  @Prop()
  createdAt!: number

  @Prop({ required: true })
  updatedAt!: number
}

export type PostDocument = Post & Document;

export const PostSchema = SchemaFactory.createForClass(Post);
