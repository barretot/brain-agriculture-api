import { Injectable } from '@nestjs/common';

import { EncrypterAdapter } from '@/core/adapters/auth/encrypter-adapter';
import { CryptographyAdapter } from '@/core/adapters/cryptography/cryptography-adapter';
import { UserRepository } from '@/core/domain/repositories/user/UserRepository';
import { Either, left, right } from '@/core/either';

import { WrongCredentialsError } from './errors/wrong-credentials-error';

interface CreateAuthenticateDto {
  email: string;
  password: string;
}

type CreatePetUseCaseResponse = Either<
  WrongCredentialsError,
  { accessToken: string }
>;

@Injectable()
export class CreateAuthenticateUseCase {
  constructor(
    private userRepository: UserRepository,
    private cryptography: CryptographyAdapter,
    private encrypter: EncrypterAdapter,
  ) {}

  async execute({
    email,
    password,
  }: CreateAuthenticateDto): Promise<CreatePetUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return left(new WrongCredentialsError());
    }

    const isPasswordValid = await this.cryptography.compare(
      user.password,
      password,
    );

    if (!isPasswordValid) {
      return left(new WrongCredentialsError());
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id?.toString(),
    });

    return right({
      accessToken,
    });
  }
}
