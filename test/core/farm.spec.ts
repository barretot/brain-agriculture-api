import { Farm } from '@/core/domain/entities/Farm';

describe('Farm', () => {
  it('should create a farm with a random UUID if no id is provided', () => {
    const props = {
      name: 'Fazenda Teste',
      city: 'São Paulo',
      state: 'SP',
      totalArea: 1000,
      arableArea: 800,
      vegetationArea: 200,
    };

    const farm = Farm.create(props);

    expect(farm).toBeInstanceOf(Farm);
    expect(farm.id).toBeDefined();
    expect(farm.id).toHaveLength(36);
    expect(farm.name).toBe(props.name);
    expect(farm.city).toBe(props.city);
    expect(farm.state).toBe(props.state);
    expect(farm.totalArea).toBe(props.totalArea);
    expect(farm.arableArea).toBe(props.arableArea);
    expect(farm.vegetationArea).toBe(props.vegetationArea);
  });

  it('should create a farm with a provided id', () => {
    const customId = '8d7033d8-f65b-468e-82b4-cf7d727eb352';
    const props = {
      id: customId,
      name: 'Fazenda Teste',
      city: 'São Paulo',
      state: 'SP',
      totalArea: 1000,
      arableArea: 800,
      vegetationArea: 200,
    };

    const farm = Farm.create(props);

    expect(farm).toBeInstanceOf(Farm);
    expect(farm.id).toBe(customId);
    expect(farm.name).toBe(props.name);
    expect(farm.city).toBe(props.city);
    expect(farm.state).toBe(props.state);
    expect(farm.totalArea).toBe(props.totalArea);
    expect(farm.arableArea).toBe(props.arableArea);
    expect(farm.vegetationArea).toBe(props.vegetationArea);
  });
});
