export abstract class EncrypterAdapter {
  abstract encrypt(payload: Record<string, unknown>): Promise<string>
}
