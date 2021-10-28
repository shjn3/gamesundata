import { canvasHeight, canvasWidth } from "./utilities/config";
import { Game } from "./game";

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
canvas.height = canvasHeight;
canvas.width = canvasWidth;
const fpt = 60;
const msPerSecond = 1000 / 60;

const game = new Game(ctx, canvas);

function animation() {
  setTimeout(() => {
    window.requestAnimationFrame(animation);
  }, msPerSecond);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.draw();
  game.update();
}
animation();
