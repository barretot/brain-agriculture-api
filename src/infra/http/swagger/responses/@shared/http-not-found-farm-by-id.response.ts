import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class HttpNotFoundByIdFarmResponse {
  @ApiProperty({ example: HttpStatus.NOT_FOUND })
  statusCode!: string;

  @ApiProperty({ example: '/api/farm' })
  path!: string;

  @ApiProperty({
    example: 'Farm 8aae8577-1c26-4dc4-a881-e498ff364516 not found.',
  })
  message!: string;

  @ApiProperty({ example: 'Not Found' })
  error!: string;
}
