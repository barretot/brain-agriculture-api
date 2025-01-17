import { InMemoryCropsRepository } from 'test/mocks/repositories/in-memory-crops-repository';

interface ValidCrops {
  id: string;
  cropName: string;
  area: number;
}

interface MockDependencies {
  inMemoryCropRepository: InMemoryCropsRepository;
  userId: 'custom-id';
  harvestsId: 'harvests-id';
  validCrops: ValidCrops;
}

export class CropsBuilder {
  private mockDependencies: MockDependencies;

  constructor() {
    this.mockDependencies = {
      inMemoryCropRepository: new InMemoryCropsRepository(),
      userId: 'custom-id',
      harvestsId: 'harvests-id',
      validCrops: {
        id: 'crop-id',
        cropName: 'Soja',
        area: 300,
      },
    };
  }

  public success(): CropsBuilder {
    vi.spyOn(
      this.mockDependencies.inMemoryCropRepository,
      'create',
    ).mockReturnValue(
      Promise.resolve({
        ok: true,
      }),
    );

    vi.spyOn(
      this.mockDependencies.inMemoryCropRepository,
      'getById',
    ).mockResolvedValue({
      id: 'f0b1ddaf-ec62-4ded-a315-91733fb71b61',
      name: 'Fazenda Família Doe 2',
      harvests: [
        {
          id: 'd00b62c8-bf3d-4980-a830-cf12c987cb23',
          year: '2004',
          crops: [
            {
              id: '5c4c6225-045e-437d-b8f9-21281cb177e9',
              name: 'Feijao',
              area: 3000,
              createdAt: '2025-01-16T17:25:20.566Z',
            },
          ],
        },
      ],
    } as any);

    return this;
  }

  public notFoundHarvestsByIdException(): CropsBuilder {
    vi.spyOn(
      this.mockDependencies.inMemoryCropRepository,
      'create',
    ).mockImplementation(async () => null);

    return this;
  }
  public limitExceededException(): CropsBuilder {
    vi.spyOn(
      this.mockDependencies.inMemoryCropRepository,
      'create',
    ).mockReturnValue(
      Promise.resolve({
        ok: false,
      }),
    );

    return this;
  }
  public notFoundCropByIdException(): CropsBuilder {
    vi.spyOn(
      this.mockDependencies.inMemoryCropRepository,
      'delete',
    ).mockImplementation(async () => null);

    return this;
  }

  public notFoundCropsException(): CropsBuilder {
    vi.spyOn(
      this.mockDependencies.inMemoryCropRepository,
      'getAll',
    ).mockReturnValue(Promise.resolve([]));

    vi.spyOn(
      this.mockDependencies.inMemoryCropRepository,
      'getById',
    ).mockResolvedValue(null);

    return this;
  }

  public build(): MockDependencies {
    return this.mockDependencies;
  }
}
