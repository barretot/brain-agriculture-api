import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserValidator {
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsNotEmpty()
  password!: string;
}
