import { DashBoardRepository } from '@/core/domain/repositories/dashboard/DashBoardRepository';
import { CreateDashBoardUseCase } from '@/use-cases/dashboard/create-dashboard.use-case';

// Mock do repositório de Dashboard
class InMemoryDashBoardRepository extends DashBoardRepository {
  createDashBoard(): Promise<Record<string, any>> {
    return Promise.resolve({
      totalFarms: 10,
      totalHectares: 5000,
      farmsByState: [
        { state: 'SP', count: 5 },
        { state: 'MG', count: 3 },
        { state: 'RS', count: 2 },
      ],
      cropsByType: [
        {
          cropName: 'Trigo',
          totalArea: 225.6,
        },
        {
          cropName: 'Algodão',
          totalArea: 282.56,
        },
      ],
      landUsage: [
        {
          totalArableArea: 14400,
          totalVegetationArea: 5600,
        },
      ],
    });
  }
}

describe('Create dashboard Use Case', () => {
  it('should return success when creating a dashboard', async () => {
    const dashboardRepository = new InMemoryDashBoardRepository();

    const sut = new CreateDashBoardUseCase(dashboardRepository);

    const result = await sut.execute();

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual(
      expect.objectContaining({
        dash: expect.any(Object),
      }),
    );
  });
});
