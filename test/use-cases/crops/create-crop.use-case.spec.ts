import { CreateCropUseCase } from '@/use-cases/crop/create-crop.use-case';
import { LimitExceededException } from '@/use-cases/crop/errors/limit-exceeded-exception';
import { NotFoundHarvestsByIdException } from '@/use-cases/crop/errors/not-found-harvests-by-id-exception';

import { CropsBuilder } from '../@builders/crops-builder';

describe('Create Crops Use Case', () => {
  it('should return success when create crop', async () => {
    const { inMemoryCropRepository, validCrops } = new CropsBuilder()
      .success()
      .build();

    const sut = new CreateCropUseCase(inMemoryCropRepository);

    const result = await sut.execute({
      userId: 'f5ffd8d1-9b8e-408a-afeb-288619c83f03',
      harvestsId: '7f9a6b78-7dd5-48ef-aae8-b9c0a116e977',
      props: validCrops,
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual(
      expect.objectContaining({
        crop: 'Crop created',
      }),
    );
  });

  it('should return error NotFoundHarvestsByIdException when create crop', async () => {
    const { inMemoryCropRepository, validCrops } = new CropsBuilder()
      .notFoundHarvestsByIdException()
      .build();

    const sut = new CreateCropUseCase(inMemoryCropRepository);

    const result = await sut.execute({
      userId: 'f5ffd8d1-9b8e-408a-afeb-288619c83f03',
      harvestsId: '7f9a6b78-7dd5-48ef-aae8-b9c0a116e977',
      props: validCrops,
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundHarvestsByIdException);
  });

  it('should return error LimitExceededException when create crop', async () => {
    const { inMemoryCropRepository } = new CropsBuilder()
      .limitExceededException()
      .build();

    const sut = new CreateCropUseCase(inMemoryCropRepository);

    const result = await sut.execute({
      userId: 'f5ffd8d1-9b8e-408a-afeb-288619c83f03',
      harvestsId: '7f9a6b78-7dd5-48ef-aae8-b9c0a116e977',
      props: {
        cropName: 'Soja',
        area: 60000,
      },
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(LimitExceededException);
  });
});
