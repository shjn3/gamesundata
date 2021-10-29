import { canvasHeight, canvasWidth } from "./utilities/config";
import { Game } from "./Game";

const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
  document.getElementById("canvas")
);
const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>(
  canvas.getContext("2d")
);
canvas.height = canvasHeight;
canvas.width = canvasWidth;
const fps: number = 60;
const msPerSecond: number = 1000 / fps;

const game: Game = new Game(ctx, canvas);

function animation(): void {
  setTimeout(() => {
    window.requestAnimationFrame(animation);
  }, msPerSecond);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.draw();
  game.update();
}
animation();
