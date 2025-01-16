import { randomUUID } from 'crypto';

export class Harvests {
  id?: string;
  year!: string;

  constructor(props: Harvests) {
    if (!props.id) {
      this.id = randomUUID();
    }
    Object.assign(this, props);
  }

  static create(props: Harvests): Harvests {
    return new Harvests(props);
  }
}
