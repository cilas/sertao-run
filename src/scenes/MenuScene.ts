import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    const { width, height } = this.scale;

    this.cameras.main.setBackgroundColor('#0f0f0f');

    this.add
      .text(width / 2, height / 2 - 40, 'Sertao Run', {
        fontFamily: 'monospace',
        fontSize: '56px',
        color: '#f5e6c8'
      })
      .setOrigin(0.5);

    const startText = this.add
      .text(width / 2, height / 2 + 36, 'Pressione para jogar', {
        fontFamily: 'monospace',
        fontSize: '26px',
        color: '#ffffff'
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: startText,
      alpha: { from: 1, to: 0.35 },
      yoyo: true,
      repeat: -1,
      duration: 700
    });

    const onStart = () => {
      console.log('iniciar jogo');
    };

    this.input.once('pointerdown', onStart);
    this.input.keyboard?.once('keydown', onStart);
  }
}
