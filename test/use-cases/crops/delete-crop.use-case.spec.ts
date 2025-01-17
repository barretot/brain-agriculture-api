import { DeleteCropUseCase } from '@/use-cases/crop/delete-crop-use-case';
import { NotFoundCropByIdException } from '@/use-cases/crop/errors/not-found-crop-by-id-exception';

import { CropsBuilder } from '../@builders/crops-builder';

describe('Delete crop Use Case', () => {
  it('should return success when delete crop', async () => {
    const { inMemoryCropRepository } = new CropsBuilder().success().build();

    const sut = new DeleteCropUseCase(inMemoryCropRepository);

    const result = await sut.execute({
      userId: 'f5ffd8d1-9b8e-408a-afeb-288619c83f03',
      cropId: '580799ff-1e65-4faf-bdcd-615d3f25ed94',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual(
      expect.objectContaining({
        message: 'Crop 580799ff-1e65-4faf-bdcd-615d3f25ed94 deleted',
      }),
    );
  });

  it('should return error NotFoundHarvestsByIdException when delete crop', async () => {
    const { inMemoryCropRepository } = new CropsBuilder()
      .notFoundCropByIdException()
      .build();

    const sut = new DeleteCropUseCase(inMemoryCropRepository);

    const result = await sut.execute({
      userId: 'f5ffd8d1-9b8e-408a-afeb-288619c83f03',
      cropId: '580799ff-1e65-4faf-bdcd-615d3f25ed94',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundCropByIdException);
  });
});
