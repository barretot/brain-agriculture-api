import { Injectable } from '@nestjs/common';

import { Farm } from '@/core/domain/entities/Farm';
import { FarmRepository } from '@/core/domain/repositories/farm/FarmRepository';
import { Either, left, right } from '@/core/either';

import { NotFoundFarmByIdException } from './errors/not-found-farm-by-id-exception';

interface GetFarmByIdUseCaseRequest {
  userId: string;
  farmId: string;
}

type GetFarmByIdUseCaseResponse = Either<
  NotFoundFarmByIdException,
  { farm: Farm }
>;

@Injectable()
export class GetFarmByIdUseCase {
  constructor(private farmRepository: FarmRepository) {}

  async execute({
    userId,
    farmId,
  }: GetFarmByIdUseCaseRequest): Promise<GetFarmByIdUseCaseResponse> {
    const response = await this.farmRepository.getById(userId, farmId);

    if (response === null) {
      return left(new NotFoundFarmByIdException(farmId));
    }

    return right({
      farm: response,
    });
  }
}
