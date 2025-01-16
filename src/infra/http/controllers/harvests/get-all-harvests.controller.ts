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
import { NotFoundHarvestsException } from '@/use-cases/harvests/errors/not-found-harvests-exception';
import { GetAllHarvestsUseCase } from '@/use-cases/harvests/get-all-harvests.use-case';

import { ApiKeyAuthGuard } from '../../guards/api-key-auth.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { HttpInternalServerErrorResponse } from '../../swagger/responses/@shared/http-internal-server-error-response';
import { HttpNotFoundFarmResponse } from '../../swagger/responses/farm/http-not-found-farms.response';
import { HttpOkGetAllHarvestsResponse } from '../../swagger/responses/harvests/http-ok-get-all-harvests.response';

@ApiTags('Harvests')
@ApiSecurity('api-key')
@ApiBearerAuth()
@Controller('/harvests')
export class GetAllHarvestsController {
  constructor(private getAllHarvestsUseCase: GetAllHarvestsUseCase) {}

  @Get()
  @UseGuards(ApiKeyAuthGuard, JwtAuthGuard)
  @ApiOperation({ summary: 'Get all Harvests from db' })
  @ApiOkResponse({
    description: 'Get all Harvests success',
    type: HttpOkGetAllHarvestsResponse,
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
    const response = await this.getAllHarvestsUseCase.execute({
      userId: logedUser.sub,
    });

    if (response.isLeft()) {
      const error = response.value;

      switch (error.constructor) {
        case NotFoundHarvestsException:
          throw new NotFoundException(error.message);
      }
    }

    const { value: result } = response;

    return res
      .status(HttpStatus.CREATED)
      .send({ statusCode: HttpStatus.CREATED, ...result });
  }
}
