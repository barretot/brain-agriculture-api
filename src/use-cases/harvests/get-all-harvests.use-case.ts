import { Injectable } from '@nestjs/common';

import { Harvests } from '@/core/domain/entities/Harvests';
import { HarvestsRepository } from '@/core/domain/repositories/harvests/HarvestsRepository';
import { Either, left, right } from '@/core/either';

import { NotFoundHarvestsException } from './errors/not-found-harvests-exception';

interface GetAllHarvestsUseCaseRequest {
  userId: string;
}

type GetAllHarvestsUseCaseResponse = Either<
  NotFoundHarvestsException,
  { harvests: Harvests[] }
>;

@Injectable()
export class GetAllHarvestsUseCase {
  constructor(private harvestsRepository: HarvestsRepository) {}

  async execute({
    userId,
  }: GetAllHarvestsUseCaseRequest): Promise<GetAllHarvestsUseCaseResponse> {
    const response = await this.harvestsRepository.getAll(userId);

    if (!response.length) {
      return left(new NotFoundHarvestsException());
    }

    return right({
      harvests: response,
    });
  }
}
