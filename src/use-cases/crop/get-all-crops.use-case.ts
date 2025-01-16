import { Injectable } from '@nestjs/common';

import { Crop } from '@/core/domain/entities/Crop';
import { CropsRepository } from '@/core/domain/repositories/crops/CropsRepository';
import { Either, left, right } from '@/core/either';

import { NotFoundCropsException } from './errors/not-found-crops-exception';

interface GetAllHarvestsUseCaseRequest {
  userId: string;
}

type GetAllHarvestsUseCaseResponse = Either<
  NotFoundCropsException,
  { crops: Crop[] }
>;

@Injectable()
export class GetAllCropsUseCase {
  constructor(private cropRepository: CropsRepository) {}

  async execute({
    userId,
  }: GetAllHarvestsUseCaseRequest): Promise<GetAllHarvestsUseCaseResponse> {
    const response = await this.cropRepository.getAll(userId);

    if (!response.length) {
      return left(new NotFoundCropsException());
    }

    return right({
      crops: response,
    });
  }
}
