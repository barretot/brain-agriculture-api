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
import { DeleteFarmUseCase } from '@/use-cases/farm/delete-farm-use-case';
import { NotFoundFarmByIdException } from '@/use-cases/farm/errors/not-found-farm-by-id-exception';

import { ApiKeyAuthGuard } from '../../guards/api-key-auth.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { HttpInternalServerErrorResponse } from '../../swagger/responses/@shared/http-internal-server-error-response';
import { HttpNotFoundByIdFarmResponse } from '../../swagger/responses/@shared/http-not-found-farm-by-id.response';
import { HttpDeletedFarmResponse } from '../../swagger/responses/farm/delete-farm.response';

@ApiTags('Farm')
@ApiSecurity('api-key')
@ApiBearerAuth()
@Controller('/farm')
export class DeleteFarmController {
  constructor(private deleteFarmUseCase: DeleteFarmUseCase) {}

  @Delete(':id')
  @UseGuards(ApiKeyAuthGuard, JwtAuthGuard)
  @ApiOperation({ summary: 'Delete farm by id from db' })
  @ApiOkResponse({
    description: 'Delete farm success',
    type: HttpDeletedFarmResponse,
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
    @Param('id') id: string,
  ) {
    const response = await this.deleteFarmUseCase.execute({
      userId: logedUser.sub,
      farmId: id,
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
