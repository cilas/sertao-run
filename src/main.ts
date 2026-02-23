import Phaser from 'phaser';

import { GAME_CONFIG, PHYSICS_BALANCE } from './config';
import { BootScene, DiarioScene, HUDScene, MenuScene, TestScene } from './scenes';
import {
  LeitoDoRioScene,
  SerraNascenteScene,
  SertaoSecoScene
} from './scenes/phases';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: GAME_CONFIG.width,
  height: GAME_CONFIG.height,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: PHYSICS_BALANCE.gravity,
      debug: false
    }
  },
  scene: [
    BootScene,
    MenuScene,
    TestScene,
    HUDScene,
    DiarioScene,
    SertaoSecoScene,
    LeitoDoRioScene,
    SerraNascenteScene
  ],
  backgroundColor: '#000000'
};

new Phaser.Game(config);
