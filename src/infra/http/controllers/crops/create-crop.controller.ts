import {
  Body,
  Controller,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

import { CurrentUser } from '@/infra/auth/jwt/current-user.decorator';
import { TokenSchema } from '@/infra/auth/jwt/token-schema';
import { CreateCropUseCase } from '@/use-cases/crop/create-crop.use-case';
import { NotFoundFarmByIdException } from '@/use-cases/farm/errors/not-found-farm-by-id-exception';

import { CreateCropDto } from '../../dto/crop/create-crop.dto';
import { ApiKeyAuthGuard } from '../../guards/api-key-auth.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { HttpInternalServerErrorResponse } from '../../swagger/responses/@shared/http-internal-server-error-response';
import { HttpNotFoundHarvestsResponse } from '../../swagger/responses/@shared/http-not-found-harvests.response';
import { HttpCreatedCropResponse } from '../../swagger/responses/crops/create-crop.response';

@ApiTags('Crops')
@ApiSecurity('api-key')
@ApiBearerAuth()
@Controller('/crops')
export class CreateCropController {
  constructor(private createCropUseCase: CreateCropUseCase) {}

  @Post(':harvestsId')
  @UseGuards(ApiKeyAuthGuard, JwtAuthGuard)
  @ApiOperation({ summary: 'Create farm from db' })
  @ApiCreatedResponse({
    description: 'Crop Created',
    type: HttpCreatedCropResponse,
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
    @CurrentUser() logedUser: TokenSchema,
    @Res() res,
    @Param('harvestsId') harvestsId: string,
    @Body() body: CreateCropDto,
  ) {
    const response = await this.createCropUseCase.execute({
      userId: logedUser.sub,
      props: body,
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
