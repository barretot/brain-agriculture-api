export class NotFoundCropsException extends Error {
  constructor() {
    super('Crops not found.');
  }
}
