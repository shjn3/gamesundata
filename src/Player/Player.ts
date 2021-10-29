import { status_run, status_jump, status_duck } from "../utilities/config";
import { imageObject } from "../base/imageObject";

interface fpsPlayer {
  run: number; //fps when Player run
  jump: number; // fps when player jump
  duck: number; // fps when player duck
}
interface _player {
  status: number; // 3 status : run, jump, duck
  msPerSecond: fpsPlayer; // fps
  frames_run: Array<number>; // use create animation when player run
  frames_jump: Array<number>; //  use create animation when player jump
  frames_duck: Array<number>; // use create animation when player duck
  timer: number; // count time for crate animation
  jumpVelocity: number; // velocity when player jump
  gravity: number; // gravity use for player when player jump
  draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void; //draw object on the canvas
  setPositionDuck(): void; //set position, size on canvas, source Image when player duck
  setPositionOther(): void; //set position, size on canvas, source Image when player run, jump
  update(): void; // update property for objects
  reset(): void; //constructor again
}
export class Player extends imageObject implements _player {
  status: number;
  msPerSecond: fpsPlayer;
  frames_run: Array<number>;
  frames_jump: Array<number>;
  frames_duck: Array<number>;
  timer: number;
  jumpVelocity: number;
  gravity: number;
  constructor() {
    super();
    Object.setPrototypeOf(this, Player.prototype);

    this.cX = 15;
    this.cY = 315;
    this.cW = 60;
    this.cH = 70;
    this.sX = 1511;
    this.sY = 0;
    this.sW = 95;
    this.sH = 110;

    this.status = status_run;
    this.msPerSecond = { run: 10, jump: 1000 / 60, duck: 1000 / 60 };
    this.frames_run = [1511, 1599];
    this.frames_jump = [1335];
    this.frames_duck = [1862, 1982];
    this.timer = 0;
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
    this.cY = 320;
  }
  setPositionOther() {
    this.sH = 110;
    this.sW = 95;
    this.cW = 60;
    this.cH = 70;
    this.cY = 315;
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
        this.jumpVelocity = -13;
      }
    }
  }
  reset() {
    this.setPositionOther();
    this.status = status_run;
  }
}
