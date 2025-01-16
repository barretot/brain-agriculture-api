import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class HttpBadRequestHarvestsResponse {
  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  statusCode!: string;

  @ApiProperty({
    example: '/api/harvests/9739cb43-e078-4085-b7a9-1700dadeec4d',
  })
  path!: string;

  @ApiProperty({
    example: 'Year must be a valid 4-digit number between 1900 and 2025',
  })
  message!: string;

  @ApiProperty({ example: 'Bad Request' })
  error!: string;
}
