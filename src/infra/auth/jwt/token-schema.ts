import { IsString, IsUUID } from 'class-validator';

export class TokenSchema {
  @IsUUID()
  @IsString()
  sub!: string;
}
