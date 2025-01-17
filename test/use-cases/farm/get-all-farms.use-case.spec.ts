import { NotFoundFarmsException } from '@/use-cases/farm/errors/not-found-farms-exception';
import { GetAllFarmsUseCase } from '@/use-cases/farm/get-all-farms.use-case';

import { FarmBuilder } from '../@builders/farm-builder';

describe('Get all farms Use Case', () => {
  it('should return success when get all farms', async () => {
    const { inMemoryFarmRepository, userId, validFarm } = new FarmBuilder()
      .success()
      .build();

    const sut = new GetAllFarmsUseCase(inMemoryFarmRepository);

    inMemoryFarmRepository.create(userId, validFarm);

    const result = await sut.execute({ userId });

    expect(result.isRight()).toBe(true);
    expect(inMemoryFarmRepository.items).toHaveLength(1);
    expect(result.value).toEqual(
      expect.objectContaining({
        farms: expect.any(Object),
      }),
    );
  });

  it('should return error NotFoundFarmsException when get all farms', async () => {
    const { inMemoryFarmRepository, userId } = new FarmBuilder()
      .notFoundFarmsException()
      .build();

    const sut = new GetAllFarmsUseCase(inMemoryFarmRepository);

    const result = await sut.execute({ userId });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundFarmsException);
  });
});
