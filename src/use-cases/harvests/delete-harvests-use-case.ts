import { Injectable } from '@nestjs/common';

import { HarvestsRepository } from '@/core/domain/repositories/harvests/HarvestsRepository';
import { Either, left, right } from '@/core/either';

import { NotFoundHarvestsByIdException } from './errors/not-found-harvests-by-id-exception';

interface DeleteHarvestsUseCaseRequest {
  userId: string;
  harvestsId: string;
}

type DeleteHarvestsUseCaseResponse = Either<
  NotFoundHarvestsByIdException,
  { message: string }
>;

@Injectable()
export class DeleteHarvestsUseCase {
  constructor(private harvestsRepository: HarvestsRepository) {}

  async execute({
    userId,
    harvestsId,
  }: DeleteHarvestsUseCaseRequest): Promise<DeleteHarvestsUseCaseResponse> {
    const response = await this.harvestsRepository.delete(userId, harvestsId);

    if (response === null) {
      return left(new NotFoundHarvestsByIdException(harvestsId));
    }

    return right({
      message: `Harvests ${harvestsId} deleted`,
    });
  }
}
