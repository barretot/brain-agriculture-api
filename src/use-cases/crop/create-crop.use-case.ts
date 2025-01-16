import { Injectable } from '@nestjs/common';

import { Crop } from '@/core/domain/entities/Crop';
import { CropsRepository } from '@/core/domain/repositories/crops/CropsRepository';
import { Either, left, right } from '@/core/either';

import { NotFoundHarvestsByIdException } from './errors/not-found-harvests-by-id-exception';

interface CropProps {
  area: number;
  cropName: string;
}

interface CreateCropUseCaseRequest {
  userId: string;
  harvestsId: string;
  props: CropProps;
}

type CreateCropUseCaseResponse = Either<
  NotFoundHarvestsByIdException,
  { harvests: string }
>;

@Injectable()
export class CreateCropUseCase {
  constructor(private cropsRepository: CropsRepository) {}

  async execute({
    userId,
    harvestsId,
    props,
  }: CreateCropUseCaseRequest): Promise<CreateCropUseCaseResponse> {
    const crop = Crop.create(props);

    const response = await this.cropsRepository.create(
      userId,
      harvestsId,
      crop,
    );

    if (response === null) {
      return left(new NotFoundHarvestsByIdException(harvestsId));
    }

    return right({
      harvests: 'Crop created',
    });
  }
}
