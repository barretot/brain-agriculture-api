import { NotFoundCropByIdException } from '@/use-cases/crop/errors/not-found-crop-by-id-exception';
import { GetCropByIdUseCase } from '@/use-cases/crop/get-crop-by-id.use-case';

import { CropsBuilder } from '../@builders/crops-builder';

describe('Get crops by id Use Case', () => {
  it('should return success when get crop', async () => {
    const { inMemoryCropRepository } = new CropsBuilder().success().build();

    const sut = new GetCropByIdUseCase(inMemoryCropRepository);

    const result = await sut.execute({
      userId: 'f5ffd8d1-9b8e-408a-afeb-288619c83f03',
      cropId: '87310e49-a5dd-40df-aaad-116ef7783297',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual(
      expect.objectContaining({
        crop: expect.any(Object),
      }),
    );
  });

  it('should return error NotFoundCropsException when get crop', async () => {
    const { inMemoryCropRepository } = new CropsBuilder()
      .notFoundCropsException()
      .build();

    const sut = new GetCropByIdUseCase(inMemoryCropRepository);

    const result = await sut.execute({
      userId: 'f5ffd8d1-9b8e-408a-afeb-288619c83f03',
      cropId: '87310e49-a5dd-40df-aaad-116ef7783297',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundCropByIdException);
  });
});
