import { DeleteHarvestsUseCase } from '@/use-cases/harvests/delete-harvests-use-case';
import { NotFoundHarvestsByIdException } from '@/use-cases/harvests/errors/not-found-harvests-by-id-exception';

import { HarvestsBuilder } from '../@builders/harvests-builder';

describe('Delete harvests Use Case', () => {
  it('should return success when delete harvests', async () => {
    const { inMemoryHarvestsRepository } = new HarvestsBuilder()
      .success()
      .build();

    const sut = new DeleteHarvestsUseCase(inMemoryHarvestsRepository);

    const result = await sut.execute({
      userId: '8d7033d8-f65b-468e-82b4-cf7d727eb352',
      harvestsId: '8620c610-4809-4cb1-ba20-49627e7518df',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual(
      expect.objectContaining({
        message: 'Harvests 8620c610-4809-4cb1-ba20-49627e7518df deleted',
      }),
    );
  });

  it('should return error NotFoundHarvestsByIdException when delete harvests', async () => {
    const { inMemoryHarvestsRepository } = new HarvestsBuilder()
      .notFoundHarvestsByIdException()
      .build();

    const sut = new DeleteHarvestsUseCase(inMemoryHarvestsRepository);

    const result = await sut.execute({
      userId: '8d7033d8-f65b-468e-82b4-cf7d727eb352',
      harvestsId: '8620c610-4809-4cb1-ba20-49627e7518df',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundHarvestsByIdException);
  });
});
