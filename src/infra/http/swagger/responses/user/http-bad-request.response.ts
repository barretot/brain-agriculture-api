import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class HttpBadRequestUserResponse {
  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  statusCode!: string;

  @ApiProperty({ example: '/api/user' })
  path!: string;

  @ApiProperty({ example: 'User "john.doe@test.com" already exists.' })
  message!: string;

  @ApiProperty({ example: 'Bad Request' })
  error!: string;
}
