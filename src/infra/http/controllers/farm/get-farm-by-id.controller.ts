import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
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
import { NotFoundFarmByIdException } from '@/use-cases/farm/errors/not-found-farm-by-id-exception';
import { GetFarmByIdUseCase } from '@/use-cases/farm/get-farm-by-id.use-case';

import { ApiKeyAuthGuard } from '../../guards/api-key-auth.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { HttpInternalServerErrorResponse } from '../../swagger/responses/@shared/http-internal-server-error-response';
import { HttpNotFoundByIdFarmResponse } from '../../swagger/responses/@shared/http-not-found-farm-by-id.response';
import { HttpOkGetByIdFarmResponse } from '../../swagger/responses/farm/http-ok-get-by-id-farm.response';

@ApiTags('Farm')
@ApiSecurity('api-key')
@ApiBearerAuth()
@Controller('/farm')
export class GetFarmByIdController {
  constructor(private getFarmByIdUseCase: GetFarmByIdUseCase) {}

  @Get(':farmId')
  @UseGuards(ApiKeyAuthGuard, JwtAuthGuard)
  @ApiOperation({ summary: 'Get farm by id from db' })
  @ApiOkResponse({
    description: 'Get farm success',
    type: HttpOkGetByIdFarmResponse,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    type: HttpNotFoundByIdFarmResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: HttpInternalServerErrorResponse,
  })
  async handle(
    @Res() res,
    @CurrentUser() logedUser: TokenSchema,
    @Param('farmId') farmId: string,
  ) {
    const response = await this.getFarmByIdUseCase.execute({
      userId: logedUser.sub,
      farmId,
    });

    if (response.isLeft()) {
      const error = response.value;

      switch (error.constructor) {
        case NotFoundFarmByIdException:
          throw new NotFoundException(error.message);
      }
    }

    const { value: result } = response;

    return res
      .status(HttpStatus.CREATED)
      .send({ statusCode: HttpStatus.CREATED, ...result });
  }
}
