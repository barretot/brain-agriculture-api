import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'YearValidator', async: false })
export class YearValidator implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    const currentYear = new Date().getFullYear();

    const regex = /^(19|20)\d{2}$/;
    if (!regex.test(value)) {
      return false;
    }

    const year = parseInt(value, 10);
    return year <= currentYear;
  }

  defaultMessage(): string {
    const currentYear = new Date().getFullYear();
    return `Year must be a valid 4-digit number between 1900 and ${currentYear}`;
  }
}

export class CreateHarvestsDto {
  @IsNotEmpty({ message: 'Year is required' })
  @Validate(YearValidator)
  @ApiProperty({ description: 'Harvests Year', example: '2023' })
  year!: string;
}
