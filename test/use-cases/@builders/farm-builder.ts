import { InMemoryFarmRepository } from 'test/mocks/repositories/in-memory-farm-repository';
import { InMemoryUserRepository } from 'test/mocks/repositories/in-memory-user-repository';

interface ValidFarm {
  id: string;
  name: string;
  city: string;
  state: string;
  totalArea: number;
  arableArea: number;
  vegetationArea: number;
}

interface MockDependencies {
  inMemoryUserRepository: InMemoryUserRepository;
  inMemoryFarmRepository: InMemoryFarmRepository;
  userId: 'custom-id';
  validFarm: ValidFarm;
}

export class FarmBuilder {
  private mockDependencies: MockDependencies;

  constructor() {
    this.mockDependencies = {
      inMemoryUserRepository: new InMemoryUserRepository(),
      inMemoryFarmRepository: new InMemoryFarmRepository(),
      userId: 'custom-id',
      validFarm: {
        id: 'fbf60978-f1a0-4a1b-919d-eb0cdecead3b',
        name: 'Fazenda Feliz',
        city: 'São Paulo',
        state: 'SP',
        totalArea: 1000,
        arableArea: 300,
        vegetationArea: 200,
      },
    };
  }

  public success(): FarmBuilder {
    return this;
  }
  public notFoundFarmsException(): FarmBuilder {
    this.mockDependencies.inMemoryUserRepository.create({
      id: 'custom-id',
      name: 'Jane Doe',
      email: 'jane.doe@mail.com',
      cpfCnpj: '223.438.860-08',
      password: 'plaintextPassword',
    });

    return this;
  }

  public build(): MockDependencies {
    return this.mockDependencies;
  }
}
