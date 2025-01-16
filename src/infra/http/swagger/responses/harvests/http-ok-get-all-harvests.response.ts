import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class HarvestsDto {
  @ApiProperty({ example: '610db7bf-ec40-43bb-9797-102d59b96ed5' })
  id!: string;

  @ApiProperty({ example: '2010' })
  year!: string;
}

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

export class HttpOkGetAllHarvestsResponse {
  @ApiProperty({ example: HttpStatus.CREATED })
  statusCode!: number;

  @ApiProperty({ type: [FarmDto] })
  farms!: FarmDto[];

  @ApiProperty({ type: [HarvestsDto] })
  harvests!: HarvestsDto[];
}
