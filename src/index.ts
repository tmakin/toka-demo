//import { STLFileLoader } from 'babylonjs-loaders';
import "@babylonjs/loaders/STL"

import { Game } from './game';

window.addEventListener('DOMContentLoaded', () => {
  let game = new Game('renderCanvas');
  game.initScene();
  game.animate();
});
