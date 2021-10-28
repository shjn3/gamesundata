import { status_run, status_jump, status_duck } from "../utilities/config";
import { imageObject } from "../base/image";

interface fpsPlayer {
  run: number;
  jump: number;
  duck: number;
}

export class Player extends imageObject {
  status: number;
  sX: number;
  sY: number;
  sW: number;
  sH: number;
  msPerSecond: fpsPlayer;
  frames_run: Array<number>;
  frames_jump: Array<number>;
  frames_duck: Array<number>;
  timer: number;
  isDrop: boolean;
  jumpVelocity: number;
  gravity: number;
  constructor() {
    super();
    this.cX = 15;
    this.cY = 315;
    this.cW = 60;
    this.cH = 70;
    this.status = status_run;
    this.sX = 1511;
    this.sY = 0;
    this.sW = 95;
    this.sH = 110;

    this.msPerSecond = { run: 1000 / 60, jump: 1000 / 60, duck: 1000 / 60 };
    this.frames_run = [1511, 1599];
    this.frames_jump = [1335];
    this.frames_duck = [1862, 1982];
    this.timer = 0;
    this.isDrop = false;
    this.jumpVelocity = -13;
    this.gravity = 0.5;
  }
  draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
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
  setPositionDuck() {
    this.sW = 120;
    this.sH = 90;
    this.cW = 70;
    this.cH = 58;
  }
  setPositionOther() {
    this.sH = 110;
    this.sW = 95;
    this.cW = 60;
    this.cH = 70;
  }
  update() {
    this.timer++;
    //check status run
    if (this.status === status_run) {
      if (this.timer >= this.msPerSecond.run) {
        this.setPositionOther();
        this.sX =
          this.sX === this.frames_run[0]
            ? this.frames_run[1]
            : this.frames_run[0];
        this.timer = 0;
      }
    }
    //check status duck
    if (this.status === status_duck) {
      if (this.timer >= this.msPerSecond.duck) {
        this.setPositionDuck();
        this.sX =
          this.sX === this.frames_duck[0]
            ? this.frames_duck[1]
            : this.frames_duck[0];
        this.timer = 0;
      }
    }
    //check status jump
    if (this.status === status_jump) {
      this.sX = this.frames_jump[0];
      this.jumpVelocity += this.gravity * 1.1;
      this.cY += this.jumpVelocity;
      if (this.cY > 315) {
        this.cY = 315;
        this.status = status_run;
        this.isDrop = false;
        this.jumpVelocity = -13;
      }

      /*if (!this.isDrop) {
        if (this.cY <= 210) this.isDrop = true;
        this.jumpVelocity += this.gravity * (delta / (1000 / 60));
        this.cY += this.jumpVelocity;
      } else {
        if (this.cY >= 315) {
          this.cY = 315;
          this.status = status_run;
          this.isDrop = false;
          this.jumpVelocity = -10;
        }
        
        this.jumpVelocity += this.gravity * (delta / (1000 / 60));
        this.cY += this.jumpVelocity;
      }*/
    }
  }
}
