import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class HttpNotFoundFarmResponse {
  @ApiProperty({ example: HttpStatus.NOT_FOUND })
  statusCode!: string;

  @ApiProperty({ example: '/api/farm' })
  path!: string;

  @ApiProperty({
    example:
      'User 8aae8577-1c26-4dc4-a881-e498ff364516 has no farms registered.',
  })
  message!: string;

  @ApiProperty({ example: 'Bad Request' })
  error!: string;
}
