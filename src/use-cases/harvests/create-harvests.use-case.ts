import { Injectable } from '@nestjs/common';

import { Harvests } from '@/core/domain/entities/Harvests';
import { HarvestsRepository } from '@/core/domain/repositories/harvests/HarvestsRepository';
import { Either, left, right } from '@/core/either';

import { NotFoundFarmByIdException } from '../farm/errors/not-found-farm-by-id-exception';

interface HarvestsProps {
  year: string;
}

interface CreateHarvestsUseCaseRequest {
  userId: string;
  farmId: string;
  props: HarvestsProps;
}

type CreateHarvestsUseCaseResponse = Either<
  NotFoundFarmByIdException,
  { harvests: string }
>;

@Injectable()
export class CreateHarvestsUseCase {
  constructor(private harvestsRepository: HarvestsRepository) {}

  async execute({
    userId,
    farmId,
    props,
  }: CreateHarvestsUseCaseRequest): Promise<CreateHarvestsUseCaseResponse> {
    const harvests = Harvests.create(props);

    const response = await this.harvestsRepository.create(
      userId,
      farmId,
      harvests,
    );

    if (response === null) {
      return left(new NotFoundFarmByIdException(farmId));
    }

    return right({
      harvests: 'Harvests created',
    });
  }
}
