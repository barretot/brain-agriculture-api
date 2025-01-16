import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCropDto {
  @IsNotEmpty({ message: 'Area is required' })
  @ApiProperty({ description: 'crop area', example: '1000' })
  area!: number;

  @IsNotEmpty({ message: 'Crop name is required' })
  @ApiProperty({ description: 'Harvests Year', example: 'Soja' })
  cropName!: string;
}
