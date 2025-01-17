import { NotFoundCropsException } from '@/use-cases/crop/errors/not-found-crops-exception';
import { GetAllCropsUseCase } from '@/use-cases/crop/get-all-crops.use-case';

import { CropsBuilder } from '../@builders/crops-builder';

describe('Get all crops Use Case', () => {
  it('should return success when get all crops', async () => {
    const { inMemoryCropRepository } = new CropsBuilder()
      .notFoundCropByIdException()
      .build();

    const sut = new GetAllCropsUseCase(inMemoryCropRepository);

    const result = await sut.execute({
      userId: 'f5ffd8d1-9b8e-408a-afeb-288619c83f03',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual(
      expect.objectContaining({
        crops: expect.any(Object),
      }),
    );
  });

  it('should return error NotFoundCropsException when get all crops', async () => {
    const { inMemoryCropRepository } = new CropsBuilder()
      .notFoundCropsException()
      .build();

    const sut = new GetAllCropsUseCase(inMemoryCropRepository);

    const result = await sut.execute({
      userId: 'f5ffd8d1-9b8e-408a-afeb-288619c83f03',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundCropsException);
  });
});
