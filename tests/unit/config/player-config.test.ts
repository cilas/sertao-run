import { describe, it, expect } from 'vitest';
import { PLAYER_CONFIG } from '@/config/PlayerConfig';

describe('PLAYER_CONFIG', () => {
  it('has correct movement speeds', () => {
    expect(PLAYER_CONFIG.speed).toBe(160);
    expect(PLAYER_CONFIG.runSpeed).toBe(240);
    expect(PLAYER_CONFIG.runSpeed).toBeGreaterThan(PLAYER_CONFIG.speed);
  });

  it('has negative jump velocity (upward)', () => {
    expect(PLAYER_CONFIG.jumpVelocity).toBe(-330);
    expect(PLAYER_CONFIG.jumpVelocity).toBeLessThan(0);
  });

  it('has 3 max lives', () => {
    expect(PLAYER_CONFIG.maxLives).toBe(3);
  });

  it('has hurt timing values in milliseconds', () => {
    expect(PLAYER_CONFIG.hurtDuration).toBe(2000);
    expect(PLAYER_CONFIG.hurtBlinkRate).toBe(100);
    expect(PLAYER_CONFIG.hurtDuration).toBeGreaterThan(PLAYER_CONFIG.hurtBlinkRate);
  });

  it('has knockback values', () => {
    expect(PLAYER_CONFIG.knockbackSpeed).toBe(200);
    expect(PLAYER_CONFIG.knockbackDuration).toBe(200);
  });

  it('has coyote time and jump buffer in milliseconds', () => {
    expect(PLAYER_CONFIG.coyoteTime).toBe(80);
    expect(PLAYER_CONFIG.jumpBuffer).toBe(100);
  });

  it('has camera settings', () => {
    expect(PLAYER_CONFIG.cameraLerp).toBeGreaterThan(0);
    expect(PLAYER_CONFIG.cameraLerp).toBeLessThanOrEqual(1);
    expect(PLAYER_CONFIG.cameraDeadzone.width).toBeGreaterThan(0);
    expect(PLAYER_CONFIG.cameraDeadzone.height).toBeGreaterThan(0);
  });

  it('has valid hitbox ratios between 0 and 1', () => {
    expect(PLAYER_CONFIG.hitboxWidthRatio).toBeGreaterThan(0);
    expect(PLAYER_CONFIG.hitboxWidthRatio).toBeLessThanOrEqual(1);
    expect(PLAYER_CONFIG.hitboxHeightRatio).toBeGreaterThan(0);
    expect(PLAYER_CONFIG.hitboxHeightRatio).toBeLessThanOrEqual(1);
  });

  it('has positive sprite dimensions', () => {
    expect(PLAYER_CONFIG.spriteWidth).toBeGreaterThan(0);
    expect(PLAYER_CONFIG.spriteHeight).toBeGreaterThan(0);
  });
});
