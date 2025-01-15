import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateAuthenticateUseCase } from '@/use-cases/authenticate/create-authenticate.use-case';
import { WrongCredentialsError } from '@/use-cases/authenticate/errors/wrong-credentials-error';

import { CreateAuthenticateDto } from '../../dto/authenticate/create-authenticate.dto';
import { HttpAuthenticateResponse } from '../../swagger/responses/authenticate/authenticate-response';

@ApiTags('Authenticate')
@Controller('/sessions')
export class CreateAuthenticateController {
  constructor(private createAuthenticateUseCase: CreateAuthenticateUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Generate token for login' })
  @ApiOkResponse({
    type: HttpAuthenticateResponse,
  })
  async handle(@Res() res, @Body() body: CreateAuthenticateDto) {
    const result = await this.createAuthenticateUseCase.execute(body);

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    return res.status(HttpStatus.CREATED).send({
      statusCode: HttpStatus.CREATED,
      access_token: result.value.accessToken,
    });
  }
}
