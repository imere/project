import { IsEmail, IsOptional, IsString, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { isNullOrUndef } from '../../util/object';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  username!: string;

  @ApiProperty()
  @IsString()
  password!: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  email?: string
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
  @IsOptional()
  @ValidateIf(o => isNullOrUndef(o.email))
  username?: string;

  @ApiProperty()
  @IsString()
  password!: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  @ValidateIf(o => isNullOrUndef(o.username))
  email?: string;
}
