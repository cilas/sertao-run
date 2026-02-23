import { describe, expect, it } from 'vitest';

import { animationKeys, GAME_HEIGHT, GAME_WIDTH } from '@/config';

describe('sanity', () => {
  it('loads game constants', () => {
    expect(GAME_WIDTH).toBe(800);
    expect(GAME_HEIGHT).toBe(600);
    expect(animationKeys).toEqual([]);
  });
});
