import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class HarvestDto {
  @ApiProperty({ example: '8d7033d8-f65b-468e-82b4-cf7d727eb352' })
  id!: string;

  @ApiProperty({ example: '0c04b19a-04c8-4931-a64d-f24357b9071b' })
  farmId!: string;

  @ApiProperty({ example: 'c8403b92-2e42-44bf-9236-6a2e96e6805d' })
  harvestId!: string;

  @ApiProperty({ example: '2023' })
  year!: string;
}

export class HttpOkGetByIdHarvestResponse {
  @ApiProperty({ example: HttpStatus.CREATED })
  statusCode!: number;

  @ApiProperty({ type: HarvestDto })
  farms!: HarvestDto[];
}
