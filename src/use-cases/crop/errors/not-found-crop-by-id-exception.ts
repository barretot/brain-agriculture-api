export class NotFoundCropByIdException extends Error {
  constructor(identifier: string) {
    super(`Crop "${identifier}" not found.`);
  }
}
