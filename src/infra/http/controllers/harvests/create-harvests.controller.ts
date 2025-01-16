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
import { NotFoundFarmByIdException } from '@/use-cases/farm/errors/not-found-farm-by-id-exception';
import { CreateHarvestsUseCase } from '@/use-cases/harvests/create-harvests.use-case';

import { CreateHarvestsDto } from '../../dto/harvests/create-harvests.dto';
import { ApiKeyAuthGuard } from '../../guards/api-key-auth.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { HttpInternalServerErrorResponse } from '../../swagger/responses/@shared/http-internal-server-error-response';
import { HttpNotFoundByIdFarmResponse } from '../../swagger/responses/@shared/http-not-found-farm-by-id.response';
import { HttpCreatedHarvestsResponse } from '../../swagger/responses/harvests/create-harvests.response';
import { HttpBadRequestHarvestsResponse } from '../../swagger/responses/harvests/http-bad-request.response';

@ApiTags('Harvests')
@ApiSecurity('api-key')
@ApiBearerAuth()
@Controller('/harvests')
export class CreateHarvestsController {
  constructor(private createHarvestsUseCase: CreateHarvestsUseCase) {}

  @Post(':id')
  @UseGuards(ApiKeyAuthGuard, JwtAuthGuard)
  @ApiOperation({ summary: 'Create farm from db' })
  @ApiCreatedResponse({
    description: 'Harvests Created',
    type: HttpCreatedHarvestsResponse,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    type: HttpNotFoundByIdFarmResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: HttpBadRequestHarvestsResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: HttpInternalServerErrorResponse,
  })
  async handle(
    @CurrentUser() logedUser: TokenSchema,
    @Res() res,
    @Param('id') farmId: string,
    @Body() body: CreateHarvestsDto,
  ) {
    const response = await this.createHarvestsUseCase.execute({
      userId: logedUser.sub,
      props: body,
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
