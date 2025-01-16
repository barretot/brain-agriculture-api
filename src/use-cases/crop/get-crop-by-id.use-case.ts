import { Injectable } from '@nestjs/common';

import { CropsRepository } from '@/core/domain/repositories/crops/CropsRepository';
import { Either, left, right } from '@/core/either';

import { NotFoundCropByIdException } from './errors/not-found-crop-by-id-exception';

interface GetFarmByIdUseCaseRequest {
  userId: string;
  cropId: string;
}

type GetFarmByIdUseCaseResponse = Either<
  NotFoundCropByIdException,
  { crop: Record<string, unknown> }
>;

@Injectable()
export class GetCropByIdUseCase {
  constructor(private cropRepository: CropsRepository) {}

  async execute({
    userId,
    cropId,
  }: GetFarmByIdUseCaseRequest): Promise<GetFarmByIdUseCaseResponse> {
    const response = await this.cropRepository.getById(userId, cropId);

    if (response === null) {
      return left(new NotFoundCropByIdException(cropId));
    }

    return right({
      crop: response,
    });
  }
}
