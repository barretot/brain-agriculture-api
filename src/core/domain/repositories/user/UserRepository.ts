import { User } from '../../entities/User';

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findByCpfCnpj(cpfCnpj: string): Promise<User | null>;
  abstract create(user: User): Promise<void>;
}
