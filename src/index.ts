import {
  canvasHeight,
  canvasWidth,
  start,
  play,
  end,
  ArrowUp,
  Space,
  ArrowDown,
  status_run,
  status_duck,
  status_jump,
} from "./config";

import { Ground, Start, Cloud, Player, Score } from "./objects";

interface vectorCloud {
  x: number;
  y: number;
}
const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
canvas.height = canvasHeight;
canvas.width = canvasWidth;

const playStart = new Start(ctx, canvas);
const dino = new Player(ctx, canvas);
const score = new Score(ctx, canvas, canvas.width - 100, 20, false);
const MaxScore = new Score(ctx, canvas, canvas.width - 250, 20, true);
let arrGround: Array<Ground> = [];
let arrCloud: Array<Cloud> = [];

class Game {
  gameStatus: number;
  frame_cloud: Array<vectorCloud>;
  timePrev: number;
  timeCurrent: number;
  valueScore: number;
  constructor() {
    this.gameStatus = play;
    this.frame_cloud = [
      {
        x: canvas.width,
        y: 30,
      },
      {
        x: canvas.width + 100,
        y: 100,
      },
      {
        x: canvas.width + 200,
        y: 200,
      },
      {
        x: canvas.width + 300,
        y: 270,
      },
    ];
    this.timePrev = 0;
    this.timeCurrent = Date.now();
    this.valueScore = 0;
    this.init();
  }
  draw() {
    if (this.gameStatus === start) {
      playStart.draw();
    }
    if (this.gameStatus === play) {
      //draw arrGround
      arrGround.forEach((_e) => _e.draw());
      //draw arrCloud
      arrCloud.forEach((_e) => _e.draw());
      //draw Score
      score.draw();
      MaxScore.draw();
      //draw Dino
      dino.draw();
    }
  }
  init() {
    this.createArrGround();
    this.createArrCloud();
    //event click
    canvas.addEventListener("click", (event) => {
      switch (this.gameStatus) {
        case start:
          if (
            event.offsetX > canvas.width / 2 - 50 &&
            event.offsetX < canvas.width / 2 + 50 &&
            event.offsetY > canvas.height / 2 - 50 &&
            event.offsetY < canvas.height / 2 + 50
          )
            this.gameStatus = play;
          this.timePrev = Date.now();
          this.timeCurrent = Date.now();
          break;
        case end:
          console.log("abc");
          break;
      }
    });
    window.addEventListener("keydown", (event) => {
      if (this.gameStatus === play) {
        switch (event.key) {
          case ArrowUp:
          case Space:
            dino.status = status_jump;
            break;
          case ArrowDown:
            dino.status = status_duck;
            break;
        }
      }
    });
    window.addEventListener("keyup", (event) => {
      if (this.gameStatus === play) {
        switch (event.key) {
          case ArrowDown:
            dino.status = status_run;
            break;
        }
      }
    });
  }
  update() {
    if (this.gameStatus === play) {
      let delta = this.timeCurrent - this.timePrev;
      this.timePrev = this.timeCurrent;
      this.timeCurrent = Date.now();
      //update array Ground
      arrGround.forEach((_e) => (_e.cX += _e.vX));
      if (arrGround[0].cX <= -canvasWidth * 2) {
        arrGround.splice(0, 1);
        let ground = new Ground(
          arrGround[0].cX + canvas.width * 2,
          346,
          ctx,
          canvas
        );
        arrGround.push(ground);
      }
      //update array cloud
      arrCloud.forEach((_e) => (_e.cX += _e.vX));
      if (arrCloud[0].cX + 200 < 0) {
        arrCloud.splice(0, 1);
        let idSelectCloud = Math.round(Math.random() * 3);
        let cloud = new Cloud(
          this.frame_cloud[idSelectCloud].x,
          this.frame_cloud[idSelectCloud].y,
          ctx,
          canvas
        );
        arrCloud.push(cloud);
      }
      //update Player.
      dino.update();
      //update score
      score.update(delta);
    }
    if (this.gameStatus === end) {
      MaxScore.update(Math.max(MaxScore.value, score.value));
    }
  }

  createArrGround() {
    for (let i = 0; i < 3; i++) {
      let ground = new Ground(i * canvas.width * 2, 346, ctx, canvas);
      arrGround.push(ground);
    }
  }
  createArrCloud() {
    for (let i = 0; i < 4; i++) {
      let cloud = new Cloud(
        this.frame_cloud[i].x,
        this.frame_cloud[i].y,
        ctx,
        canvas
      );
      arrCloud.push(cloud);
    }
  }
}

const game = new Game();

function animation() {
  window.requestAnimationFrame(animation);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.draw();
  game.update();
}
animation();
