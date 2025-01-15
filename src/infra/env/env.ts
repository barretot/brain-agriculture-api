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

  @IsNotEmpty()
  @IsString()
  readonly DATABASE_URL!: string;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  readonly ARGON2_TIME_COST!: number;

  @IsNotEmpty()
  @IsString()
  readonly JWT_PRIVATE_KEY!: string;

  @IsNotEmpty()
  @IsString()
  readonly JWT_PUBLIC_KEY!: string;

  @IsNotEmpty()
  @IsString()
  readonly API_KEY!: string;

  @IsInt()
  readonly PORT: number = 3333;
}
