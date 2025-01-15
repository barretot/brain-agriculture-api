import {
  IsInt,
  IsString,
  Min,
  Max,
  IsOptional,
  IsNotEmpty,
  IsIn,
} from 'class-validator';

export class Env {
  @IsString()
  @IsOptional()
  readonly NODE_ENV!: string;

  @IsInt()
  @Min(2)
  @Max(2)
  @IsIn([0, 1, 2])
  @IsNotEmpty()
  readonly ARGON2_TYPE!: 0 | 1 | 2;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  readonly ARGON2_TIME_COST!: number;

  @IsInt()
  readonly PORT: number = 3333;
}
