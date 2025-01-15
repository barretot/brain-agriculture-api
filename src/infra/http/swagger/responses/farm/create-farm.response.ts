import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class HttpCreatedFarmResponse {
  @ApiProperty({ example: HttpStatus.CREATED })
  statusCode!: string;

  @ApiProperty({ description: '', example: 'Farm created' })
  message!: string;
}
