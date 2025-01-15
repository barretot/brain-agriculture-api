import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateAuthenticateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email!: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password!: string
}
