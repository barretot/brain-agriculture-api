import { EncrypterAdapterMock } from 'test/mocks/auth/encrypter-adapter.mock'
import { CryptographyAdapterMock } from 'test/mocks/cryptography/cryptography-adapter.mock'
import { InMemoryUserRepository } from 'test/mocks/repositories/in-memory-user-repository'

interface ValidAuthenticate {
  email: string
  password: string
}

interface MockDependencies {
  inMemoryUserRepository: InMemoryUserRepository
  hasher: CryptographyAdapterMock
  encrypter: EncrypterAdapterMock
  validAuthenticate: ValidAuthenticate
}

export class AuthenticateBuilder {
  private mockDependencies: MockDependencies

  constructor() {
    this.mockDependencies = {
      inMemoryUserRepository: new InMemoryUserRepository(),
      hasher: new CryptographyAdapterMock(),
      encrypter: new EncrypterAdapterMock(),
      validAuthenticate: {
        email: 'john.doe@test.com',
        password: 'passwordTest123',
      },
    }
  }

  public success(): AuthenticateBuilder {
    this.mockDependencies.inMemoryUserRepository.create({
      id: 'custom-id',
      name: 'John Doe',
      email: 'john.doe@test.com',
      password: 'passwordTest123',
    })

    return this
  }
  public userAlreadyExists(): AuthenticateBuilder {
    return this
  }

  public passwordDoesNotMatch(): AuthenticateBuilder {
    this.mockDependencies.inMemoryUserRepository.create({
      id: 'custom-id',
      name: 'John Doe',
      email: 'john.doe@test.com',
      password: 'passwordTest123',
    })

    this.mockDependencies.validAuthenticate = {
      email: 'john.doe@test.com',
      password: 'wrong_password',
    }
    return this
  }

  public build(): MockDependencies {
    return this.mockDependencies
  }
}
