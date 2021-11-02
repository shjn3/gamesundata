import {
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

import { Ground } from "./outside/Ground";
import { gameStart } from "./scenes/gameStart";
import { Player } from "./Player/Player";
import { Score } from "./scenes/Score";
import { maxScore } from "./scenes/maxScore";
import { Cloud } from "./outside/Cloud";
import { Obstacles } from "./obstacles/Obstacles";
import { gameOver } from "./scenes/gameOver";

interface _game {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;

  timePrev: number;
  timeCurrent: number;

  gameStatus: number; //status game: start, play, end

  arrGround: Array<Ground>;
  arrCloud: Array<Cloud>;
  arrObstacles: Array<Obstacles>;
  game_start: gameStart;
  dino: Player;
  score: Score;
  maxScore: maxScore;
  game_over: gameOver;
  vX: number; //velocity when move right to left
  max_cloud: number;
  maxObstacles: number;
  init(): void; //initialization
  draw(): void; //draw objects on canvas
  update(): void; //update objects
  createArrGround(): void; //create many cloud
  updateArrGround(): void;
  updateArrCloud(): void;
  addNewCloud(): void;
  updateObstacles(): void;

  collisionDetection(a: Obstacles): void; // measure distance player with obstacles
  reset(): void; // reset when game over.
}

export class Game implements _game {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;

  timePrev: number;
  timeCurrent: number;

  gameStatus: number;
  arrGround: Array<Ground>;
  arrCloud: Array<Cloud>;
  arrObstacles: Array<Obstacles>;
  game_start: gameStart;
  dino: Player;
  score: Score;
  maxScore: maxScore;
  maxObstacles: number;
  game_over: gameOver;
  vX: number;
  max_cloud: number;

  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.ctx = ctx;
    this.canvas = canvas;

    this.vX = -4;
    this.gameStatus = start;
    this.max_cloud = 4;
    this.maxObstacles = 2;
    this.timePrev = 0;
    this.timeCurrent = Date.now();
    this.arrGround = [];
    this.arrCloud = [];
    this.arrObstacles = [];

    this.game_over = new gameOver();
    this.game_start = new gameStart();
    this.dino = new Player();
    this.score = new Score(canvas.width - 100, 20);
    this.maxScore = new maxScore(canvas.width - 250, 20);
    this.init();
  }
  init() {
    this.addNewCloud();
    this.addNewObstacles();
    this.createArrGround();
    //event click
    this.canvas.addEventListener("click", (event) => {
      switch (this.gameStatus) {
        case start:
          if (
            event.offsetX > this.canvas.width / 2 - 50 &&
            event.offsetX < this.canvas.width / 2 + 50 &&
            event.offsetY > this.canvas.height / 2 - 100 &&
            event.offsetY < this.canvas.height / 2
          ) {
            this.gameStatus = play;
          }
          this.reset();
          this.timePrev = Date.now();
          this.timeCurrent = Date.now();
          break;
        case end:
          if (
            event.offsetX > this.canvas.width / 2 - 35 &&
            event.offsetX < this.canvas.width / 2 + 35 &&
            event.offsetY > 120 &&
            event.offsetY < 180
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
    //draw Grounds
    this.arrGround.forEach((_e) => _e.draw(this.ctx));
    if (this.gameStatus === start) {
      this.game_start.draw(this.ctx, this.canvas);
    } else {
      //draw Clouds
      this.arrCloud.forEach((_e) => _e.draw(this.ctx));
      //draw Score
      this.score.draw(this.ctx);
      this.maxScore.draw(this.ctx);
      //draw Dino
      this.dino.draw(this.ctx);
      //draw obstacles
      this.arrObstacles.forEach((_e) => _e.draw(this.ctx));

      if (this.gameStatus === end) {
        this.game_over.draw(
          this.ctx,
          this.canvas,
          this.maxScore.value,
          this.score.value
        );
      }
    }
  }
  update() {
    if (this.gameStatus === play) {
      let delta = this.timeCurrent - this.timePrev;
      this.timePrev = this.timeCurrent;
      this.timeCurrent = Date.now();
      if (this.score.value > 300) {
        this.vX = -7;
      } else {
        if (this.score.value > 200) {
          this.vX = -6;
        } else {
          if (this.score.value > 100) {
            this.vX = -5;
          }
        }
      }
      //update array Ground
      this.updateArrGround();
      //update array cloud
      this.updateArrCloud();
      //update Player.
      this.dino.update();
      //update score
      this.score.update();
      //update obstacles
      this.updateObstacles();
    }
    if (this.gameStatus === end) {
      this.maxScore.update(Math.max(this.maxScore.value, this.score.value));
    }
  }
  updateArrCloud() {
    //update array cloud
    let numberCloud = this.arrCloud.length;
    if (numberCloud) {
      this.arrCloud.forEach((_e) => (_e.cX += this.vX));
      if (
        numberCloud <= this.max_cloud &&
        this.canvas.width - this.arrCloud[numberCloud - 1].cX >
          this.arrCloud[numberCloud - 1].gap
      ) {
        this.addNewCloud();
      }
      if (this.arrCloud[0].cX + 200 < 0) {
        this.arrCloud.splice(0, 1);
      }
    }
  }
  addNewCloud() {
    this.arrCloud.push(new Cloud(this.canvas.width));
  }

  updateObstacles() {
    let lengthArrObstacles = this.arrObstacles.length;
    if (lengthArrObstacles) {
      this.arrObstacles.forEach((_e) => {
        _e.cX += this.vX;

        if (_e.type === 3) _e.update();
        // measure distance player with obstacles.
      });
      if (
        lengthArrObstacles < this.maxObstacles &&
        this.arrObstacles[lengthArrObstacles - 1].cX +
          this.arrObstacles[lengthArrObstacles - 1].cW +
          this.arrObstacles[lengthArrObstacles - 1].gap <
          this.canvas.width
      ) {
        this.addNewObstacles();
      }
      this.collisionDetection(this.arrObstacles[0]);
      if (this.arrObstacles[0].cX + this.arrObstacles[0].cW < 0) {
        this.arrObstacles.shift();
      }
    }
  }
  addNewObstacles() {
    this.arrObstacles.push(new Obstacles(this.canvas, this.vX));
  }

  updateArrGround() {
    this.arrGround.forEach((_e) => (_e.cX += this.vX));
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
  collisionDetection(_obstacles: Obstacles) {
    if (
      this.dino.cX < _obstacles.cX + _obstacles.cW &&
      this.dino.cX + this.dino.cW > _obstacles.cX &&
      this.dino.cY < _obstacles.cY + _obstacles.cH &&
      this.dino.cY + this.dino.cH > _obstacles.cY
    ) {
      this.gameStatus = end;
    }
  }
  reset() {
    this.score.value = 0;
    this.vX = -4;
    this.dino.reset();
    this.arrCloud = [];
    this.arrObstacles = [];
    this.addNewCloud();
    this.addNewObstacles();
  }
}
