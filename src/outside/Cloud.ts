import { imageObject } from "../base/imageObject";
import { getRandomNumber } from "../utilities/helper";

interface _cloud {
  vX: number; //velocity when cloud move right to left
  gap: number;
  draw(ctx: CanvasRenderingContext2D): void; //draw cloud on canvas
}

export class Cloud extends imageObject implements _cloud {
  vX: number;
  gap: number;
  constructor(cX: number) {
    super();
    Object.setPrototypeOf(this, Cloud.prototype);
    this.sX = 165;
    this.sY = 0;
    this.sW = 100;
    this.sH = 30;
    this.cX = cX;
    this.cY = getRandomNumber(30, 270);
    let randomSizeWidth = getRandomNumber(80, 200);
    this.cW = randomSizeWidth;
    this.cH = randomSizeWidth / 3.2;
    let randomVelocity = getRandomNumber(1, 3);
    this.vX = -1 * randomVelocity;
    this.gap = getRandomNumber(randomSizeWidth - 20, 200);
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
