import { InMemoryFarmRepository } from 'test/mocks/repositories/in-memory-farm-repository';
import { InMemoryHarvestsRepository } from 'test/mocks/repositories/in-memory-harvests-repository';
import { InMemoryUserRepository } from 'test/mocks/repositories/in-memory-user-repository';

interface ValidHarvests {
  id: string;
  year: string;
}

interface MockDependencies {
  inMemoryUserRepository: InMemoryUserRepository;
  inMemoryFarmRepository: InMemoryFarmRepository;
  inMemoryHarvestsRepository: InMemoryHarvestsRepository;
  userId: 'custom-id';
  validHarvests: ValidHarvests;
}

export class HarvestsBuilder {
  private mockDependencies: MockDependencies;

  constructor() {
    this.mockDependencies = {
      inMemoryUserRepository: new InMemoryUserRepository(),
      inMemoryFarmRepository: new InMemoryFarmRepository(),
      inMemoryHarvestsRepository: new InMemoryHarvestsRepository(),
      userId: 'custom-id',
      validHarvests: {
        id: 'harvests-id',
        year: '2003',
      },
    };
  }

  public success(): HarvestsBuilder {
    this.mockDependencies.inMemoryUserRepository.create({
      id: 'custom-id',
      name: 'Jane Doe',
      email: 'jane.doe@mail.com',
      cpfCnpj: '223.438.860-08',
      password: 'plaintextPassword',
    });

    this.mockDependencies.inMemoryFarmRepository.create('custom-id', {
      id: 'fbf60978-f1a0-4a1b-919d-eb0cdecead3b',
      name: 'Fazenda Feliz',
      city: 'São Paulo',
      state: 'SP',
      totalArea: 1000,
      arableArea: 300,
      vegetationArea: 200,
    });

    vi.spyOn(
      this.mockDependencies.inMemoryHarvestsRepository,
      'getById',
    ).mockResolvedValue({
      id: '8d7033d8-f65b-468e-82b4-cf7d727eb352',
      farmId: '0c04b19a-04c8-4931-a64d-f24357b9071b',
      harvestId: 'c8403b92-2e42-44bf-9236-6a2e96e6805d',
      year: '2023',
    } as any);

    return this;
  }
  public notFoundFarmByIdException(): HarvestsBuilder {
    vi.spyOn(
      this.mockDependencies.inMemoryHarvestsRepository,
      'create',
    ).mockReturnValue(Promise.resolve(null));

    return this;
  }

  public notFoundHarvestsException(): HarvestsBuilder {
    vi.spyOn(
      this.mockDependencies.inMemoryHarvestsRepository,
      'getAll',
    ).mockReturnValue(Promise.resolve([]));

    return this;
  }
  public notFoundHarvestsByIdException(): HarvestsBuilder {
    vi.spyOn(
      this.mockDependencies.inMemoryHarvestsRepository,
      'delete',
    ).mockImplementation(async () => null);
    vi.spyOn(
      this.mockDependencies.inMemoryHarvestsRepository,
      'getById',
    ).mockResolvedValue(null);

    return this;
  }

  public build(): MockDependencies {
    return this.mockDependencies;
  }
}
