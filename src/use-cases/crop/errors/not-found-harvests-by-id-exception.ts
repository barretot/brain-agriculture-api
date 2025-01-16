export class NotFoundHarvestsByIdException extends Error {
  constructor(identifier: string) {
    super(`Harvests "${identifier}" not found.`);
  }
}
