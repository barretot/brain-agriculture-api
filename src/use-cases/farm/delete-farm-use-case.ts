import { Injectable } from '@nestjs/common';

import { FarmRepository } from '@/core/domain/repositories/farm/FarmRepository';
import { Either, left, right } from '@/core/either';

import { NotFoundFarmByIdException } from './errors/not-found-farm-by-id-exception';

interface DeleteFarmUseCaseRequest {
  userId: string;
  farmId: string;
}

type DeleteFarmUseCaseResponse = Either<
  NotFoundFarmByIdException,
  { message: string }
>;

@Injectable()
export class DeleteFarmUseCase {
  constructor(private farmRepository: FarmRepository) {}

  async execute({
    userId,
    farmId,
  }: DeleteFarmUseCaseRequest): Promise<DeleteFarmUseCaseResponse> {
    const response = await this.farmRepository.delete(userId, farmId);

    if (response === null) {
      return left(new NotFoundFarmByIdException(farmId));
    }

    return right({
      message: `Farm ${farmId} deleted`,
    });
  }
}
