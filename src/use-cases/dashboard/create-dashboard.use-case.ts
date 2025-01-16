import { Injectable } from '@nestjs/common';

import { DashBoardRepository } from '@/core/domain/repositories/dashboard/DashBoardRepository';
import { Either, right } from '@/core/either';

type CreateUserUseCaseResponse = Either<null, { dash: Record<string, any> }>;

@Injectable()
export class CreateDashBoardUseCase {
  constructor(private dashBoardRepository: DashBoardRepository) {}

  async execute(): Promise<CreateUserUseCaseResponse> {
    const dashboard = await this.dashBoardRepository.createDashBoard();

    return right({
      dash: dashboard,
    });
  }
}
