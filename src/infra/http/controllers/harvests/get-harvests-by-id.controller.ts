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
import { NotFoundHarvestsByIdException } from '@/use-cases/harvests/errors/not-found-harvests-by-id-exception';
import { GetHarvestsByIdUseCase } from '@/use-cases/harvests/get-harvests-by-id.use-case';

import { ApiKeyAuthGuard } from '../../guards/api-key-auth.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { HttpInternalServerErrorResponse } from '../../swagger/responses/@shared/http-internal-server-error-response';
import { HttpNotFoundHarvestsResponse } from '../../swagger/responses/@shared/http-not-found-harvests.response';
import { HttpOkGetByIdHarvestResponse } from '../../swagger/responses/harvests/http-ok-get-by-id-harvests.response';

@ApiTags('Harvests')
@ApiSecurity('api-key')
@ApiBearerAuth()
@Controller('/harvests')
export class GetHarvestsByIdController {
  constructor(private getHarvestsByIdUseCase: GetHarvestsByIdUseCase) {}

  @Get(':harvestsId')
  @UseGuards(ApiKeyAuthGuard, JwtAuthGuard)
  @ApiOperation({ summary: 'Get harvests by id from db' })
  @ApiOkResponse({
    description: 'Get harvests success',
    type: HttpOkGetByIdHarvestResponse,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    type: HttpNotFoundHarvestsResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: HttpInternalServerErrorResponse,
  })
  async handle(
    @Res() res,
    @CurrentUser() logedUser: TokenSchema,
    @Param('harvestsId') harvestsId: string,
  ) {
    const response = await this.getHarvestsByIdUseCase.execute({
      userId: logedUser.sub,
      harvestsId,
    });

    if (response.isLeft()) {
      const error = response.value;

      switch (error.constructor) {
        case NotFoundHarvestsByIdException:
          throw new NotFoundException(error.message);
      }
    }

    const { value: result } = response;

    return res
      .status(HttpStatus.CREATED)
      .send({ statusCode: HttpStatus.CREATED, ...result });
  }
}
