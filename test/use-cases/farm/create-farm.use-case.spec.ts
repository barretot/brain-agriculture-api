import { CreateFarmUseCase } from '@/use-cases/farm/create-farm.use-case';

import { FarmBuilder } from '../@builders/farm-builder';

describe('Create user Use Case', () => {
  it('should return success when creating a farm', async () => {
    const { inMemoryFarmRepository, validFarm, userId } = new FarmBuilder()
      .success()
      .build();

    const sut = new CreateFarmUseCase(inMemoryFarmRepository);

    const result = await sut.execute({ userId, props: validFarm });

    expect(result.isRight()).toBe(true);
    expect(inMemoryFarmRepository.items).toHaveLength(1);
    expect(result.value).toEqual(
      expect.objectContaining({
        farm: expect.any(Object),
      }),
    );
  });
});
