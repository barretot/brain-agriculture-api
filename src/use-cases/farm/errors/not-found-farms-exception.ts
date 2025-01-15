export class NotFoundFarmsException extends Error {
  constructor(identifier: string) {
    super(`User "${identifier}" has no farms registered.`);
  }
}
