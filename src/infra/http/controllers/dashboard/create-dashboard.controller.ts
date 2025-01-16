import { Controller, Get, Render } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

import { CreateDashBoardUseCase } from '@/use-cases/dashboard/create-dashboard.use-case';

import { HttpCreatedUserResponse } from '../../swagger/responses/user/create-user.response';
import { HttpConflictUserCpfCnpjResponse } from '../../swagger/responses/user/http-conflict-cpf-cnpj.response';
import { HttpConflictUserResponse } from '../../swagger/responses/user/http-conflict.response';

@ApiTags('Dashboard')
@ApiSecurity('api-key')
@Controller('/dashboard')
export class CreateDashBoardController {
  constructor(private createDashBoardUseCase: CreateDashBoardUseCase) {}

  @Get()
  @Render('dashboard')
  @ApiOperation({ summary: 'Create dashboard from db' })
  @ApiCreatedResponse({
    description: 'Dashboard Data',
    type: HttpCreatedUserResponse,
  })
  @ApiConflictResponse({
    description: 'Conflict',
    type: HttpConflictUserResponse,
  })
  @ApiBadRequestResponse({
    description: 'Conflict',
    type: HttpConflictUserCpfCnpjResponse,
  })
  async handle() {
    const response = await this.createDashBoardUseCase.execute();
    const { value: result } = response;

    return {
      totalFarms: result?.dash.totalFarms || 0,
      totalHectares: result?.dash.totalHectares || 0,
      farmsByState: result?.dash.farmsByState || [],
      cropsByType: result?.dash.cropsByType || [],
      landUsage: result?.dash.landUsage || [],
    };
  }
}
