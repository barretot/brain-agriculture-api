import { randomUUID } from 'crypto';

export class Crop {
  id?: string;
  cropName!: string;
  area!: number;

  constructor(props: Crop) {
    if (!props.id) {
      this.id = randomUUID();
    }
    Object.assign(this, props);
  }

  static create(props: Crop): Crop {
    return new Crop(props);
  }
}
