export abstract class DashBoardRepository {
  abstract createDashBoard(): Promise<Record<string, any>>;
}
