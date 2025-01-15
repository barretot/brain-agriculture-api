import { randomUUID } from 'crypto';

export class Farm {
  id?: string;
  name!: string;
  city!: string;
  state!: string;
  totalArea!: number;
  arableArea!: number;
  vegetationArea!: number;

  constructor(props: Farm) {
    if (!props.id) {
      this.id = randomUUID();
    }

    Object.assign(this, props);
  }

  static create(props: Farm): Farm {
    return new Farm(props);
  }
}
