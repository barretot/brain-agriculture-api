import { Crop } from '../../entities/Crop';

export abstract class CropsRepository {
  abstract getAll(userId: string): Promise<Crop[]>;
  abstract getById(
    userId: string,
    cropId: string,
  ): Promise<Record<string, unknown> | null>;
  abstract create(
    userId: string,
    harvestsId: string,
    props: Crop,
  ): Promise<null | void>;

  abstract delete(userId: string, cropId: string): Promise<null | void>;
}
