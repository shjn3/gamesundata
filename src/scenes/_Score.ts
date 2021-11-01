import { imageObject } from "../base/imageObject";

interface arrNumber {
  name: string; // value number: 0, 1, ,2 ,3 ,4, 5, 6, 7, 8, 9.
  sX: number; // position X of object on source image
  cX: number; // position X of object on canvas
}
export abstract class scoreObject extends imageObject {
  value: number;
  arrNumber: Array<arrNumber>;
  constructor(cX: number, cY: number) {
    super();
    Object.setPrototypeOf(this, scoreObject.prototype);

    this.cX = cX;
    this.cY = cY;
    this.value = 0;
    this.arrNumber = this.arrNumber = [
      {
        name: "0",
        sX: 952,
        cX: cX,
      },
      {
        name: "0",
        sX: 952,
        cX: cX + 17,
      },
      {
        name: "0",
        sX: 952,
        cX: cX + 34,
      },
      {
        name: "0",
        sX: 952,
        cX: cX + 51,
      },
      {
        name: "0",
        sX: 952,
        cX: cX + 68,
      },
    ];
  }
  abstract draw(ctx: CanvasRenderingContext2D): void;
  update(value?: number) {
    let splitValue = this.value.toString().split("");
    let lengthSplit = splitValue.length;
    for (let i = 0; i < 5 - lengthSplit; i++) {
      this.arrNumber[i].sX = 952;
      this.arrNumber[i].name = "0";
    }
    for (let i = 5 - lengthSplit; i < 5; i++) {
      if (this.arrNumber[i].name !== splitValue[-5 + (i + lengthSplit)]) {
        this.arrNumber[i].name = splitValue[i + 1 - lengthSplit];
        this.arrNumber[i].sX =
          952 + 20 * parseInt(splitValue[-5 + (i + lengthSplit)]);
      }
    }
  }
}
export class Score extends scoreObject {
  timer: number;
  constructor(cX: number, cY: number) {
    super(cX, cY);
    Object.setPrototypeOf(this, Score.prototype);
    this.timer = 0;
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
  }
  update() {
    this.timer++;
    if (this.timer > 5) {
      this.value++;
      this.timer = 0;
    }
    super.update();
  }
}
