import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsString()
  username!: string;

  @ApiProperty({ required: true })
  @IsString()
  password!: string;
}

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  password?: string

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  email?: string
}

export class FindUserDto extends CreateUserDto {}

export class LoginUserDto {
  @ApiProperty({ required: true })
  @IsString()
  username!: string;

  @ApiProperty({ required: true })
  @IsString()
  password!: string;
}
