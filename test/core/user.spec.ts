import { User } from '@/core/domain/entities/User';

describe('User', () => {
  it('should create a user with a random UUID if no id is provided', () => {
    const props = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      cpfCnpj: '12345678901',
      password: 'securePassword',
    };

    const user = User.create(props);

    expect(user).toBeInstanceOf(User);
    expect(user.id).toBeDefined();
    expect(user.name).toBe(props.name);
    expect(user.email).toBe(props.email);
    expect(user.cpfCnpj).toBe(props.cpfCnpj);
    expect(user.password).toBe(props.password);
  });

  it('should create a user with a provided id', () => {
    const customId = 'a1b2c3d4-e5f6-7890-1234-56789abcdef0';
    const props = {
      id: customId,
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      cpfCnpj: '98765432100',
      password: 'anotherPassword',
    };

    const user = User.create(props);

    expect(user).toBeInstanceOf(User);
    expect(user.id).toBe(customId);
    expect(user.name).toBe(props.name);
    expect(user.email).toBe(props.email);
    expect(user.cpfCnpj).toBe(props.cpfCnpj);
    expect(user.password).toBe(props.password);
  });
});
