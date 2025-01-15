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
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

import { CreateUserUseCase } from '@/use-cases/user/create-user.use-case';
import { UserAlreadyExistsException } from '@/use-cases/user/errors/user-already-exists-exception';

import { CreateUserDto } from '../../dto/user/create-user.dto';
import { ApiKeyAuthGuard } from '../../guards/api-key-auth.guard';
import { HttpCreatedUserResponse } from '../../swagger/responses/user/create-user.response';
import { HttpBadRequestUserResponse } from '../../swagger/responses/user/http-bad-request.response';
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
    description: 'Bad Request',
    type: HttpBadRequestUserResponse,
  })
  async handle(@Res() res, @Body() body: CreateUserDto) {
    const response = await this.createUserUseCase.execute(body);

    if (response.isLeft()) {
      const error = response.value;

      switch (error.constructor) {
        case UserAlreadyExistsException:
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
