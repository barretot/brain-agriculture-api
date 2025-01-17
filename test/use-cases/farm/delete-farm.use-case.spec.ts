import { DeleteFarmUseCase } from '@/use-cases/farm/delete-farm-use-case';
import { NotFoundFarmByIdException } from '@/use-cases/farm/errors/not-found-farm-by-id-exception';

import { FarmBuilder } from '../@builders/farm-builder';

describe('Delete farm Use Case', () => {
  it('should return success when delete farm', async () => {
    const { inMemoryFarmRepository, userId, validFarm } = new FarmBuilder()
      .success()
      .build();

    const sut = new DeleteFarmUseCase(inMemoryFarmRepository);

    inMemoryFarmRepository.create(userId, validFarm);

    const result = await sut.execute({ userId, farmId: validFarm.id });

    expect(result.isRight()).toBe(true);
    expect(inMemoryFarmRepository.items).toHaveLength(0);
    expect(result.value).toEqual({
      message: 'Farm fbf60978-f1a0-4a1b-919d-eb0cdecead3b deleted',
    });
  });

  it('should return error NotFoundFarmByIdException when delete farm', async () => {
    const { inMemoryFarmRepository, userId } = new FarmBuilder()
      .notFoundFarmsException()
      .build();

    const sut = new DeleteFarmUseCase(inMemoryFarmRepository);

    const result = await sut.execute({ userId, farmId: 'not-found-id' });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundFarmByIdException);
  });
});
