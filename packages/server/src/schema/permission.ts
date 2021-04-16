import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Permission {
  @ApiProperty()
  @Prop({
    required: true,
    unique: true,
  })
  userId!: string

  @ApiProperty()
  @Prop({ default: () => [] })
  roles!: string[]
}

export type PermissionDocument = Permission & Document;

export const PermissionSchema = SchemaFactory.createForClass(Permission);
