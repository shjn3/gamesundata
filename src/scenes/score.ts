import { imageObject } from "../base/image";

interface arrNumber {
  name: string;
  sX: number;
  cX: number;
}
export class Score extends imageObject {
  value: number;
  isMaxScore: boolean;
  arrNumber: Array<arrNumber>;

  constructor(cX: number, cY: number, isMaxScore: boolean) {
    super();
    this.value = 0;
    this.cX = cX;
    this.cY = cY;
    this.isMaxScore = isMaxScore;
    this.arrNumber = [
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
    if (this.isMaxScore) {
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
  }
  update(delta: number) {
    if (this.isMaxScore) {
      this.value = delta;
    }
    if (delta < 200 && !this.isMaxScore) {
      this.value += Math.round(delta / 34);
    }
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
