import { NotFoundFarmByIdException } from '@/use-cases/farm/errors/not-found-farm-by-id-exception';
import { CreateHarvestsUseCase } from '@/use-cases/harvests/create-harvests.use-case';

import { HarvestsBuilder } from '../@builders/harvests-builder';

describe('Create Harvests Use Case', () => {
  it('should return success when harvests', async () => {
    const { inMemoryHarvestsRepository, validHarvests } = new HarvestsBuilder()
      .success()
      .build();

    const sut = new CreateHarvestsUseCase(inMemoryHarvestsRepository);

    const result = await sut.execute({
      userId: 'custom-id',
      farmId: 'fbf60978-f1a0-4a1b-919d-eb0cdecead3b',
      props: validHarvests,
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual(
      expect.objectContaining({
        harvests: 'Harvests created',
      }),
    );
  });

  it('should return error NotFoundFarmsException when create harvests', async () => {
    const { inMemoryHarvestsRepository, validHarvests } = new HarvestsBuilder()
      .notFoundFarmByIdException()
      .build();

    const sut = new CreateHarvestsUseCase(inMemoryHarvestsRepository);

    const result = await sut.execute({
      userId: 'custom-id',
      farmId: 'fbf60978-f1a0-4a1b-919d-eb0cdecead3b',
      props: validHarvests,
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundFarmByIdException);
  });
});
