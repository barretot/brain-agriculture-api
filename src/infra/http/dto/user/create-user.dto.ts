import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumberString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'User name', example: 'John Doe' })
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ description: 'User email', example: 'john_doe@test.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ description: 'User CPF or CNPJ', example: '00630094047' })
  @IsNotEmpty()
  @IsNumberString()
  @Length(11, 14) // CPF = 11, CNPJ = 14
  cpfCnpj!: string;

  @ApiProperty({ description: 'User password', example: 'johnDoePassword' })
  @IsNotEmpty()
  password!: string;
}
