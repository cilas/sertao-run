import Phaser from 'phaser';

import { PLAYER_CONFIG } from '../config/PlayerConfig';
import { InputManager } from '../systems/InputManager';
import { PlayerState } from './PlayerStates';

export class Player extends Phaser.Physics.Arcade.Sprite {
  private readonly inputManager: InputManager;
  private lives: number;
  private currentState: PlayerState;
  private hurtTimer: number;
  private coyoteTimer: number;
  private jumpBufferTimer: number;
  private knockbackTimer: number;
  private blinkTimer: number;
  private wasOnGround: boolean;

  // Pre-computed hitbox values
  private readonly hitW: number;
  private readonly normalHitH: number;
  private readonly crouchHitH: number;
  private readonly hitOffsetX: number;

  constructor(scene: Phaser.Scene, x: number, y: number, inputManager: InputManager) {
    super(scene, x, y, 'player');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.inputManager = inputManager;
    this.lives = PLAYER_CONFIG.maxLives;
    this.currentState = PlayerState.IDLE;
    this.hurtTimer = 0;
    this.coyoteTimer = 0;
    this.jumpBufferTimer = 0;
    this.knockbackTimer = 0;
    this.blinkTimer = 0;
    this.wasOnGround = false;

    this.hitW = Math.floor(PLAYER_CONFIG.spriteWidth * PLAYER_CONFIG.hitboxWidthRatio);
    this.normalHitH = Math.floor(PLAYER_CONFIG.spriteHeight * PLAYER_CONFIG.hitboxHeightRatio);
    this.crouchHitH = Math.floor(this.normalHitH * 0.5);
    this.hitOffsetX = (PLAYER_CONFIG.spriteWidth - this.hitW) / 2;

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(this.hitW, this.normalHitH);
    body.setOffset(this.hitOffsetX, PLAYER_CONFIG.spriteHeight - this.normalHitH);
  }

  update(delta: number): void {
    if (this.currentState === PlayerState.DEAD) return;

    const body = this.body as Phaser.Physics.Arcade.Body;
    const isOnGround = body.blocked.down;

    this.updateCoyoteTime(delta, isOnGround);
    this.updateJumpBuffer(delta);

    if (this.currentState === PlayerState.HURT) {
      this.updateHurtState(delta, body);
      this.wasOnGround = isOnGround;
      return;
    }

    const isLeft = this.inputManager.isLeft();
    const isRight = this.inputManager.isRight();
    const isDown = this.inputManager.isDown();
    const isRunning = this.inputManager.isRun();

    this.applyHorizontalMovement(body, isLeft, isRight, isRunning);
    this.handleCrouch(body, isDown, isOnGround);
    this.handleJump(body, isOnGround);
    this.updateState(isOnGround, isLeft || isRight, isRunning);

    this.wasOnGround = isOnGround;
  }

  takeDamage(sourceX: number): void {
    if (this.currentState === PlayerState.HURT || this.currentState === PlayerState.DEAD) return;

    this.lives -= 1;

    if (this.lives <= 0) {
      this.die();
      return;
    }

    this.currentState = PlayerState.HURT;
    this.hurtTimer = PLAYER_CONFIG.hurtDuration;
    this.blinkTimer = PLAYER_CONFIG.hurtBlinkRate;

    const direction = this.x > sourceX ? 1 : -1;
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setVelocityX(direction * PLAYER_CONFIG.knockbackSpeed);
    this.knockbackTimer = PLAYER_CONFIG.knockbackDuration;
  }

  getLives(): number {
    return this.lives;
  }

  getState(): PlayerState {
    return this.currentState;
  }

  isInvincible(): boolean {
    return this.currentState === PlayerState.HURT || this.currentState === PlayerState.DEAD;
  }

  private updateCoyoteTime(delta: number, isOnGround: boolean): void {
    if (this.wasOnGround && !isOnGround && this.currentState !== PlayerState.JUMPING) {
      this.coyoteTimer = PLAYER_CONFIG.coyoteTime;
    } else if (this.coyoteTimer > 0) {
      this.coyoteTimer = Math.max(0, this.coyoteTimer - delta);
    }
  }

  private updateJumpBuffer(delta: number): void {
    if (this.jumpBufferTimer > 0) {
      this.jumpBufferTimer = Math.max(0, this.jumpBufferTimer - delta);
    }
    if (this.inputManager.isJump()) {
      this.jumpBufferTimer = PLAYER_CONFIG.jumpBuffer;
    }
  }

  private updateHurtState(delta: number, body: Phaser.Physics.Arcade.Body): void {
    this.hurtTimer -= delta;
    this.blinkTimer -= delta;

    if (this.blinkTimer <= 0) {
      this.blinkTimer = PLAYER_CONFIG.hurtBlinkRate;
      this.setAlpha(this.alpha < 0.5 ? 1.0 : 0.3);
    }

    if (this.knockbackTimer > 0) {
      this.knockbackTimer = Math.max(0, this.knockbackTimer - delta);
      if (this.knockbackTimer <= 0) {
        body.setVelocityX(0);
      }
    }

    if (this.hurtTimer <= 0) {
      this.currentState = PlayerState.IDLE;
      this.setAlpha(1.0);
    }
  }

  private applyHorizontalMovement(
    body: Phaser.Physics.Arcade.Body,
    isLeft: boolean,
    isRight: boolean,
    isRunning: boolean,
  ): void {
    if (this.currentState === PlayerState.CROUCHING) return;

    if (isLeft) {
      body.setVelocityX(isRunning ? -PLAYER_CONFIG.runSpeed : -PLAYER_CONFIG.speed);
      this.setFlipX(true);
    } else if (isRight) {
      body.setVelocityX(isRunning ? PLAYER_CONFIG.runSpeed : PLAYER_CONFIG.speed);
      this.setFlipX(false);
    } else {
      body.setVelocityX(0);
    }
  }

  private handleCrouch(
    body: Phaser.Physics.Arcade.Body,
    isDown: boolean,
    isOnGround: boolean,
  ): void {
    if (isDown && isOnGround && this.currentState !== PlayerState.CROUCHING) {
      this.currentState = PlayerState.CROUCHING;
      body.setSize(this.hitW, this.crouchHitH);
      body.setOffset(this.hitOffsetX, PLAYER_CONFIG.spriteHeight - this.crouchHitH);
      body.setVelocityX(0);
    } else if (!isDown && this.currentState === PlayerState.CROUCHING) {
      this.currentState = PlayerState.IDLE;
      body.setSize(this.hitW, this.normalHitH);
      body.setOffset(this.hitOffsetX, PLAYER_CONFIG.spriteHeight - this.normalHitH);
    }
  }

  private handleJump(body: Phaser.Physics.Arcade.Body, isOnGround: boolean): void {
    const canJump =
      (isOnGround || this.coyoteTimer > 0) && this.currentState !== PlayerState.CROUCHING;

    if (this.jumpBufferTimer > 0 && canJump) {
      body.setVelocityY(PLAYER_CONFIG.jumpVelocity);
      this.jumpBufferTimer = 0;
      this.coyoteTimer = 0;
    }
  }

  private updateState(isOnGround: boolean, isMoving: boolean, isRunning: boolean): void {
    if (this.currentState === PlayerState.CROUCHING) return;

    if (!isOnGround) {
      this.currentState = PlayerState.JUMPING;
    } else if (isMoving && isRunning) {
      this.currentState = PlayerState.RUNNING;
    } else if (isMoving) {
      this.currentState = PlayerState.WALKING;
    } else {
      this.currentState = PlayerState.IDLE;
    }
  }

  private die(): void {
    this.currentState = PlayerState.DEAD;
    this.setAlpha(1.0);
    (this.body as Phaser.Physics.Arcade.Body).setVelocity(0, 0);
    this.emit('player:dead');
  }
}
