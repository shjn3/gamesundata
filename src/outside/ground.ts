import { imageObject } from "../base/image";

export class Ground extends imageObject {
  vX: number;
  constructor(cX: number, cY: number, canvasWidth: number, vX: number) {
    super();
    this.sX = 0;
    this.sY = 100;
    this.sW = 2400;
    this.sH = 30;
    this.cX = cX;
    this.cY = cY;
    this.cW = canvasWidth * 2;
    this.cH = 30;
    this.vX = vX;
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
