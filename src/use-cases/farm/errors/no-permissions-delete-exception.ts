export class NoPermissionsDeleteException extends Error {
  constructor() {
    super('No permissions to delete farm');
  }
}
