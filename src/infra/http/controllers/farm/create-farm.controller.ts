import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

import { CurrentUser } from '@/infra/auth/jwt/current-user.decorator';
import { TokenSchema } from '@/infra/auth/jwt/token-schema';
import { CreateFarmUseCase } from '@/use-cases/farm/create-farm.use-case';

import { CreateFarmDto } from '../../dto/farm/create-farm.dto';
import { ApiKeyAuthGuard } from '../../guards/api-key-auth.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { HttpInternalServerErrorResponse } from '../../swagger/responses/@shared/http-internal-server-error-response';
import { HttpCreatedFarmResponse } from '../../swagger/responses/farm/create-farm.response';
import { HttpBadRequestFarmResponse } from '../../swagger/responses/farm/http-bad-request.response';

@ApiTags('Farm')
@ApiSecurity('api-key')
@ApiBearerAuth()
@Controller('/farm')
export class CreateFarmController {
  constructor(private createfarmUseCase: CreateFarmUseCase) {}

  @Post()
  @UseGuards(ApiKeyAuthGuard, JwtAuthGuard)
  @ApiOperation({ summary: 'Create farm from db' })
  @ApiCreatedResponse({
    description: 'Farm Created',
    type: HttpCreatedFarmResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: HttpBadRequestFarmResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: HttpInternalServerErrorResponse,
  })
  async handle(
    @CurrentUser() logedUser: TokenSchema,
    @Res() res,
    @Body() body: CreateFarmDto,
  ) {
    await this.createfarmUseCase.execute({
      userId: logedUser.sub,
      props: body,
    });

    return res
      .status(HttpStatus.CREATED)
      .send({ statusCode: HttpStatus.CREATED, message: 'Farm created' });
  }
}
