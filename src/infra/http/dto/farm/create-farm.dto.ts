import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

import { IsUltrapassedTotalArea } from './is-ultrapassed-total-area.validator';

export class CreateFarmDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'Farm name', example: 'Fazenda Família Doe' })
  name!: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Farm City', example: 'Minas Gerais' })
  city!: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Farm state', example: 'MG' })
  state!: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Farm total área', example: 1000 })
  @IsUltrapassedTotalArea()
  totalArea!: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Farm arable área', example: 600 })
  arableArea!: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Farm vegetation area', example: 400 })
  vegetationArea!: number;
}
