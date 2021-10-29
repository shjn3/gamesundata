import { imageObject } from "../base/imageObject";

export class gameStart extends imageObject {
  imgBtnStart: HTMLImageElement = new Image(); // image button start
  constructor() {
    super();
    Object.setPrototypeOf(this, gameStart.prototype);
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
