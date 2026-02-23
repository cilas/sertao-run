import type { GameObjects, Input, Scene } from 'phaser';

type InputSnapshot = {
  left: boolean;
  right: boolean;
  jump: boolean;
  down: boolean;
  interact: boolean;
  run: boolean;
};

type InputAction = keyof InputSnapshot;
type DeviceMode = 'keyboard' | 'touch';

type TouchControls = {
  container: GameObjects.Container;
  joystickBase: GameObjects.Arc;
  joystickKnob: GameObjects.Arc;
  buttonA: GameObjects.Arc;
  buttonB: GameObjects.Arc;
};

const JOYSTICK_DEADZONE = 0.35;
const JOYSTICK_DOWN_THRESHOLD = 0.5;

const INITIAL_SNAPSHOT: InputSnapshot = {
  left: false,
  right: false,
  jump: false,
  down: false,
  interact: false,
  run: false,
};

const KEY_CODE_TO_ACTION: Record<string, InputAction> = {
  ArrowLeft: 'left',
  KeyA: 'left',
  ArrowRight: 'right',
  KeyD: 'right',
  ArrowUp: 'jump',
  KeyW: 'jump',
  Space: 'jump',
  ArrowDown: 'down',
  KeyS: 'down',
  KeyE: 'interact',
  ShiftLeft: 'run',
  ShiftRight: 'run',
};

export class InputManager {
  private readonly keyboard: InputSnapshot = { ...INITIAL_SNAPSHOT };
  private readonly touch: InputSnapshot = { ...INITIAL_SNAPSHOT };
  private readonly deviceMode: DeviceMode;
  private touchControls: TouchControls | null = null;

  constructor(deviceMode?: DeviceMode) {
    this.deviceMode = deviceMode ?? (InputManager.detectTouchDevice() ? 'touch' : 'keyboard');
  }

  static detectTouchDevice(): boolean {
    const maybeNavigator = globalThis.navigator;
    const hasTouchPoints = typeof maybeNavigator?.maxTouchPoints === 'number' && maybeNavigator.maxTouchPoints > 0;
    const hasTouchEvent = typeof globalThis.window !== 'undefined' && 'ontouchstart' in globalThis.window;
    const hasCoarsePointer =
      typeof globalThis.matchMedia === 'function' && globalThis.matchMedia('(pointer: coarse)').matches;

    return hasTouchPoints || hasTouchEvent || hasCoarsePointer;
  }

  getMode(): DeviceMode {
    return this.deviceMode;
  }

  isTouchDevice(): boolean {
    return this.deviceMode === 'touch';
  }

  isLeft(): boolean {
    return this.keyboard.left || this.touch.left;
  }

  isRight(): boolean {
    return this.keyboard.right || this.touch.right;
  }

  isJump(): boolean {
    return this.keyboard.jump || this.touch.jump;
  }

  isDown(): boolean {
    return this.keyboard.down || this.touch.down;
  }

  isInteract(): boolean {
    return this.keyboard.interact || this.touch.interact;
  }

  isRun(): boolean {
    return this.keyboard.run;
  }

  handleKeyDown(event: Pick<KeyboardEvent, 'code'>): void {
    this.setKeyboardFromCode(event.code, true);
  }

  handleKeyUp(event: Pick<KeyboardEvent, 'code'>): void {
    this.setKeyboardFromCode(event.code, false);
  }

  setKeyboardFromCode(code: string, pressed: boolean): void {
    const action = KEY_CODE_TO_ACTION[code];
    if (!action) return;
    this.keyboard[action] = pressed;
  }

  setTouchJoystick(axisX: number, axisY: number): void {
    this.touch.left = axisX <= -JOYSTICK_DEADZONE;
    this.touch.right = axisX >= JOYSTICK_DEADZONE;
    this.touch.down = axisY >= JOYSTICK_DOWN_THRESHOLD;
  }

  releaseTouchJoystick(): void {
    this.touch.left = false;
    this.touch.right = false;
    this.touch.down = false;
  }

  setTouchButtonA(pressed: boolean): void {
    this.touch.jump = pressed;
  }

  setTouchButtonB(pressed: boolean): void {
    this.touch.interact = pressed;
  }

  bindKeyboard(scene: Scene): void {
    scene.input.keyboard?.on('keydown', this.handleKeyDown, this);
    scene.input.keyboard?.on('keyup', this.handleKeyUp, this);
    scene.events.once('shutdown', () => this.unbindKeyboard(scene));
    scene.events.once('destroy', () => this.unbindKeyboard(scene));
  }

  unbindKeyboard(scene: Scene): void {
    scene.input.keyboard?.off('keydown', this.handleKeyDown, this);
    scene.input.keyboard?.off('keyup', this.handleKeyUp, this);
  }

  createTouchControls(scene: Scene): TouchControls | null {
    if (!this.isTouchDevice()) return null;
    if (this.touchControls) return this.touchControls;

    const width = scene.scale.width;
    const height = scene.scale.height;

    const joystickBase = scene.add.circle(84, height - 92, 58, 0x000000, 0.25).setScrollFactor(0);
    const joystickKnob = scene.add.circle(84, height - 92, 30, 0xffffff, 0.35).setScrollFactor(0);
    const joystickHitArea = scene.add
      .circle(84, height - 92, 76, 0x000000, 0.001)
      .setScrollFactor(0)
      .setInteractive();

    const buttonA = scene.add
      .circle(width - 132, height - 90, 36, 0x3dbf57, 0.5)
      .setScrollFactor(0)
      .setInteractive();
    const buttonB = scene.add
      .circle(width - 60, height - 132, 30, 0x3399ff, 0.5)
      .setScrollFactor(0)
      .setInteractive();

    const labelA = scene.add.text(width - 144, height - 102, 'A', { fontSize: '24px', color: '#ffffff' }).setScrollFactor(0);
    const labelB = scene.add.text(width - 71, height - 143, 'B', { fontSize: '20px', color: '#ffffff' }).setScrollFactor(0);

    const container = scene.add.container(0, 0, [joystickBase, joystickKnob, joystickHitArea, buttonA, buttonB, labelA, labelB]);
    container.setDepth(1000);

    const joystickCenterX = joystickBase.x;
    const joystickCenterY = joystickBase.y;
    const joystickRadius = 46;

    const updateJoystick = (pointer: Input.Pointer): void => {
      const dx = pointer.x - joystickCenterX;
      const dy = pointer.y - joystickCenterY;
      const distance = Math.hypot(dx, dy);
      const clampedRatio = distance === 0 ? 0 : Math.min(1, joystickRadius / distance);
      const limitedX = dx * clampedRatio;
      const limitedY = dy * clampedRatio;
      const normalizedX = limitedX / joystickRadius;
      const normalizedY = limitedY / joystickRadius;

      joystickKnob.setPosition(joystickCenterX + limitedX, joystickCenterY + limitedY);
      this.setTouchJoystick(normalizedX, normalizedY);
    };

    const resetJoystick = (): void => {
      joystickKnob.setPosition(joystickCenterX, joystickCenterY);
      this.releaseTouchJoystick();
    };

    joystickHitArea.on('pointerdown', updateJoystick);
    joystickHitArea.on('pointermove', updateJoystick);
    joystickHitArea.on('pointerup', resetJoystick);
    joystickHitArea.on('pointerout', resetJoystick);

    buttonA.on('pointerdown', () => this.setTouchButtonA(true));
    buttonA.on('pointerup', () => this.setTouchButtonA(false));
    buttonA.on('pointerout', () => this.setTouchButtonA(false));

    buttonB.on('pointerdown', () => this.setTouchButtonB(true));
    buttonB.on('pointerup', () => this.setTouchButtonB(false));
    buttonB.on('pointerout', () => this.setTouchButtonB(false));

    scene.events.once('shutdown', () => {
      this.destroyTouchControls();
    });

    this.touchControls = { container, joystickBase, joystickKnob, buttonA, buttonB };
    return this.touchControls;
  }

  destroyTouchControls(): void {
    if (!this.touchControls) return;
    this.touchControls.container.destroy(true);
    this.touchControls = null;
    this.releaseTouchJoystick();
    this.setTouchButtonA(false);
    this.setTouchButtonB(false);
  }
}
