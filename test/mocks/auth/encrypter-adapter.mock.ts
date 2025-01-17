import { EncrypterAdapter } from '@/core/adapters/auth/encrypter-adapter';

export class EncrypterAdapterMock extends EncrypterAdapter {
  encrypt = vi.fn(
    async () =>
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  );
}
