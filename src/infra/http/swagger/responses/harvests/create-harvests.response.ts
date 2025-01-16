import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class HttpCreatedHarvestsResponse {
  @ApiProperty({ example: HttpStatus.CREATED })
  statusCode!: string;

  @ApiProperty({ description: '', example: 'Harvests created' })
  message!: string;
}
