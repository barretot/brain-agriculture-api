import { CreateAuthenticateUseCase } from '@/use-cases/authenticate/create-authenticate.use-case';
import { WrongCredentialsError } from '@/use-cases/authenticate/errors/wrong-credentials-error';
import { AuthenticateBuilder } from 'test/use-cases/@builders/authenticate-builder';

describe('Authenticate use case', () => {
  it('should return success when creating a authenticate', async () => {
    const { inMemoryUserRepository, encrypter, hasher, validAuthenticate } =
      new AuthenticateBuilder().success().build();

    const sut = new CreateAuthenticateUseCase(
      inMemoryUserRepository,
      hasher,
      encrypter,
    );

    const result = await sut.execute(validAuthenticate);

    expect(result.isRight()).toBe(true);
    expect(inMemoryUserRepository.items).toHaveLength(1);
    expect(result.value).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
      }),
    );
  });

  it('should return error when user not exists', async () => {
    const { inMemoryUserRepository, encrypter, hasher, validAuthenticate } =
      new AuthenticateBuilder().userAlreadyExists().build();

    const sut = new CreateAuthenticateUseCase(
      inMemoryUserRepository,
      hasher,
      encrypter,
    );

    const result = await sut.execute(validAuthenticate);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(WrongCredentialsError);
  });

  it('should return error when password does not match', async () => {
    const { inMemoryUserRepository, encrypter, hasher, validAuthenticate } =
      new AuthenticateBuilder().passwordDoesNotMatch().build();

    const sut = new CreateAuthenticateUseCase(
      inMemoryUserRepository,
      hasher,
      encrypter,
    );

    const result = await sut.execute(validAuthenticate);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(WrongCredentialsError);
  });
});
