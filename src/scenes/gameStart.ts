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
      canvas.height / 2 - 100,
      100,
      100
    );
    ctx.drawImage(this.imageSprites, 75, 0, 100, 110, 15, 307, 60, 70);
    (ctx.font = "30px Arial"),
      ctx.strokeText(
        "Click to start",
        canvas.width / 2 - 75,
        canvas.height / 2 + 24
      );
  }
}
