import { imageObject } from "../base/image";

export class Cloud extends imageObject {
  vX: number;
  constructor(cX: number, cY: number) {
    super();
    this.sX = 165;
    this.sY = 0;
    this.sW = 100;
    this.sH = 30;
    this.cX = cX;
    this.cY = cY;
    this.cW = 200;
    this.cH = 60;
    this.vX = -1;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.drawImage(
      this.imageSprites,
      this.sX,
      this.sY,
      this.sW,
      this.sH,
      this.cX,
      this.cY,
      this.cW,
      this.cH
    );
  }
}
