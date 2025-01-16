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
import { DeleteCropUseCase } from '@/use-cases/crop/delete-crop-use-case';
import { NotFoundCropByIdException } from '@/use-cases/crop/errors/not-found-crop-by-id-exception';

import { ApiKeyAuthGuard } from '../../guards/api-key-auth.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { HttpInternalServerErrorResponse } from '../../swagger/responses/@shared/http-internal-server-error-response';
import { HttpDeletedCropResponse } from '../../swagger/responses/crops/delete-crop.response';
import { HttpNotFoundCropsByIdResponse } from '../../swagger/responses/crops/http-not-found-crops-by-id.response';

@ApiTags('Crops')
@ApiSecurity('api-key')
@ApiBearerAuth()
@Controller('/crops')
export class DeleteCropController {
  constructor(private deleteCropUseCase: DeleteCropUseCase) {}

  @Delete(':cropId')
  @UseGuards(ApiKeyAuthGuard, JwtAuthGuard)
  @ApiOperation({ summary: 'Delete harvests by id from db' })
  @ApiOkResponse({
    description: 'Delete harvests success',
    type: HttpDeletedCropResponse,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    type: HttpNotFoundCropsByIdResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: HttpInternalServerErrorResponse,
  })
  async handle(
    @Res() res,
    @CurrentUser() logedUser: TokenSchema,
    @Param('cropId') cropId: string,
  ) {
    const response = await this.deleteCropUseCase.execute({
      userId: logedUser.sub,
      cropId,
    });

    if (response.isLeft()) {
      const error = response.value;

      switch (error.constructor) {
        case NotFoundCropByIdException:
          throw new NotFoundException(error.message);
      }
    }

    const { value: result } = response;

    return res
      .status(HttpStatus.CREATED)
      .send({ statusCode: HttpStatus.CREATED, ...result });
  }
}
