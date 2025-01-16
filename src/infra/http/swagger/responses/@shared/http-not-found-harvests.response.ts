import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class HttpNotFoundHarvestsResponse {
  @ApiProperty({ example: HttpStatus.NOT_FOUND })
  statusCode!: string;

  @ApiProperty({
    example: '/api/harvests/8aae8577-1c26-4dc4-a881-e498ff364516',
  })
  path!: string;

  @ApiProperty({
    example: 'Harvests 8aae8577-1c26-4dc4-a881-e498ff364516 not found.',
  })
  message!: string;

  @ApiProperty({ example: 'Not Found' })
  error!: string;
}
