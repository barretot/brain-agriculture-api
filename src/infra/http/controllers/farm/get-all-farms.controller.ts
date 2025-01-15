import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

import { CurrentUser } from '@/infra/auth/jwt/current-user.decorator';
import { TokenSchema } from '@/infra/auth/jwt/token-schema';
import { NotFoundFarmsException } from '@/use-cases/farm/errors/not-found-farms-exception';
import { GetAllFarsmUseCase } from '@/use-cases/farm/get-all-farms.use-case';

import { ApiKeyAuthGuard } from '../../guards/api-key-auth.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { HttpInternalServerErrorResponse } from '../../swagger/responses/@shared/http-internal-server-error-response';
import { HttpBadRequestFarmResponse } from '../../swagger/responses/farm/http-bad-request.response';
import { HttpNotFoundFarmResponse } from '../../swagger/responses/farm/http-not-found-farms.response';
import { HttpOkGetAllFarmsResponse } from '../../swagger/responses/farm/http-ok-get-all-farms.response';

@ApiTags('Farm')
@ApiSecurity('api-key')
@ApiBearerAuth()
@Controller('/farm')
export class GetAllFarmController {
  constructor(private getAllfarmUseCase: GetAllFarsmUseCase) {}

  @Get()
  @UseGuards(ApiKeyAuthGuard, JwtAuthGuard)
  @ApiOperation({ summary: 'Create farm from db' })
  @ApiOkResponse({
    description: 'Get all farms success',
    type: HttpOkGetAllFarmsResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: HttpBadRequestFarmResponse,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    type: HttpNotFoundFarmResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: HttpInternalServerErrorResponse,
  })
  async handle(@Res() res, @CurrentUser() logedUser: TokenSchema) {
    const response = await this.getAllfarmUseCase.execute({
      userId: logedUser.sub,
    });

    if (response.isLeft()) {
      const error = response.value;

      switch (error.constructor) {
        case NotFoundFarmsException:
          throw new NotFoundException(error.message);
      }
    }

    const { value: result } = response;

    return res
      .status(HttpStatus.CREATED)
      .send({ statusCode: HttpStatus.CREATED, ...result });
  }
}
