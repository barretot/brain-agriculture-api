import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class HttpBadRequestLimitExceededResponse {
  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  statusCode!: string;

  @ApiProperty({
    example: '/api/crops/8aae8577-1c26-4dc4-a881-e498ff364516',
  })
  path!: string;

  @ApiProperty({
    example: 'The arable area 800 is smaller than the harvest area 600000.',
  })
  message!: string;

  @ApiProperty({ example: 'Bad Request' })
  error!: string;
}
