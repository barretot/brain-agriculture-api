import { Injectable } from '@nestjs/common';

import { CryptographyAdapter } from '@/core/adapters/cryptography/cryptography-adapter';
import { User } from '@/core/domain/entities/user/User';
import { UserRepository } from '@/core/domain/repositories/user/UserRepository';
import { Either, left, right } from '@/core/either';

import { UserAlreadyExistsException } from './errors/user-already-exists-exception';

interface CreateUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

type CreateUserUseCaseResponse = Either<
  UserAlreadyExistsException /* | OthersErrors */,
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
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      return left(new UserAlreadyExistsException(email));
    }

    const hash = await this.cryptography.hash(password);

    const user = User.create({
      name,
      email,
      password: hash,
    });

    await this.userRepository.create(user);

    return right({
      user,
    });
  }
}
