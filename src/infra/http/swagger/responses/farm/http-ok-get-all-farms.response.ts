import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class FarmDto {
  @ApiProperty({ example: '8d7033d8-f65b-468e-82b4-cf7d727eb352' })
  id!: string;

  @ApiProperty({ example: 'Fazenda Família Doe' })
  name!: string;

  @ApiProperty({ example: 'Minas Gerais' })
  city!: string;

  @ApiProperty({ example: 'MG' })
  state!: string;

  @ApiProperty({ example: 1000 })
  totalArea!: number;

  @ApiProperty({ example: 600 })
  arableArea!: number;

  @ApiProperty({ example: 400 })
  vegetationArea!: number;
}

export class HttpOkGetAllFarmsResponse {
  @ApiProperty({ example: HttpStatus.CREATED })
  statusCode!: number;

  @ApiProperty({ type: [FarmDto] })
  farms!: FarmDto[];
}
