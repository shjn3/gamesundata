import { imageObject } from "../base/imageObject";

interface _gameOver {
  draw(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    heightScore: number,
    score: number
  ): void; //draw canvas when game end
}

export class gameOver extends imageObject implements _gameOver {
  constructor() {
    super();
    Object.setPrototypeOf(this, gameOver.prototype);
  }
  draw(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    heightScore: number,
    score: number
  ) {
    ctx.beginPath();
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      this.imageSprites,
      955,
      25,
      380,
      30,
      canvas.width / 2 - 135,
      80,
      270,
      20
    );
    ctx.drawImage(
      this.imageSprites,
      0,
      0,
      75,
      70,
      canvas.width / 2 - 35,
      120,
      70,
      60
    );
    ctx.beginPath();
    ctx.fillStyle = "#000";
    ctx.font = "25px Arial";
    ctx.fillText("Click to restart", canvas.width / 2 - 80, 205);

    ctx.font = "20px Arial";
    ctx.fillText(`Hight Score: ${heightScore}`, canvas.width / 2 - 80, 240);
    ctx.fillText(`Score: ${score}`, canvas.width / 2 - 80, 265);
  }
}
