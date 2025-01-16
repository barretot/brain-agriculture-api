import { Injectable } from '@nestjs/common';

import { CropsRepository } from '@/core/domain/repositories/crops/CropsRepository';
import { Either, left, right } from '@/core/either';

import { NotFoundCropByIdException } from './errors/not-found-crop-by-id-exception';

interface DeleteCropUseCaseRequest {
  userId: string;
  cropId: string;
}

type DeleteCropUseCaseResponse = Either<
  NotFoundCropByIdException,
  { message: string }
>;

@Injectable()
export class DeleteCropUseCase {
  constructor(private cropRepository: CropsRepository) {}

  async execute({
    userId,
    cropId,
  }: DeleteCropUseCaseRequest): Promise<DeleteCropUseCaseResponse> {
    const response = await this.cropRepository.delete(userId, cropId);

    if (response === null) {
      return left(new NotFoundCropByIdException(cropId));
    }

    return right({
      message: `Crop ${cropId} deleted`,
    });
  }
}
