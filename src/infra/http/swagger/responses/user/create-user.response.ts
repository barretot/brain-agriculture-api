import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class HttpCreatedUserResponse {
  @ApiProperty({ example: HttpStatus.CREATED })
  statusCode!: string;

  @ApiProperty({ description: 'Name of the user', example: 'User created' })
  message!: string;
}
