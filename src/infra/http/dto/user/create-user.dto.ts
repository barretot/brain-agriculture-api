import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'name' })
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ description: 'email' })
  @IsEmail()
  email!: string;

  @ApiProperty({ description: 'password' })
  @IsNotEmpty()
  password!: string;
}
