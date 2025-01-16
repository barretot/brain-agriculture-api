import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
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
import { NotFoundCropsException } from '@/use-cases/crop/errors/not-found-crops-exception';
import { GetAllCropsUseCase } from '@/use-cases/crop/get-all-crops.use-case';

import { ApiKeyAuthGuard } from '../../guards/api-key-auth.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { HttpInternalServerErrorResponse } from '../../swagger/responses/@shared/http-internal-server-error-response';
import { HttpNotFoundCropsResponse } from '../../swagger/responses/crops/http-not-found-crops.response';
import { GetAllCropsSchema } from '../../swagger/responses/crops/http-ok-get-all-crops.response';

@ApiTags('Crops')
@ApiSecurity('api-key')
@ApiBearerAuth()
@Controller('/crops')
export class GetAllCropsController {
  constructor(private getAllCropsUseCase: GetAllCropsUseCase) {}

  @Get()
  @UseGuards(ApiKeyAuthGuard, JwtAuthGuard)
  @ApiOperation({ summary: 'Get all Crops from db' })
  @ApiOkResponse(GetAllCropsSchema)
  @ApiNotFoundResponse({
    description: 'Not Found',
    type: HttpNotFoundCropsResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: HttpInternalServerErrorResponse,
  })
  async handle(@Res() res, @CurrentUser() logedUser: TokenSchema) {
    const response = await this.getAllCropsUseCase.execute({
      userId: logedUser.sub,
    });

    if (response.isLeft()) {
      const error = response.value;

      switch (error.constructor) {
        case NotFoundCropsException:
          throw new NotFoundException(error.message);
      }
    }

    const { value: result } = response;

    return res
      .status(HttpStatus.CREATED)
      .send({ statusCode: HttpStatus.CREATED, ...result });
  }
}
