import { Injectable } from '@nestjs/common';

import { Farm } from '@/core/domain/entities/Farm';
import { FarmRepository } from '@/core/domain/repositories/farm/FarmRepository';
import { Either, left, right } from '@/core/either';

import { NotFoundFarmsException } from './errors/not-found-farms-exception';

interface GetAllFarmsUseCaseRequest {
  userId: string;
}

type GetAllFarmsUseCaseResponse = Either<
  NotFoundFarmsException,
  { farms: Farm[] }
>;

@Injectable()
export class GetAllFarmsUseCase {
  constructor(private farmRepository: FarmRepository) {}

  async execute({
    userId,
  }: GetAllFarmsUseCaseRequest): Promise<GetAllFarmsUseCaseResponse> {
    const response = await this.farmRepository.getAll(userId);

    if (!response.length) {
      return left(new NotFoundFarmsException(userId));
    }

    return right({
      farms: response,
    });
  }
}
