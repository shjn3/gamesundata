import { imageObject } from "../base/image";
import { canvasWidth } from "../utilities/config";

export class gameOver extends imageObject {
  constructor() {
    super();
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
