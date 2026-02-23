import { describe, it, expect } from 'vitest';
import { PlayerState, resolvePlayerState } from '@/entities/PlayerStates';

const baseCtx = {
  isOnGround: true,
  isMovingHorizontally: false,
  isRunning: false,
  isCrouching: false,
  isHurt: false,
  isDead: false,
};

describe('PlayerState enum', () => {
  it('has all required states', () => {
    expect(PlayerState.IDLE).toBeDefined();
    expect(PlayerState.WALKING).toBeDefined();
    expect(PlayerState.RUNNING).toBeDefined();
    expect(PlayerState.JUMPING).toBeDefined();
    expect(PlayerState.CROUCHING).toBeDefined();
    expect(PlayerState.HURT).toBeDefined();
    expect(PlayerState.DEAD).toBeDefined();
  });
});

describe('resolvePlayerState', () => {
  it('returns IDLE when on ground and not moving', () => {
    const state = resolvePlayerState(PlayerState.IDLE, baseCtx);
    expect(state).toBe(PlayerState.IDLE);
  });

  it('returns WALKING when on ground and moving horizontally', () => {
    const state = resolvePlayerState(PlayerState.IDLE, {
      ...baseCtx,
      isMovingHorizontally: true,
    });
    expect(state).toBe(PlayerState.WALKING);
  });

  it('returns RUNNING when on ground, moving, and running modifier active', () => {
    const state = resolvePlayerState(PlayerState.WALKING, {
      ...baseCtx,
      isMovingHorizontally: true,
      isRunning: true,
    });
    expect(state).toBe(PlayerState.RUNNING);
  });

  it('returns JUMPING when not on ground', () => {
    const state = resolvePlayerState(PlayerState.IDLE, {
      ...baseCtx,
      isOnGround: false,
    });
    expect(state).toBe(PlayerState.JUMPING);
  });

  it('returns CROUCHING when on ground and crouching', () => {
    const state = resolvePlayerState(PlayerState.IDLE, {
      ...baseCtx,
      isCrouching: true,
    });
    expect(state).toBe(PlayerState.CROUCHING);
  });

  it('returns HURT regardless of other conditions', () => {
    const state = resolvePlayerState(PlayerState.RUNNING, {
      ...baseCtx,
      isMovingHorizontally: true,
      isRunning: true,
      isHurt: true,
    });
    expect(state).toBe(PlayerState.HURT);
  });

  it('returns DEAD as highest priority', () => {
    const state = resolvePlayerState(PlayerState.HURT, {
      ...baseCtx,
      isHurt: true,
      isDead: true,
    });
    expect(state).toBe(PlayerState.DEAD);
  });

  it('DEAD takes priority over HURT', () => {
    expect(
      resolvePlayerState(PlayerState.IDLE, { ...baseCtx, isDead: true, isHurt: true })
    ).toBe(PlayerState.DEAD);
  });

  it('HURT takes priority over JUMPING', () => {
    expect(
      resolvePlayerState(PlayerState.IDLE, { ...baseCtx, isOnGround: false, isHurt: true })
    ).toBe(PlayerState.HURT);
  });

  it('JUMPING takes priority over CROUCHING (cant crouch in air)', () => {
    expect(
      resolvePlayerState(PlayerState.IDLE, { ...baseCtx, isOnGround: false, isCrouching: true })
    ).toBe(PlayerState.JUMPING);
  });
});
