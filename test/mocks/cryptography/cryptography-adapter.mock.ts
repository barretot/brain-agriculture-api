import { CryptographyAdapter } from '@/core/adapters/cryptography/cryptography-adapter'

export class CryptographyAdapterMock extends CryptographyAdapter {
  hash = vi.fn(async (plain: string) => `hashed-${plain}`)
  compare = vi.fn(
    async (dbPassword: string, loginPassword: string) =>
      dbPassword === loginPassword,
  )
}
