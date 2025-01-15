import { Farm } from '../../entities/Farm';

export abstract class FarmRepository {
  abstract getAll(userId: string): Promise<Farm[]>;
  abstract getById(userId: string, farmId: string): Promise<Farm | null>;
  abstract create(userId, farm: Farm): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
