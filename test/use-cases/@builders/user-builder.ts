import { CryptographyAdapterMock } from 'test/mocks/cryptography/cryptography-adapter.mock';
import { InMemoryUserRepository } from 'test/mocks/repositories/in-memory-user-repository';

interface ValidUser {
  id: string;
  name: string;
  email: string;
  cpfCnpj: string;
  password: string;
}

interface MockDependencies {
  hasher: CryptographyAdapterMock;
  inMemoryUserRepository: InMemoryUserRepository;
  validUser: ValidUser;
}

export class UserBuilder {
  private mockDependencies: MockDependencies;

  constructor() {
    this.mockDependencies = {
      hasher: new CryptographyAdapterMock(),
      inMemoryUserRepository: new InMemoryUserRepository(),
      validUser: {
        id: 'custom-id',
        name: 'Jane Doe',
        email: 'jane.doe@mail.com',
        cpfCnpj: '223.438.860-08',
        password: 'plaintextPassword',
      },
    };
  }

  public success(): UserBuilder {
    return this;
  }

  public userAlreadyExistsException(): UserBuilder {
    this.mockDependencies.inMemoryUserRepository.create({
      id: 'custom-id',
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: 'plaintextPassword',
      cpfCnpj: '223.438.860-08',
    });

    return this;
  }
  public userAlreadyExistsCpfCnpjException(): UserBuilder {
    this.mockDependencies.inMemoryUserRepository.create({
      id: 'custom-id',
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: 'plaintextPassword',
      cpfCnpj: '223.438.860-08',
    });

    return this;
  }

  public build(): MockDependencies {
    return this.mockDependencies;
  }
}
