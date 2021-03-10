import {
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  username!: string;

  @ApiProperty()
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
  @ApiProperty({ required: false })
  @IsString()
  username!: string;

  @ApiProperty()
  @IsString()
  password!: string;
}
