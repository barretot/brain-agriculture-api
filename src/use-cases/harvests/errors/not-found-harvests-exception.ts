export class NotFoundHarvestsException extends Error {
  constructor() {
    super('Harvests not found.');
  }
}
