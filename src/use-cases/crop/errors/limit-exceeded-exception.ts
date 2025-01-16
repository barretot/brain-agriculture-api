export class LimitExceededException extends Error {
  constructor(arableArea: string, area: string) {
    super(
      `The arable area ${arableArea} is smaller than the harvest area ${area}.`,
    );
  }
}
