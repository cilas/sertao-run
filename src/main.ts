import Phaser from 'phaser';

import { BootScene, DiarioScene, HUDScene, MenuScene } from './scenes';
import {
  LeitoDoRioScene,
  SerraNascenteScene,
  SertaoSecoScene
} from './scenes/phases';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false
    }
  },
  scene: [
    BootScene,
    MenuScene,
    HUDScene,
    DiarioScene,
    SertaoSecoScene,
    LeitoDoRioScene,
    SerraNascenteScene
  ],
  backgroundColor: '#000000'
};

new Phaser.Game(config);
