import { imageObject } from "../base/image";

interface arrNumber {
  name: string;
  sX: number;
  cX: number;
}
abstract class _score extends imageObject {
  value: number;
  arrNumber: Array<arrNumber>;
  constructor(cX: number, cY: number) {
    super();
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
  abstract update(value?: number): void;
  updateArrNumber() {
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
export class Score extends _score {
  timer: number;
  constructor(cX: number, cY: number) {
    super(cX, cY);
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
    this.updateArrNumber();
  }
}

export class maxScore extends _score {
  constructor(cX: number, cY: number) {
    super(cX, cY);
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
    this.updateArrNumber();
  }
}
