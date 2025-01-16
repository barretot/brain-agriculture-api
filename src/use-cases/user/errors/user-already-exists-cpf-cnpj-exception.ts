export class UserAlreadyExistsCpfCnpjException extends Error {
  constructor() {
    super('CPF/CNPJ already registered');
  }
}
