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
import { NotFoundCropByIdException } from '@/use-cases/crop/errors/not-found-crop-by-id-exception';
import { GetCropByIdUseCase } from '@/use-cases/crop/get-crop-by-id.use-case';

import { ApiKeyAuthGuard } from '../../guards/api-key-auth.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { HttpInternalServerErrorResponse } from '../../swagger/responses/@shared/http-internal-server-error-response';
import { HttpNotFoundCropsByIdResponse } from '../../swagger/responses/crops/http-not-found-crops-by-id.response';
import { CropGetByIdSchema } from '../../swagger/responses/crops/http-ok-get-by-id-crop.response';

@ApiTags('Crops')
@ApiSecurity('api-key')
@ApiBearerAuth()
@Controller('/crops')
export class GetCropByIdController {
  constructor(private getCropsByIdUseCase: GetCropByIdUseCase) {}

  @Get(':cropId')
  @UseGuards(ApiKeyAuthGuard, JwtAuthGuard)
  @ApiOperation({ summary: 'Get crop by id from db' })
  @ApiOkResponse(CropGetByIdSchema)
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
    const response = await this.getCropsByIdUseCase.execute({
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
