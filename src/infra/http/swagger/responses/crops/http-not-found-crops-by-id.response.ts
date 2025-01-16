import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class HttpNotFoundCropsByIdResponse {
  @ApiProperty({ example: HttpStatus.NOT_FOUND })
  statusCode!: string;

  @ApiProperty({
    example: '/api/crops/8aae8577-1c26-4dc4-a881-e498ff364516',
  })
  path!: string;

  @ApiProperty({
    example: 'Crop 8aae8577-1c26-4dc4-a881-e498ff364516 not found.',
  })
  message!: string;

  @ApiProperty({ example: 'Not Found' })
  error!: string;
}
