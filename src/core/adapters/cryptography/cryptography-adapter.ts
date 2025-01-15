export abstract class CryptographyAdapter {
  abstract hash(plain: string): Promise<string>;
  abstract compare(dbPassword: string, loginPassword: string): Promise<boolean>;
}
