import { imageObject } from "../base/image";

export class Start extends imageObject {
  imgBtnStart: HTMLImageElement = new Image();
  constructor() {
    super();
    this.imgBtnStart.src = "./image/Scenes/PlayButton.png";
  }
  draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    ctx.beginPath();
    ctx.drawImage(
      this.imgBtnStart,
      canvas.width / 2 - 50,
      canvas.height / 2 - 50,
      100,
      100
    );
    ctx.drawImage(this.imageSprites, 75, 0, 100, 110, 15, 307, 60, 70);
  }
}
