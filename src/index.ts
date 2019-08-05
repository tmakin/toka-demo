import '@babylonjs/loaders/STL';

import { Game } from './game';

window.addEventListener('DOMContentLoaded', () => {
  const game = new Game('renderCanvas');
  game.initScene();
  game.animate();
});
