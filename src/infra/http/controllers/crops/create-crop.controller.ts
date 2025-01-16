import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
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
import { LimitExceededException } from '@/use-cases/crop/errors/limit-exceeded-exception';
import { NotFoundFarmByIdException } from '@/use-cases/farm/errors/not-found-farm-by-id-exception';

import { CreateCropDto } from '../../dto/crop/create-crop.dto';
import { ApiKeyAuthGuard } from '../../guards/api-key-auth.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { HttpInternalServerErrorResponse } from '../../swagger/responses/@shared/http-internal-server-error-response';
import { HttpNotFoundHarvestsResponse } from '../../swagger/responses/@shared/http-not-found-harvests.response';
import { HttpCreatedCropResponse } from '../../swagger/responses/crops/create-crop.response';
import { HttpBadRequestLimitExceededResponse } from '../../swagger/responses/crops/limit-exceeded.response';

@ApiTags('Crops')
@ApiSecurity('api-key')
@ApiBearerAuth()
@Controller('/crops')
export class CreateCropController {
  constructor(private createCropUseCase: CreateCropUseCase) {}

  @Post(':harvestsId')
  @UseGuards(ApiKeyAuthGuard, JwtAuthGuard)
  @ApiOperation({ summary: 'Create crop from db' })
  @ApiCreatedResponse({
    description: 'Crop Created',
    type: HttpCreatedCropResponse,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    type: HttpNotFoundHarvestsResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: HttpBadRequestLimitExceededResponse,
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
        case LimitExceededException:
          throw new BadRequestException(error.message);
        default:
          throw new InternalServerErrorException(error.message);
      }
    }

    const { value: result } = response;

    return res
      .status(HttpStatus.CREATED)
      .send({ statusCode: HttpStatus.CREATED, ...result });
  }
}
