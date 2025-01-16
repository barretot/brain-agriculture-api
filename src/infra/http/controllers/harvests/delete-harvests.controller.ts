import {
  Controller,
  Delete,
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
import { DeleteHarvestsUseCase } from '@/use-cases/harvests/delete-harvests-use-case';

import { ApiKeyAuthGuard } from '../../guards/api-key-auth.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { HttpInternalServerErrorResponse } from '../../swagger/responses/@shared/http-internal-server-error-response';
import { HttpNotFoundHarvestsResponse } from '../../swagger/responses/@shared/http-not-found-harvests.response';
import { HttpDeletedHarvestsResponse } from '../../swagger/responses/harvests/delete-harvests.response';

@ApiTags('Harvests')
@ApiSecurity('api-key')
@ApiBearerAuth()
@Controller('/harvests')
export class DeleteHarvetsController {
  constructor(private deleteHarvestsUseCase: DeleteHarvestsUseCase) {}

  @Delete(':harvestsId')
  @UseGuards(ApiKeyAuthGuard, JwtAuthGuard)
  @ApiOperation({ summary: 'Delete harvests by id from db' })
  @ApiOkResponse({
    description: 'Delete harvests success',
    type: HttpDeletedHarvestsResponse,
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
    const response = await this.deleteHarvestsUseCase.execute({
      userId: logedUser.sub,
      harvestsId,
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
