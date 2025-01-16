import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class HttpCreatedCropResponse {
  @ApiProperty({ example: HttpStatus.CREATED })
  statusCode!: string;

  @ApiProperty({ description: '', example: 'Crop created' })
  message!: string;
}
