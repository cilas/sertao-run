import type { Scene } from 'phaser';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { InputManager } from '@/systems';

describe('InputManager', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('maps keyboard left/right with arrows and WASD', () => {
    const input = new InputManager('keyboard');

    input.setKeyboardFromCode('ArrowLeft', true);
    expect(input.isLeft()).toBe(true);
    input.setKeyboardFromCode('ArrowLeft', false);
    expect(input.isLeft()).toBe(false);

    input.setKeyboardFromCode('KeyA', true);
    expect(input.isLeft()).toBe(true);
    input.setKeyboardFromCode('KeyA', false);
    expect(input.isLeft()).toBe(false);

    input.setKeyboardFromCode('ArrowRight', true);
    expect(input.isRight()).toBe(true);
    input.setKeyboardFromCode('ArrowRight', false);
    expect(input.isRight()).toBe(false);

    input.setKeyboardFromCode('KeyD', true);
    expect(input.isRight()).toBe(true);
  });

  it('maps keyboard jump/down/interact with expected keys', () => {
    const input = new InputManager('keyboard');

    input.setKeyboardFromCode('Space', true);
    expect(input.isJump()).toBe(true);
    input.setKeyboardFromCode('Space', false);
    input.setKeyboardFromCode('KeyW', true);
    expect(input.isJump()).toBe(true);

    input.setKeyboardFromCode('ArrowDown', true);
    expect(input.isDown()).toBe(true);
    input.setKeyboardFromCode('KeyS', true);
    expect(input.isDown()).toBe(true);

    input.setKeyboardFromCode('KeyE', true);
    expect(input.isInteract()).toBe(true);
  });

  it('ignores unsupported keyboard keys', () => {
    const input = new InputManager('keyboard');

    input.setKeyboardFromCode('KeyQ', true);

    expect(input.isLeft()).toBe(false);
    expect(input.isRight()).toBe(false);
    expect(input.isJump()).toBe(false);
    expect(input.isDown()).toBe(false);
    expect(input.isInteract()).toBe(false);
  });

  it('maps touch joystick horizontal and down thresholds', () => {
    const input = new InputManager('touch');

    input.setTouchJoystick(-0.5, 0);
    expect(input.isLeft()).toBe(true);
    expect(input.isRight()).toBe(false);

    input.setTouchJoystick(0.55, 0);
    expect(input.isRight()).toBe(true);
    expect(input.isLeft()).toBe(false);

    input.setTouchJoystick(0, 0.7);
    expect(input.isDown()).toBe(true);
  });

  it('maps touch buttons A/B to jump/interact', () => {
    const input = new InputManager('touch');

    input.setTouchButtonA(true);
    expect(input.isJump()).toBe(true);
    input.setTouchButtonA(false);
    expect(input.isJump()).toBe(false);

    input.setTouchButtonB(true);
    expect(input.isInteract()).toBe(true);
    input.setTouchButtonB(false);
    expect(input.isInteract()).toBe(false);
  });

  it('supports combined keyboard and touch state in unified API', () => {
    const input = new InputManager('keyboard');

    input.setKeyboardFromCode('ArrowLeft', true);
    input.setTouchButtonA(true);

    expect(input.isLeft()).toBe(true);
    expect(input.isJump()).toBe(true);

    input.setKeyboardFromCode('ArrowLeft', false);
    input.setTouchButtonA(false);

    expect(input.isLeft()).toBe(false);
    expect(input.isJump()).toBe(false);
  });

  it('detects touch devices from navigator.maxTouchPoints', () => {
    vi.stubGlobal('navigator', { maxTouchPoints: 2 });
    vi.stubGlobal('window', {});
    vi.stubGlobal('matchMedia', () => ({ matches: false }));

    expect(InputManager.detectTouchDevice()).toBe(true);
  });

  it('detects non-touch devices', () => {
    vi.stubGlobal('navigator', { maxTouchPoints: 0 });
    vi.stubGlobal('window', {});
    vi.stubGlobal('matchMedia', () => ({ matches: false }));

    expect(InputManager.detectTouchDevice()).toBe(false);
  });

  it('creates touch controls only for touch mode', () => {
    const keyboardInput = new InputManager('keyboard');
    const maybeControls = keyboardInput.createTouchControls({} as Scene);

    expect(maybeControls).toBeNull();
  });
});
