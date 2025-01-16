export class NotFoundFarmByIdException extends Error {
  constructor(identifier: string) {
    super(`Farm "${identifier}" not found.`);
  }
}
