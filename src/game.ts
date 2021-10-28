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
} from "./utilities/config";

import { Ground } from "./outside/ground";
import { Start } from "./scenes/start";
import { Player } from "./Player/dino";
import { maxScore, Score } from "./scenes/score";
import { Cloud } from "./outside/cloud";
import { vector } from "./utilities/types";
import { Obstacles } from "./obstacles/obstacles";
import { gameOver } from "./scenes/gameOver";

export class Game {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;

  timePrev: number;
  timeCurrent: number;

  gameStatus: number;

  frame_cloud: Array<vector>;
  arrGround: Array<Ground>;
  arrCloud: Array<Cloud>;
  arrObstacles: Array<Obstacles>;
  playStart: Start;
  dino: Player;
  score: Score;
  maxScore: maxScore;
  cactus: Obstacles;
  over: gameOver;
  vX: number;

  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.vX = -4;
    this.over = new gameOver();
    this.cactus = new Obstacles(this.vX);
    this.playStart = new Start();
    this.dino = new Player();
    this.score = new Score(canvas.width - 100, 20);
    this.maxScore = new maxScore(canvas.width - 250, 20);
    this.ctx = ctx;
    this.canvas = canvas;
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
    this.arrGround = [];
    this.arrCloud = [];
    this.arrObstacles = [];
    this.init();
  }
  init() {
    this.createArrGround();
    this.createArrCloud();
    //event click
    this.canvas.addEventListener("click", (event) => {
      switch (this.gameStatus) {
        case start:
          if (
            event.offsetX > this.canvas.width / 2 - 50 &&
            event.offsetX < this.canvas.width / 2 + 50 &&
            event.offsetY > this.canvas.height / 2 - 50 &&
            event.offsetY < this.canvas.height / 2 + 50
          ) {
            this.gameStatus = play;
            this.reset();
          }
          this.timePrev = Date.now();
          this.timeCurrent = Date.now();
          break;
        case end:
          if (
            event.offsetX > this.canvas.width / 2 - 35 &&
            event.offsetX < this.canvas.width / 2 + 35 &&
            event.offsetY > this.canvas.height / 2 - 30 &&
            event.offsetY < this.canvas.height / 2 + 30
          )
            this.gameStatus = start;

          break;
      }
    });
    window.addEventListener("keydown", (event) => {
      if (this.gameStatus === play) {
        switch (event.key) {
          case ArrowUp:
          case Space:
            this.dino.status = status_jump;
            break;
          case ArrowDown:
            this.dino.status = status_duck;
            break;
        }
      }
    });
    window.addEventListener("keyup", (event) => {
      if (this.gameStatus === play) {
        switch (event.key) {
          case ArrowDown:
            this.dino.status = status_run;
            break;
        }
      }
    });
  }
  draw() {
    if (this.gameStatus === start) {
      this.playStart.draw(this.ctx, this.canvas);
    } else {
      //draw arrGround
      this.arrGround.forEach((_e) => _e.draw(this.ctx));
      //draw arrCloud
      this.arrCloud.forEach((_e) => _e.draw(this.ctx));
      //draw Score
      this.score.draw(this.ctx);
      this.maxScore.draw(this.ctx);
      //draw Dino
      this.dino.draw(this.ctx, this.canvas);
      //draw obstacles
      this.cactus.draw(this.ctx);

      if (this.gameStatus === end) {
        this.over.draw(this.ctx, this.canvas);
      }
    }
  }
  update() {
    if (this.gameStatus === play) {
      let delta = this.timeCurrent - this.timePrev;
      this.timePrev = this.timeCurrent;
      this.timeCurrent = Date.now();
      //update array Ground
      this.arrGround.forEach((_e) => (_e.cX += _e.vX));
      if (this.arrGround[0].cX <= -canvasWidth * 2) {
        this.arrGround.splice(0, 1);
        let ground = new Ground(
          this.arrGround[0].cX + this.canvas.width * 2,
          346,
          this.canvas.width,
          this.vX
        );
        this.arrGround.push(ground);
      }
      //update array cloud
      this.arrCloud.forEach((_e) => (_e.cX += _e.vX));
      if (this.arrCloud[0].cX + 200 < 0) {
        this.arrCloud.splice(0, 1);
        let idSelectCloud = Math.round(Math.random() * 3);
        let cloud = new Cloud(
          this.frame_cloud[idSelectCloud].x,
          this.frame_cloud[idSelectCloud].y
        );
        this.arrCloud.push(cloud);
      }
      //update Player.
      this.dino.update();
      //update score
      this.score.update();
      //update obstacles
      this.cactus.update();
      this.distanceMeasure();
    }
    if (this.gameStatus === end) {
      this.maxScore.update(Math.max(this.maxScore.value, this.score.value));
    }
  }

  createArrGround() {
    for (let i = 0; i < 3; i++) {
      let ground = new Ground(
        i * this.canvas.width * 2,
        346,
        this.canvas.width,
        this.vX
      );
      this.arrGround.push(ground);
    }
  }
  createArrCloud() {
    for (let i = 0; i < 4; i++) {
      let cloud = new Cloud(this.frame_cloud[i].x, this.frame_cloud[i].y);
      this.arrCloud.push(cloud);
    }
  }
  distanceMeasure() {
    if (this.dino.status !== status_jump) {
      if (
        this.dino.cX + this.dino.cW >= this.cactus.cX &&
        this.dino.cX + this.dino.cW <= this.cactus.cX + this.cactus.cW &&
        this.dino.cY >= this.cactus.cY &&
        this.dino.cY <= this.cactus.cY + this.cactus.cH
      )
        this.gameStatus = end;
    } else {
      console.log(this.dino.cX);
      console.log(this.dino.cW + this.dino.cX);
      console.log(this.cactus.cX);
      console.log(this.cactus.cX + this.cactus.cW);
      console.log("abc");
      console.log(this.dino.cY + this.dino.cH);
      console.log(this.cactus.cY);
      console.log(this.cactus.cY + this.cactus.cH);
      console.log("condition");
      console.log(this.dino.cX >= this.cactus.cX);
      console.log(this.dino.cX <= this.cactus.cX + this.cactus.cW);
      console.log(this.dino.cX + this.dino.cW >= this.cactus.cX);
      console.log(
        this.dino.cX + this.dino.cW <= this.cactus.cX + this.cactus.cW
      );
      console.log(this.dino.cY + this.dino.cH >= this.cactus.cY);
      console.log(
        this.dino.cY + this.dino.cH <= this.cactus.cY + this.cactus.cH
      );

      if (
        ((this.dino.cX >= this.cactus.cX &&
          this.dino.cX <= this.cactus.cX + this.cactus.cW) ||
          (this.dino.cX + this.dino.cW >= this.cactus.cX &&
            this.dino.cX + this.dino.cW <= this.cactus.cX + this.cactus.cW)) &&
        this.dino.cY + this.dino.cH >= this.cactus.cY &&
        this.dino.cY + this.dino.cH <= this.cactus.cY + this.cactus.cH
      )
        this.gameStatus = end;
    }
  }
  reset() {
    this.score.value = 0;
    this.cactus.cX = 300;
    this.dino.reset();
  }
}
