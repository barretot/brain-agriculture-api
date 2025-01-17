import { describe, it, expect } from 'vitest';

import { Harvests } from '@/core/domain/entities/Harvests';

describe('Harvests', () => {
  it('should create a harvest with a random UUID if no id is provided', () => {
    const props = {
      year: '2023',
    };

    const harvest = Harvests.create(props);

    expect(harvest).toBeInstanceOf(Harvests);
    expect(harvest.id).toBeDefined();
    expect(harvest.year).toBe(props.year);
  });

  it('should create a harvest with a provided id', () => {
    const customId = 'a1b2c3d4-e5f6-7890-1234-56789abcdef0';
    const props = {
      id: customId,
      year: '2024',
    };

    const harvest = Harvests.create(props);

    expect(harvest).toBeInstanceOf(Harvests);
    expect(harvest.id).toBe(customId);
    expect(harvest.year).toBe(props.year);
  });
});
