import { Injectable } from '@nestjs/common';

import { Farm } from '@/core/domain/entities/Farm';
import { FarmRepository } from '@/core/domain/repositories/farm/FarmRepository';
import { Either, right } from '@/core/either';

interface FarmProps {
  name: string;
  city: string;
  state: string;
  totalArea: number;
  arableArea: number;
  vegetationArea: number;
}

interface CreateFarmUseCaseRequest {
  userId: string;
  props: FarmProps;
}

type CreateFarmUseCaseResponse = Either<null, { farm: Farm }>;

@Injectable()
export class CreateFarmUseCase {
  constructor(private farmRepository: FarmRepository) {}

  async execute({
    userId,
    props,
  }: CreateFarmUseCaseRequest): Promise<CreateFarmUseCaseResponse> {
    const farm = Farm.create(props);

    await this.farmRepository.create(userId, farm);

    return right({
      farm,
    });
  }
}
