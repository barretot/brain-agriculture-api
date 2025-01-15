import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class HttpConflictUserResponse {
  @ApiProperty({ example: HttpStatus.CONFLICT })
  statusCode!: string;

  @ApiProperty({ example: '/api/user' })
  path!: string;

  @ApiProperty({ example: 'User "john.doe@test.com" already exists.' })
  message!: string;

  @ApiProperty({ example: 'Conflict' })
  error!: string;
}
