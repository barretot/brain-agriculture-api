import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class HttpBadRequestFarmResponse {
  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  statusCode!: string;

  @ApiProperty({ example: '/api/farm' })
  path!: string;

  @ApiProperty({
    example:
      'A soma da área agricultável da fazenda (1500) e área de vegetação (111) não pode exceder a área total da fazenda (1000).',
  })
  message!: string;

  @ApiProperty({ example: 'Bad Request' })
  error!: string;
}
