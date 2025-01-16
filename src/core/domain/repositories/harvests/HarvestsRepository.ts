import { Harvests } from '../../entities/Harvests';

export abstract class HarvestsRepository {
  abstract getAll(userId: string): Promise<Harvests[]>;
  abstract getById(userId: string, farmId: string): Promise<Harvests | null>;
  abstract create(userId, farmId, props: Harvests): Promise<null | void>;

  abstract delete(userId: string, farmId: string): Promise<null | void>;
}
