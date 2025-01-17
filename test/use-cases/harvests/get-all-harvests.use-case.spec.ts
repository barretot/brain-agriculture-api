import { NotFoundHarvestsException } from '@/use-cases/harvests/errors/not-found-harvests-exception';
import { GetAllHarvestsUseCase } from '@/use-cases/harvests/get-all-harvests.use-case';

import { HarvestsBuilder } from '../@builders/harvests-builder';

describe('Get all harvests Use Case', () => {
  it('should return success when get all harvests', async () => {
    const { inMemoryHarvestsRepository } = new HarvestsBuilder()
      .success()
      .build();

    const sut = new GetAllHarvestsUseCase(inMemoryHarvestsRepository);

    const result = await sut.execute({
      userId: '8d7033d8-f65b-468e-82b4-cf7d727eb352',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual(
      expect.objectContaining({
        harvests: expect.any(Object),
      }),
    );
  });

  it('should return error NotFoundFarmsException when get all harvests', async () => {
    const { inMemoryHarvestsRepository } = new HarvestsBuilder()
      .notFoundHarvestsException()
      .build();

    const sut = new GetAllHarvestsUseCase(inMemoryHarvestsRepository);

    const result = await sut.execute({
      userId: '8d7033d8-f65b-468e-82b4-cf7d727eb352',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundHarvestsException);
  });
});
