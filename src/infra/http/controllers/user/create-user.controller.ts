import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

import { CreateUserUseCase } from '@/use-cases/user/create-user.use-case';
import { UserAlreadyExistsCpfCnpjException } from '@/use-cases/user/errors/user-already-exists-cpf-cnpj-exception';
import { UserAlreadyExistsException } from '@/use-cases/user/errors/user-already-exists-exception';

import { CreateUserDto } from '../../dto/user/create-user.dto';
import { ApiKeyAuthGuard } from '../../guards/api-key-auth.guard';
import { HttpInternalServerErrorResponse } from '../../swagger/responses/@shared/http-internal-server-error-response';
import { HttpCreatedUserResponse } from '../../swagger/responses/user/create-user.response';
import { HttpConflictUserCpfCnpjResponse } from '../../swagger/responses/user/http-conflict-cpf-cnpj.response';
import { HttpConflictUserResponse } from '../../swagger/responses/user/http-conflict.response';

@ApiTags('User')
@ApiSecurity('api-key')
@Controller('/user')
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  @UseGuards(ApiKeyAuthGuard)
  @ApiOperation({ summary: 'Create user from db' })
  @ApiCreatedResponse({
    description: 'User Created',
    type: HttpCreatedUserResponse,
  })
  @ApiConflictResponse({
    description: 'Conflict',
    type: HttpConflictUserResponse,
  })
  @ApiBadRequestResponse({
    description: 'Conflict',
    type: HttpConflictUserCpfCnpjResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: HttpInternalServerErrorResponse,
  })
  async handle(@Res() res, @Body() body: CreateUserDto) {
    const response = await this.createUserUseCase.execute(body);

    if (response.isLeft()) {
      const error = response.value;

      switch (error.constructor) {
        case UserAlreadyExistsException:
          throw new ConflictException(error.message);
        case UserAlreadyExistsCpfCnpjException:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    return res
      .status(HttpStatus.CREATED)
      .send({ statusCode: HttpStatus.CREATED, message: 'User created' });
  }
}
