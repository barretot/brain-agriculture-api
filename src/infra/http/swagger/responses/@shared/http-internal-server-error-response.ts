import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class HttpInternalServerErrorResponse {
  @ApiProperty({ example: HttpStatus.INTERNAL_SERVER_ERROR })
  statusCode!: string;

  @ApiProperty({ example: 'Internal server error' })
  message!: string;
}
