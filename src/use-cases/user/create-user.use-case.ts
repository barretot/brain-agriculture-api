import { Injectable } from '@nestjs/common';

import { CryptographyAdapter } from '@/core/adapters/cryptography/cryptography-adapter';
import { User } from '@/core/domain/entities/User';
import { UserRepository } from '@/core/domain/repositories/user/UserRepository';
import { Either, left, right } from '@/core/either';

import { UserAlreadyExistsCpfCnpjException } from './errors/user-already-exists-cpf-cnpj-exception';
import { UserAlreadyExistsException } from './errors/user-already-exists-exception';

interface CreateUserUseCaseRequest {
  name: string;
  email: string;
  cpfCnpj: string;
  password: string;
}

type CreateUserUseCaseResponse = Either<
  UserAlreadyExistsException | UserAlreadyExistsCpfCnpjException,
  { user: User }
>;

@Injectable()
export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private cryptography: CryptographyAdapter,
  ) {}

  async execute({
    name,
    email,
    cpfCnpj,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    const userAlreadyExistsCpfCnpj =
      await this.userRepository.findByCpfCnpj(cpfCnpj);

    if (userAlreadyExists) {
      return left(new UserAlreadyExistsException(email));
    }

    if (userAlreadyExistsCpfCnpj) {
      return left(new UserAlreadyExistsCpfCnpjException());
    }

    const hash = await this.cryptography.hash(password);

    const user = User.create({
      name,
      email,
      cpfCnpj,
      password: hash,
    });

    await this.userRepository.create(user);

    return right({
      user,
    });
  }
}
