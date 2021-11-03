import { imageObject } from "../base/imageObject";
import { box } from "../utilities/box";
import {
  cactus_large_one,
  cactus_large_three,
  cactus_small,
  pterodactyl,
} from "../utilities/config";
import { getRandomNumber } from "../utilities/helper";

export class Obstacles extends imageObject {
  timer: number;
  vX: number;
  gap: number;
  type: number;
  arrTypePterodactyl: any;
  arrTypeCactus: any;
  constructor(canvas: HTMLCanvasElement, vX: number) {
    super();
    Object.setPrototypeOf(this, Obstacles.prototype);
    this.type = getRandomNumber(0, 3);
    //this.type = 3;
    this.timer = 0;
    this.gap = 250;
    this.cX = canvas.width;
    this.vX = vX;
    this.arrTypePterodactyl = {
      cY: [290, 270, 320],
      cW: 50,
      cH: 30,
      gap: 300,
      boxes: [new box(260, 0, 90, 70), new box(350, 0, 80, 70)],
    };
    this.arrTypeCactus = {
      large: {
        one: {
          cY: 320,
          cW: 30,
          cH: 60,
          gap: 250,
          boxes: [
            new box(650, 0, 50, 80),
            new box(750, 0, 50, 80),
            new box(700, 0, 50, 80),
            new box(800, 0, 50, 80),
          ],
        },
        three: {
          cY: 315,
          cW: 70,
          cH: 60,
          gap: 400,
          boxes: [new box(850, 0, 100, 90)],
        },
      },
      small: {
        cY: 330,
        cW: 30,
        cH: 45,
        gap: 200,
        boxes: [
          new box(616, 0, 34, 70),
          new box(582, 0, 34, 70),
          new box(548, 0, 34, 70),
          new box(514, 0, 34, 70),
          new box(478, 0, 34, 70),
          new box(446, 0, 34, 70),
        ],
      },
    };
    this.init();
  }
  init() {
    switch (this.type) {
      case cactus_large_one:
        this.cY = this.arrTypeCactus.large.one.cY;
        this.cW = this.arrTypeCactus.large.one.cW;
        this.cH = this.arrTypeCactus.large.one.cH;
        let randomCactusLargeOneBox = getRandomNumber(0, 3);
        this.gap = this.arrTypeCactus.large.one.gap;
        this.sX = this.arrTypeCactus.large.one.boxes[randomCactusLargeOneBox].x;
        this.sY = this.arrTypeCactus.large.one.boxes[randomCactusLargeOneBox].y;
        this.sW =
          this.arrTypeCactus.large.one.boxes[randomCactusLargeOneBox].width;
        this.sH =
          this.arrTypeCactus.large.one.boxes[randomCactusLargeOneBox].height;
        break;
      case cactus_large_three:
        this.cY = this.arrTypeCactus.large.three.cY;
        this.cW = this.arrTypeCactus.large.three.cW;
        this.cH = this.arrTypeCactus.large.three.cH;
        this.gap = this.arrTypeCactus.large.three.gap;
        this.sX = this.arrTypeCactus.large.three.boxes[0].x;
        this.sY = this.arrTypeCactus.large.three.boxes[0].y;
        this.sW = this.arrTypeCactus.large.three.boxes[0].width;
        this.sH = this.arrTypeCactus.large.three.boxes[0].height;
        break;
      case cactus_small:
        this.cY = this.arrTypeCactus.small.cY;
        this.cW = this.arrTypeCactus.small.cW;
        this.cH = this.arrTypeCactus.small.cH;
        let randomCactusSmallBox = getRandomNumber(0, 5);
        this.gap = this.arrTypeCactus.small.gap;
        this.sX = this.arrTypeCactus.small.boxes[randomCactusSmallBox].x;
        this.sY = this.arrTypeCactus.small.boxes[randomCactusSmallBox].y;
        this.sW = this.arrTypeCactus.small.boxes[randomCactusSmallBox].width;
        this.sH = this.arrTypeCactus.small.boxes[randomCactusSmallBox].height;
        break;
      case pterodactyl:
        let randomHeigh = getRandomNumber(0, 2);
        this.cY = this.arrTypePterodactyl.cY[randomHeigh];
        this.cW = this.arrTypePterodactyl.cW;
        this.cH = this.arrTypePterodactyl.cH;
        this.gap = this.arrTypePterodactyl.gap;
        this.sX = this.arrTypePterodactyl.boxes[0].x;
        this.sY = this.arrTypePterodactyl.boxes[0].y;
        this.sW = this.arrTypePterodactyl.boxes[0].width;
        this.sH = this.arrTypePterodactyl.boxes[0].height;

        break;
    }
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
  update() {
    if (this.type === pterodactyl) {
      this.timer++;
      this.cX += -2;
      if (this.timer > 15) {
        this.sX =
          this.arrTypePterodactyl.boxes[0].x === this.sX
            ? this.arrTypePterodactyl.boxes[1].x
            : this.arrTypePterodactyl.boxes[0].x;
        this.timer = 0;
      }
    }
  }
}
