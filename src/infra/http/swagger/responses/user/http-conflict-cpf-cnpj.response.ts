import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class HttpConflictUserCpfCnpjResponse {
  @ApiProperty({ example: HttpStatus.CONFLICT })
  statusCode!: string;

  @ApiProperty({ example: '/api/user' })
  path!: string;

  @ApiProperty({
    example: 'CPF/CNPJ already registered',
  })
  message!: string;

  @ApiProperty({ example: 'Conflict' })
  error!: string;
}
