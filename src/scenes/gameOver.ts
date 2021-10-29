import { imageObject } from "../base/imageObject";

interface _gameOver {
  draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void; //draw canvas when game end
}

export class gameOver extends imageObject implements _gameOver {
  constructor() {
    super();
    Object.setPrototypeOf(this, gameOver.prototype);
  }
  draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    ctx.drawImage(
      this.imageSprites,
      955,
      25,
      380,
      30,
      canvas.width / 2 - 135,
      canvas.height / 2 - 80,
      270,
      20
    );
    ctx.drawImage(
      this.imageSprites,
      0,
      0,
      80,
      70,
      canvas.width / 2 - 35,
      canvas.height / 2 - 30,
      70,
      60
    );
  }
}
