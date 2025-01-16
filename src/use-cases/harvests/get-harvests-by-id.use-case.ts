import { Injectable } from '@nestjs/common';

import { Harvests } from '@/core/domain/entities/Harvests';
import { HarvestsRepository } from '@/core/domain/repositories/harvests/HarvestsRepository';
import { Either, left, right } from '@/core/either';

import { NotFoundHarvestsByIdException } from './errors/not-found-harvests-by-id-exception';

interface GetFarmByIdUseCaseRequest {
  userId: string;
  harvestsId: string;
}

type GetFarmByIdUseCaseResponse = Either<
  NotFoundHarvestsByIdException,
  { harvests: Harvests }
>;

@Injectable()
export class GetHarvestsByIdUseCase {
  constructor(private harvestsRepository: HarvestsRepository) {}

  async execute({
    userId,
    harvestsId,
  }: GetFarmByIdUseCaseRequest): Promise<GetFarmByIdUseCaseResponse> {
    const response = await this.harvestsRepository.getById(userId, harvestsId);

    if (response === null) {
      return left(new NotFoundHarvestsByIdException(harvestsId));
    }

    return right({
      harvests: response,
    });
  }
}
