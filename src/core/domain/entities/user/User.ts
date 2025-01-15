import { randomUUID } from 'crypto';

export class User {
  id?: string;
  name!: string;
  email!: string;
  password!: string;

  constructor(props: User) {
    if (!props.id) {
      this.id = randomUUID();
    }
    Object.assign(this, props);
  }

  static create(props: User): User {
    const user = new User(props);

    return user;
  }
}
