import Phaser from 'phaser';

import { PLAYER_CONFIG } from '../config/PlayerConfig';
import { Player } from '../entities/Player';
import { InputManager } from '../systems/InputManager';

const WORLD_WIDTH = 3200;
const WORLD_HEIGHT = 600;
const TILE = 32;
const GROUND_Y = WORLD_HEIGHT - TILE; // top of ground row: y=568

// Horizontal gaps in the ground (mortal falls)
const GAPS: Array<{ x: number; width: number }> = [
  { x: 640, width: 64 }, // 2-tile gap
  { x: 1280, width: 96 }, // 3-tile gap
  { x: 2240, width: 128 }, // 4-tile gap (wider, harder)
];

// Floating platforms [x, y, widthInTiles]
const PLATFORMS: Array<[number, number, number]> = [
  [400, 430, 4],
  [720, 450, 3],
  [960, 370, 3],
  [1200, 430, 4],
  [1520, 460, 2],
  [1720, 370, 3],
  [1920, 460, 2],
  [2080, 410, 4],
  [2400, 370, 3],
  [2720, 450, 3],
  [2920, 410, 2],
];

export class TestScene extends Phaser.Scene {
  private player!: Player;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private inputManager!: InputManager;
  private livesGfx!: Phaser.GameObjects.Graphics;
  private stateText!: Phaser.GameObjects.Text;

  constructor() {
    super('TestScene');
  }

  create(): void {
    this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

    this.createTextures();
    this.createLevel();

    this.inputManager = new InputManager();
    this.inputManager.bindKeyboard(this);

    this.player = new Player(this, 80, GROUND_Y - 48, this.inputManager);
    this.physics.add.collider(this.player, this.platforms);

    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    this.cameras.main.startFollow(
      this.player,
      true,
      PLAYER_CONFIG.cameraLerp,
      PLAYER_CONFIG.cameraLerp,
    );
    this.cameras.main.setDeadzone(
      PLAYER_CONFIG.cameraDeadzone.width,
      PLAYER_CONFIG.cameraDeadzone.height,
    );

    this.createHUD();
    this.player.on('player:dead', this.onPlayerDead, this);
  }

  update(_time: number, delta: number): void {
    this.player.update(delta);
    this.updateHUD();
  }

  private createTextures(): void {
    // Player placeholder: green rectangle
    const playerGfx = this.add.graphics();
    playerGfx.fillStyle(0x4caf50);
    playerGfx.fillRect(0, 0, PLAYER_CONFIG.spriteWidth, PLAYER_CONFIG.spriteHeight);
    playerGfx.lineStyle(2, 0x2e7d32);
    playerGfx.strokeRect(0, 0, PLAYER_CONFIG.spriteWidth, PLAYER_CONFIG.spriteHeight);
    playerGfx.generateTexture('player', PLAYER_CONFIG.spriteWidth, PLAYER_CONFIG.spriteHeight);
    playerGfx.destroy();

    // Ground tile: brown
    const groundGfx = this.add.graphics();
    groundGfx.fillStyle(0x8b4513);
    groundGfx.fillRect(0, 0, TILE, TILE);
    groundGfx.lineStyle(1, 0x5d2e0c);
    groundGfx.strokeRect(0, 0, TILE, TILE);
    groundGfx.generateTexture('tile_ground', TILE, TILE);
    groundGfx.destroy();

    // Platform tile: gray
    const platGfx = this.add.graphics();
    platGfx.fillStyle(0x888888);
    platGfx.fillRect(0, 0, TILE, TILE);
    platGfx.lineStyle(1, 0x555555);
    platGfx.strokeRect(0, 0, TILE, TILE);
    platGfx.generateTexture('tile_platform', TILE, TILE);
    platGfx.destroy();

    // Sky background
    this.cameras.main.setBackgroundColor('#87ceeb');
  }

  private createLevel(): void {
    this.platforms = this.physics.add.staticGroup();

    this.placeGround();
    this.placeFloatingPlatforms();
    this.placeWalls();
  }

  private placeGround(): void {
    for (let x = 0; x < WORLD_WIDTH; x += TILE) {
      if (this.isInGap(x)) continue;
      // Place 2 rows to form solid ground
      this.platforms.create(x + TILE / 2, GROUND_Y + TILE / 2, 'tile_ground');
      this.platforms.create(x + TILE / 2, GROUND_Y + TILE / 2 + TILE, 'tile_ground');
    }
  }

  private placeFloatingPlatforms(): void {
    for (const [px, py, widthTiles] of PLATFORMS) {
      for (let i = 0; i < widthTiles; i++) {
        this.platforms.create(px + i * TILE + TILE / 2, py, 'tile_platform');
      }
    }
  }

  private placeWalls(): void {
    // Left boundary wall
    for (let y = 0; y <= WORLD_HEIGHT; y += TILE) {
      this.platforms.create(-TILE / 2, y, 'tile_ground');
    }
  }

  private isInGap(x: number): boolean {
    return GAPS.some((gap) => x >= gap.x && x < gap.x + gap.width);
  }

  private createHUD(): void {
    // Lives: colored squares fixed to camera
    this.livesGfx = this.add.graphics().setScrollFactor(0).setDepth(100);

    // State debug text
    this.stateText = this.add
      .text(WORLD_WIDTH / 2, 12, '', {
        fontFamily: 'monospace',
        fontSize: '13px',
        color: '#ffffff',
        backgroundColor: '#00000088',
        padding: { x: 6, y: 3 },
      })
      .setScrollFactor(0)
      .setDepth(100)
      .setOrigin(0.5, 0);

    // Back-to-menu hint
    this.add
      .text(8, WORLD_HEIGHT - 20, 'ESC = menu  |  PRD-01 test map', {
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#ffffffaa',
      })
      .setScrollFactor(0)
      .setDepth(100);

    this.input.keyboard?.once('keydown-ESC', () => this.scene.start('MenuScene'));
  }

  private updateHUD(): void {
    this.livesGfx.clear();
    const lives = this.player.getLives();
    for (let i = 0; i < PLAYER_CONFIG.maxLives; i++) {
      this.livesGfx.fillStyle(i < lives ? 0xd4a017 : 0x444444);
      this.livesGfx.fillRect(16 + i * 32, 16, 24, 24);
    }
    this.stateText.setText(`Ze: ${this.player.getState()}`);
  }

  private onPlayerDead(): void {
    this.time.delayedCall(800, () => {
      this.scene.restart();
    });
  }
}
