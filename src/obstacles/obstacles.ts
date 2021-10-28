import { imageObject } from "../base/image";
let arrCactus = {
  large: {
    one: {
      cY: 290,
      cW: 40,
      cH: 80,

      sY: 0,
      sW: 40,
      sH: 80,
      sX: [650, 750, 700, 800],
    },
    three: {
      cY: 290,
      cW: 100,
      cH: 80,

      sY: 0,
      sW: 100,
      sH: 90,
      sX: [850],
    },
  },
  small: {
    cY: 310,
    cW: 35,
    cH: 60,

    sY: 0,
    sW: 34,
    sH: 70,
    sX: [616, 582, 548, 514, 478, 446],
  },
};

let arrBird = {
  cY: 281,
  cW: 70,
  cH: 50,

  sY: 0,
  sW: 90,
  sH: 70,
  sX: [350, 260],
};
export class Obstacles extends imageObject {
  timer: number;
  vX: number;
  constructor(vX: number) {
    super();
    this.timer = 0;
    this.cX = 300;
    this.cY = 255;
    this.cW = 35;
    this.cH = 60;
    this.vX = vX;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.drawImage(
      this.imageSprites,
      616,
      this.sY,
      34,
      70,
      this.cX,
      this.cY,
      35,
      60
    );
  }
  update() {
    if (this.cX + 35 < 0) {
      this.cX = 400;
    }
    this.cX += this.vX;
  }
}
