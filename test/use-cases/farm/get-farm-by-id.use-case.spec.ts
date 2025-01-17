import { NotFoundFarmByIdException } from '@/use-cases/farm/errors/not-found-farm-by-id-exception';
import { GetFarmByIdUseCase } from '@/use-cases/farm/get-farm-by-id.use-case';

import { FarmBuilder } from '../@builders/farm-builder';

describe('Get By id farm Use Case', () => {
  it('should return success when get by id farm', async () => {
    const { inMemoryFarmRepository, userId, validFarm } = new FarmBuilder()
      .success()
      .build();

    const sut = new GetFarmByIdUseCase(inMemoryFarmRepository);

    inMemoryFarmRepository.create(userId, validFarm);

    const result = await sut.execute({ userId, farmId: validFarm.id });

    expect(result.isRight()).toBe(true);
    expect(inMemoryFarmRepository.items).toHaveLength(1);
    expect(result.value).toEqual(
      expect.objectContaining({
        farm: expect.any(Object),
      }),
    );
  });

  it('should return error NotFoundFarmsException when get all farms', async () => {
    const { inMemoryFarmRepository, userId, validFarm } = new FarmBuilder()
      .notFoundFarmsException()
      .build();

    const sut = new GetFarmByIdUseCase(inMemoryFarmRepository);

    const result = await sut.execute({ userId, farmId: validFarm.id });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundFarmByIdException);
  });
});
