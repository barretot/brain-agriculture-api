import { NotFoundFarmByIdException } from '@/use-cases/farm/errors/not-found-farm-by-id-exception';
import { GetFarmByIdUseCase } from '@/use-cases/farm/get-farm-by-id.use-case';
import { NotFoundHarvestsByIdException } from '@/use-cases/harvests/errors/not-found-harvests-by-id-exception';
import { GetHarvestsByIdUseCase } from '@/use-cases/harvests/get-harvests-by-id.use-case';

import { FarmBuilder } from '../@builders/farm-builder';
import { HarvestsBuilder } from '../@builders/harvests-builder';

describe('Get By id harvests Use Case', () => {
  it('should return success when get all harvests', async () => {
    const { inMemoryHarvestsRepository } = new HarvestsBuilder()
      .success()
      .build();

    const sut = new GetHarvestsByIdUseCase(inMemoryHarvestsRepository);

    const result = await sut.execute({
      userId: '8d7033d8-f65b-468e-82b4-cf7d727eb352',
      harvestsId: 'f487f305-5241-4447-9463-6b8e8e999678',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual(
      expect.objectContaining({
        harvests: expect.any(Object),
      }),
    );
  });

  it('should return error NotFoundFarmsException when get all farms', async () => {
    const { inMemoryHarvestsRepository } = new HarvestsBuilder()
      .notFoundHarvestsByIdException()
      .build();

    const sut = new GetHarvestsByIdUseCase(inMemoryHarvestsRepository);

    const result = await sut.execute({
      userId: '8d7033d8-f65b-468e-82b4-cf7d727eb352',
      harvestsId: 'f487f305-5241-4447-9463-6b8e8e999678',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundHarvestsByIdException);
  });
});
