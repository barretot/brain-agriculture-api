import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class HttpDeletedHarvestsResponse {
  @ApiProperty({ example: HttpStatus.OK })
  statusCode!: string;

  @ApiProperty({
    example: 'Harvests 06fffe10-f2ef-4293-8a66-b4095a3f9876 deleted',
  })
  message!: string;
}
