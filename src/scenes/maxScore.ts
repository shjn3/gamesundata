import { scoreObject } from "./Score";
export class maxScore extends scoreObject {
  constructor(cX: number, cY: number) {
    super(cX, cY);
    Object.setPrototypeOf(this, maxScore.prototype);
  }
  draw(ctx: CanvasRenderingContext2D) {
    this.arrNumber.forEach((_e) => {
      ctx.drawImage(
        this.imageSprites,
        _e.sX,
        0,
        20,
        25,
        _e.cX,
        this.cY,
        15,
        15
      );
    });
    ctx.drawImage(
      this.imageSprites,
      1152,
      0,
      40,
      25,
      this.cX - 40,
      this.cY,
      30,
      15
    );
  }
  update(maxScore: number) {
    this.value = maxScore;
    super.update();
  }
}
