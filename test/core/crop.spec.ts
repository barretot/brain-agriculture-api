import { Crop } from '@/core/domain/entities/Crop';

describe('Crop', () => {
  it('should create a crop with a random UUID if no id is provided', () => {
    const props = {
      cropName: 'Soja',
      area: 150,
    };

    const crop = Crop.create(props);

    expect(crop).toBeInstanceOf(Crop);
    expect(crop.id).toBeDefined();
    expect(crop.id).toHaveLength(36);
    expect(crop.cropName).toBe(props.cropName);
    expect(crop.area).toBe(props.area);
  });

  it('should create a crop with a provided id', () => {
    const customId = 'a1b2c3d4-e5f6-7890-1234-56789abcdef0';
    const props = {
      id: customId,
      cropName: 'Milho',
      area: 200,
    };

    const crop = Crop.create(props);

    expect(crop).toBeInstanceOf(Crop);
    expect(crop.id).toBe(customId);
    expect(crop.cropName).toBe(props.cropName);
    expect(crop.area).toBe(props.area);
  });
});
