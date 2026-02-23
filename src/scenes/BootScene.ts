import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    const { width, height } = this.scale;

    this.cameras.main.setBackgroundColor('#1b1b1b');

    const barWidth = 420;
    const barHeight = 24;
    const x = width / 2 - barWidth / 2;
    const y = height / 2 - barHeight / 2;

    this.add
      .text(width / 2, y - 36, 'Carregando...', {
        fontFamily: 'monospace',
        fontSize: '20px',
        color: '#ffffff'
      })
      .setOrigin(0.5);

    const track = this.add.rectangle(
      width / 2,
      height / 2,
      barWidth,
      barHeight,
      0x3a3a3a
    );
    track.setStrokeStyle(2, 0x8b8b8b);

    const progressBar = this.add.rectangle(
      x + 2,
      y + barHeight / 2,
      0,
      barHeight - 4,
      0x2ecc71
    );
    progressBar.setOrigin(0, 0.5);

    this.load.on('progress', (progress: number) => {
      progressBar.width = (barWidth - 4) * progress;
    });

    this.load.on('complete', () => {
      this.time.delayedCall(200, () => {
        this.scene.start('MenuScene');
      });
    });

    // Placeholder files so boot loading has real progress until assets are added.
    this.load.text('sprites-index', 'assets/sprites/.gitkeep');
    this.load.text('tilemaps-index', 'assets/tilemaps/.gitkeep');
    this.load.text('fonts-index', 'assets/fonts/.gitkeep');
    this.load.text('music-index', 'assets/audio/music/.gitkeep');
    this.load.text('sfx-index', 'assets/audio/sfx/.gitkeep');
    this.load.text('ambient-index', 'assets/audio/ambient/.gitkeep');
  }

  create() {
    this.cameras.main.setBackgroundColor('#1b1b1b');
  }
}
