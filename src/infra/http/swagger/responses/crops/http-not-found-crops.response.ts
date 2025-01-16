import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class HttpNotFoundCropsResponse {
  @ApiProperty({ example: HttpStatus.NOT_FOUND })
  statusCode!: string;

  @ApiProperty({ example: '/api/crops' })
  path!: string;

  @ApiProperty({
    example: 'Crops not found',
  })
  message!: string;

  @ApiProperty({ example: 'Not Found' })
  error!: string;
}
