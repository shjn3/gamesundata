/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Game = void 0;\r\nconst config_1 = __webpack_require__(/*! ./utilities/config */ \"./src/utilities/config.ts\");\r\nconst Ground_1 = __webpack_require__(/*! ./outside/Ground */ \"./src/outside/Ground.ts\");\r\nconst gameStart_1 = __webpack_require__(/*! ./scenes/gameStart */ \"./src/scenes/gameStart.ts\");\r\nconst Player_1 = __webpack_require__(/*! ./Player/Player */ \"./src/Player/Player.ts\");\r\nconst Score_1 = __webpack_require__(/*! ./scenes/Score */ \"./src/scenes/Score.ts\");\r\nconst maxScore_1 = __webpack_require__(/*! ./scenes/maxScore */ \"./src/scenes/maxScore.ts\");\r\nconst Cloud_1 = __webpack_require__(/*! ./outside/Cloud */ \"./src/outside/Cloud.ts\");\r\nconst Obstacles_1 = __webpack_require__(/*! ./obstacles/Obstacles */ \"./src/obstacles/Obstacles.ts\");\r\nconst gameOver_1 = __webpack_require__(/*! ./scenes/gameOver */ \"./src/scenes/gameOver.ts\");\r\nclass Game {\r\n    constructor(ctx, canvas) {\r\n        this.ctx = ctx;\r\n        this.canvas = canvas;\r\n        this.vX = -4;\r\n        this.gameStatus = config_1.start;\r\n        this.max_cloud = 4;\r\n        this.maxObstacles = 2;\r\n        this.timePrev = 0;\r\n        this.timeCurrent = Date.now();\r\n        this.arrGround = [];\r\n        this.arrCloud = [];\r\n        this.arrObstacles = [];\r\n        this.game_over = new gameOver_1.gameOver();\r\n        this.game_start = new gameStart_1.gameStart();\r\n        this.dino = new Player_1.Player();\r\n        this.score = new Score_1.Score(canvas.width - 100, 20);\r\n        this.maxScore = new maxScore_1.maxScore(canvas.width - 250, 20);\r\n        this.init();\r\n    }\r\n    init() {\r\n        this.addNewCloud();\r\n        this.addNewObstacles();\r\n        this.createArrGround();\r\n        //event click\r\n        this.canvas.addEventListener(\"click\", (event) => {\r\n            switch (this.gameStatus) {\r\n                case config_1.start:\r\n                    if (event.offsetX > this.canvas.width / 2 - 50 &&\r\n                        event.offsetX < this.canvas.width / 2 + 50 &&\r\n                        event.offsetY > this.canvas.height / 2 - 100 &&\r\n                        event.offsetY < this.canvas.height / 2) {\r\n                        this.gameStatus = config_1.play;\r\n                    }\r\n                    this.reset();\r\n                    this.timePrev = Date.now();\r\n                    this.timeCurrent = Date.now();\r\n                    break;\r\n                case config_1.end:\r\n                    if (event.offsetX > this.canvas.width / 2 - 35 &&\r\n                        event.offsetX < this.canvas.width / 2 + 35 &&\r\n                        event.offsetY > 120 &&\r\n                        event.offsetY < 180)\r\n                        this.gameStatus = config_1.start;\r\n                    break;\r\n            }\r\n        });\r\n        window.addEventListener(\"keydown\", (event) => {\r\n            if (this.gameStatus === config_1.play) {\r\n                switch (event.key) {\r\n                    case config_1.ArrowUp:\r\n                    case config_1.Space:\r\n                        this.dino.status = config_1.status_jump;\r\n                        break;\r\n                    case config_1.ArrowDown:\r\n                        this.dino.status = config_1.status_duck;\r\n                        break;\r\n                }\r\n            }\r\n        });\r\n        window.addEventListener(\"keyup\", (event) => {\r\n            if (this.gameStatus === config_1.play) {\r\n                switch (event.key) {\r\n                    case config_1.ArrowDown:\r\n                        this.dino.status = config_1.status_run;\r\n                        break;\r\n                }\r\n            }\r\n        });\r\n    }\r\n    draw() {\r\n        //draw Grounds\r\n        this.arrGround.forEach((_e) => _e.draw(this.ctx));\r\n        if (this.gameStatus === config_1.start) {\r\n            this.game_start.draw(this.ctx, this.canvas);\r\n        }\r\n        else {\r\n            //draw Clouds\r\n            this.arrCloud.forEach((_e) => _e.draw(this.ctx));\r\n            //draw Score\r\n            this.score.draw(this.ctx);\r\n            this.maxScore.draw(this.ctx);\r\n            //draw Dino\r\n            this.dino.draw(this.ctx, this.canvas);\r\n            //draw obstacles\r\n            this.arrObstacles.forEach((_e) => _e.draw(this.ctx));\r\n            if (this.gameStatus === config_1.end) {\r\n                this.game_over.draw(this.ctx, this.canvas, this.maxScore.value, this.score.value);\r\n            }\r\n        }\r\n    }\r\n    update() {\r\n        if (this.gameStatus === config_1.play) {\r\n            let delta = this.timeCurrent - this.timePrev;\r\n            this.timePrev = this.timeCurrent;\r\n            this.timeCurrent = Date.now();\r\n            if (this.score.value > 300) {\r\n                this.vX = -7;\r\n            }\r\n            else {\r\n                if (this.score.value > 200) {\r\n                    this.vX = -6;\r\n                }\r\n                else {\r\n                    if (this.score.value > 100) {\r\n                        this.vX = -5;\r\n                    }\r\n                }\r\n            }\r\n            //update array Ground\r\n            this.updateArrGround();\r\n            //update array cloud\r\n            this.updateArrCloud();\r\n            //update Player.\r\n            this.dino.update();\r\n            //update score\r\n            this.score.update();\r\n            //update obstacles\r\n            this.updateObstacles();\r\n        }\r\n        if (this.gameStatus === config_1.end) {\r\n            this.maxScore.update(Math.max(this.maxScore.value, this.score.value));\r\n        }\r\n    }\r\n    updateArrCloud() {\r\n        //update array cloud\r\n        let numberCloud = this.arrCloud.length;\r\n        if (numberCloud) {\r\n            this.arrCloud.forEach((_e) => (_e.cX += this.vX));\r\n            if (numberCloud <= this.max_cloud &&\r\n                this.canvas.width - this.arrCloud[numberCloud - 1].cX >\r\n                    this.arrCloud[numberCloud - 1].gap) {\r\n                this.addNewCloud();\r\n            }\r\n            if (this.arrCloud[0].cX + 200 < 0) {\r\n                this.arrCloud.splice(0, 1);\r\n            }\r\n        }\r\n    }\r\n    addNewCloud() {\r\n        this.arrCloud.push(new Cloud_1.Cloud(this.canvas.width));\r\n    }\r\n    updateObstacles() {\r\n        let lengthArrObstacles = this.arrObstacles.length;\r\n        if (lengthArrObstacles) {\r\n            this.arrObstacles.forEach((_e) => {\r\n                _e.cX += this.vX;\r\n                if (_e.type === 3)\r\n                    _e.update();\r\n                // measure distance player with obstacles.\r\n            });\r\n            if (lengthArrObstacles < this.maxObstacles &&\r\n                this.arrObstacles[lengthArrObstacles - 1].cX +\r\n                    this.arrObstacles[lengthArrObstacles - 1].cW +\r\n                    this.arrObstacles[lengthArrObstacles - 1].gap <\r\n                    this.canvas.width) {\r\n                this.addNewObstacles();\r\n            }\r\n            this.collisionDetection(this.arrObstacles[0]);\r\n            if (this.arrObstacles[0].cX + this.arrObstacles[0].cW < 0) {\r\n                this.arrObstacles.shift();\r\n            }\r\n        }\r\n    }\r\n    addNewObstacles() {\r\n        this.arrObstacles.push(new Obstacles_1.Obstacles(this.canvas, this.vX));\r\n    }\r\n    updateArrGround() {\r\n        this.arrGround.forEach((_e) => (_e.cX += this.vX));\r\n        if (this.arrGround[0].cX <= -config_1.canvasWidth * 2) {\r\n            this.arrGround.splice(0, 1);\r\n            let ground = new Ground_1.Ground(this.arrGround[0].cX + this.canvas.width * 2, 346, this.canvas.width, this.vX);\r\n            this.arrGround.push(ground);\r\n        }\r\n    }\r\n    createArrGround() {\r\n        for (let i = 0; i < 3; i++) {\r\n            let ground = new Ground_1.Ground(i * this.canvas.width * 2, 346, this.canvas.width, this.vX);\r\n            this.arrGround.push(ground);\r\n        }\r\n    }\r\n    collisionDetection(_obstacles) {\r\n        if (this.dino.cX < _obstacles.cX + _obstacles.cW &&\r\n            this.dino.cX + this.dino.cW > _obstacles.cX &&\r\n            this.dino.cY < _obstacles.cY + _obstacles.cH &&\r\n            this.dino.cY + this.dino.cH > _obstacles.cY) {\r\n            this.gameStatus = config_1.end;\r\n        }\r\n    }\r\n    reset() {\r\n        this.score.value = 0;\r\n        this.vX = -4;\r\n        this.dino.reset();\r\n        this.arrCloud = [];\r\n        this.arrObstacles = [];\r\n        this.addNewCloud();\r\n        this.addNewObstacles();\r\n    }\r\n}\r\nexports.Game = Game;\r\n\n\n//# sourceURL=webpack://game/./src/Game.ts?");

/***/ }),

/***/ "./src/Player/Player.ts":
/*!******************************!*\
  !*** ./src/Player/Player.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Player = void 0;\r\nconst config_1 = __webpack_require__(/*! ../utilities/config */ \"./src/utilities/config.ts\");\r\nconst imageObject_1 = __webpack_require__(/*! ../base/imageObject */ \"./src/base/imageObject.ts\");\r\nclass Player extends imageObject_1.imageObject {\r\n    constructor() {\r\n        super();\r\n        Object.setPrototypeOf(this, Player.prototype);\r\n        this.cX = 15;\r\n        this.cY = 315;\r\n        this.cW = 60;\r\n        this.cH = 70;\r\n        this.sX = 1511;\r\n        this.sY = 0;\r\n        this.sW = 95;\r\n        this.sH = 110;\r\n        this.status = config_1.status_run;\r\n        this.msPerSecond = { run: 10, jump: 1000 / 60, duck: 1000 / 60 };\r\n        this.frames_run = [1511, 1599];\r\n        this.frames_jump = [1335];\r\n        this.frames_duck = [1862, 1982];\r\n        this.timer = 0;\r\n        this.jumpVelocity = -15;\r\n        this.gravity = 0.5;\r\n    }\r\n    draw(ctx, canvas) {\r\n        ctx.beginPath();\r\n        ctx.drawImage(this.imageSprites, this.sX, this.sY, this.sW, this.sH, this.cX, this.cY, this.cW, this.cH);\r\n        //ctx.drawImage(this.imageSprites, 252, 0, 90, 70, 400, 280, 70, 50);\r\n        //ctx.drawImage(this.imageSprites, 350, 0, 90, 70, 400, 280, 70, 50);\r\n    }\r\n    setPositionDuck() {\r\n        this.sW = 120;\r\n        this.sH = 90;\r\n        this.cW = 70;\r\n        this.cH = 58;\r\n        this.cY = 320;\r\n    }\r\n    setPositionOther() {\r\n        this.sH = 110;\r\n        this.sW = 95;\r\n        this.cW = 60;\r\n        this.cH = 70;\r\n        this.cY = 315;\r\n    }\r\n    update() {\r\n        this.timer++;\r\n        //check status run\r\n        if (this.status === config_1.status_run) {\r\n            if (this.timer >= this.msPerSecond.run) {\r\n                this.setPositionOther();\r\n                this.sX =\r\n                    this.sX === this.frames_run[0]\r\n                        ? this.frames_run[1]\r\n                        : this.frames_run[0];\r\n                this.timer = 0;\r\n            }\r\n        }\r\n        //check status duck\r\n        if (this.status === config_1.status_duck) {\r\n            if (this.timer >= this.msPerSecond.duck) {\r\n                this.setPositionDuck();\r\n                this.sX =\r\n                    this.sX === this.frames_duck[0]\r\n                        ? this.frames_duck[1]\r\n                        : this.frames_duck[0];\r\n                this.timer = 0;\r\n            }\r\n        }\r\n        //check status jump\r\n        if (this.status === config_1.status_jump) {\r\n            this.sX = this.frames_jump[0];\r\n            this.jumpVelocity += this.gravity * 1.1;\r\n            this.cY += this.jumpVelocity;\r\n            if (this.cY > 315) {\r\n                this.cY = 315;\r\n                this.status = config_1.status_run;\r\n                this.jumpVelocity = -15;\r\n            }\r\n        }\r\n    }\r\n    reset() {\r\n        this.setPositionOther();\r\n        this.status = config_1.status_run;\r\n    }\r\n}\r\nexports.Player = Player;\r\n\n\n//# sourceURL=webpack://game/./src/Player/Player.ts?");

/***/ }),

/***/ "./src/base/Object.ts":
/*!****************************!*\
  !*** ./src/base/Object.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports._Object = void 0;\r\nclass _Object {\r\n    constructor() {\r\n        this.cX = 0;\r\n        this.cY = 0;\r\n        this.cW = 0;\r\n        this.cH = 0;\r\n        this.sX = 0;\r\n        this.sY = 0;\r\n        this.sW = 0;\r\n        this.sH = 0;\r\n    }\r\n}\r\nexports._Object = _Object;\r\n\n\n//# sourceURL=webpack://game/./src/base/Object.ts?");

/***/ }),

/***/ "./src/base/imageObject.ts":
/*!*********************************!*\
  !*** ./src/base/imageObject.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.imageObject = void 0;\r\nconst Object_1 = __webpack_require__(/*! ./Object */ \"./src/base/Object.ts\");\r\nclass imageObject extends Object_1._Object {\r\n    constructor() {\r\n        super();\r\n        this.imageSprites = new Image();\r\n        Object.setPrototypeOf(this, imageObject.prototype);\r\n        this.imageSprites.src = \"./image/assets/sprite.png\";\r\n    }\r\n}\r\nexports.imageObject = imageObject;\r\n\n\n//# sourceURL=webpack://game/./src/base/imageObject.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst config_1 = __webpack_require__(/*! ./utilities/config */ \"./src/utilities/config.ts\");\r\nconst Game_1 = __webpack_require__(/*! ./Game */ \"./src/Game.ts\");\r\nconst canvas = (document.getElementById(\"canvas\"));\r\nconst ctx = (canvas.getContext(\"2d\"));\r\ncanvas.height = config_1.canvasHeight;\r\ncanvas.width = config_1.canvasWidth;\r\nconst fps = 60;\r\nconst msPerSecond = 1000 / fps;\r\nconst game = new Game_1.Game(ctx, canvas);\r\nfunction animation() {\r\n    setTimeout(() => {\r\n        window.requestAnimationFrame(animation);\r\n    }, msPerSecond);\r\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\r\n    game.draw();\r\n    game.update();\r\n}\r\nanimation();\r\n\n\n//# sourceURL=webpack://game/./src/index.ts?");

/***/ }),

/***/ "./src/obstacles/Obstacles.ts":
/*!************************************!*\
  !*** ./src/obstacles/Obstacles.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Obstacles = void 0;\r\nconst imageObject_1 = __webpack_require__(/*! ../base/imageObject */ \"./src/base/imageObject.ts\");\r\nconst box_1 = __webpack_require__(/*! ../utilities/box */ \"./src/utilities/box.ts\");\r\nconst config_1 = __webpack_require__(/*! ../utilities/config */ \"./src/utilities/config.ts\");\r\nconst helper_1 = __webpack_require__(/*! ../utilities/helper */ \"./src/utilities/helper.ts\");\r\nclass Obstacles extends imageObject_1.imageObject {\r\n    constructor(canvas, vX) {\r\n        super();\r\n        Object.setPrototypeOf(this, Obstacles.prototype);\r\n        this.type = (0, helper_1.getRandomNumber)(0, 3);\r\n        //this.type = 3;\r\n        this.timer = 0;\r\n        this.gap = 250;\r\n        this.cX = canvas.width;\r\n        this.vX = vX;\r\n        this.arrTypePterodactyl = {\r\n            cY: 290,\r\n            cW: 50,\r\n            cH: 30,\r\n            gap: 300,\r\n            boxes: [new box_1.box(260, 0, 90, 70), new box_1.box(350, 0, 80, 70)],\r\n        };\r\n        this.arrTypeCactus = {\r\n            large: {\r\n                one: {\r\n                    cY: 320,\r\n                    cW: 30,\r\n                    cH: 60,\r\n                    gap: 250,\r\n                    boxes: [\r\n                        new box_1.box(650, 0, 50, 80),\r\n                        new box_1.box(750, 0, 50, 80),\r\n                        new box_1.box(700, 0, 50, 80),\r\n                        new box_1.box(800, 0, 50, 80),\r\n                    ],\r\n                },\r\n                three: {\r\n                    cY: 315,\r\n                    cW: 70,\r\n                    cH: 60,\r\n                    gap: 400,\r\n                    boxes: [new box_1.box(850, 0, 100, 90)],\r\n                },\r\n            },\r\n            small: {\r\n                cY: 330,\r\n                cW: 30,\r\n                cH: 45,\r\n                gap: 200,\r\n                boxes: [\r\n                    new box_1.box(616, 0, 34, 70),\r\n                    new box_1.box(582, 0, 34, 70),\r\n                    new box_1.box(548, 0, 34, 70),\r\n                    new box_1.box(514, 0, 34, 70),\r\n                    new box_1.box(478, 0, 34, 70),\r\n                    new box_1.box(446, 0, 34, 70),\r\n                ],\r\n            },\r\n        };\r\n        this.init();\r\n    }\r\n    init() {\r\n        switch (this.type) {\r\n            case config_1.cactus_large_one:\r\n                this.cY = this.arrTypeCactus.large.one.cY;\r\n                this.cW = this.arrTypeCactus.large.one.cW;\r\n                this.cH = this.arrTypeCactus.large.one.cH;\r\n                let randomCactusLargeOneBox = (0, helper_1.getRandomNumber)(0, 3);\r\n                this.gap = this.arrTypeCactus.large.one.gap;\r\n                this.sX = this.arrTypeCactus.large.one.boxes[randomCactusLargeOneBox].x;\r\n                this.sY = this.arrTypeCactus.large.one.boxes[randomCactusLargeOneBox].y;\r\n                this.sW =\r\n                    this.arrTypeCactus.large.one.boxes[randomCactusLargeOneBox].width;\r\n                this.sH =\r\n                    this.arrTypeCactus.large.one.boxes[randomCactusLargeOneBox].height;\r\n                break;\r\n            case config_1.cactus_large_three:\r\n                this.cY = this.arrTypeCactus.large.three.cY;\r\n                this.cW = this.arrTypeCactus.large.three.cW;\r\n                this.cH = this.arrTypeCactus.large.three.cH;\r\n                this.gap = this.arrTypeCactus.large.three.gap;\r\n                this.sX = this.arrTypeCactus.large.three.boxes[0].x;\r\n                this.sY = this.arrTypeCactus.large.three.boxes[0].y;\r\n                this.sW = this.arrTypeCactus.large.three.boxes[0].width;\r\n                this.sH = this.arrTypeCactus.large.three.boxes[0].height;\r\n                break;\r\n            case config_1.cactus_small:\r\n                this.cY = this.arrTypeCactus.small.cY;\r\n                this.cW = this.arrTypeCactus.small.cW;\r\n                this.cH = this.arrTypeCactus.small.cH;\r\n                let randomCactusSmallBox = (0, helper_1.getRandomNumber)(0, 5);\r\n                this.gap = this.arrTypeCactus.small.gap;\r\n                this.sX = this.arrTypeCactus.small.boxes[randomCactusSmallBox].x;\r\n                this.sY = this.arrTypeCactus.small.boxes[randomCactusSmallBox].y;\r\n                this.sW = this.arrTypeCactus.small.boxes[randomCactusSmallBox].width;\r\n                this.sH = this.arrTypeCactus.small.boxes[randomCactusSmallBox].height;\r\n                break;\r\n            case config_1.pterodactyl:\r\n                this.cY = this.arrTypePterodactyl.cY;\r\n                this.cW = this.arrTypePterodactyl.cW;\r\n                this.cH = this.arrTypePterodactyl.cH;\r\n                this.gap = this.arrTypePterodactyl.gap;\r\n                this.sX = this.arrTypePterodactyl.boxes[0].x;\r\n                this.sY = this.arrTypePterodactyl.boxes[0].y;\r\n                this.sW = this.arrTypePterodactyl.boxes[0].width;\r\n                this.sH = this.arrTypePterodactyl.boxes[0].height;\r\n                break;\r\n        }\r\n    }\r\n    draw(ctx) {\r\n        ctx.beginPath();\r\n        ctx.drawImage(this.imageSprites, this.sX, this.sY, this.sW, this.sH, this.cX, this.cY, this.cW, this.cH);\r\n    }\r\n    update() {\r\n        if (this.type === config_1.pterodactyl) {\r\n            this.timer++;\r\n            if (this.timer > 15) {\r\n                this.sX =\r\n                    this.arrTypePterodactyl.boxes[0].x === this.sX\r\n                        ? this.arrTypePterodactyl.boxes[1].x\r\n                        : this.arrTypePterodactyl.boxes[0].x;\r\n                this.timer = 0;\r\n            }\r\n        }\r\n    }\r\n}\r\nexports.Obstacles = Obstacles;\r\n\n\n//# sourceURL=webpack://game/./src/obstacles/Obstacles.ts?");

/***/ }),

/***/ "./src/outside/Cloud.ts":
/*!******************************!*\
  !*** ./src/outside/Cloud.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Cloud = void 0;\r\nconst imageObject_1 = __webpack_require__(/*! ../base/imageObject */ \"./src/base/imageObject.ts\");\r\nconst helper_1 = __webpack_require__(/*! ../utilities/helper */ \"./src/utilities/helper.ts\");\r\nclass Cloud extends imageObject_1.imageObject {\r\n    constructor(cX) {\r\n        super();\r\n        Object.setPrototypeOf(this, Cloud.prototype);\r\n        this.sX = 165;\r\n        this.sY = 0;\r\n        this.sW = 100;\r\n        this.sH = 30;\r\n        this.cX = cX;\r\n        this.cY = (0, helper_1.getRandomNumber)(30, 270);\r\n        this.cW = 200;\r\n        this.cH = 60;\r\n        this.vX = -1;\r\n        this.gap = (0, helper_1.getRandomNumber)(100, 400);\r\n    }\r\n    draw(ctx) {\r\n        ctx.beginPath();\r\n        ctx.drawImage(this.imageSprites, this.sX, this.sY, this.sW, this.sH, this.cX, this.cY, this.cW, this.cH);\r\n    }\r\n}\r\nexports.Cloud = Cloud;\r\n\n\n//# sourceURL=webpack://game/./src/outside/Cloud.ts?");

/***/ }),

/***/ "./src/outside/Ground.ts":
/*!*******************************!*\
  !*** ./src/outside/Ground.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Ground = void 0;\r\nconst imageObject_1 = __webpack_require__(/*! ../base/imageObject */ \"./src/base/imageObject.ts\");\r\nclass Ground extends imageObject_1.imageObject {\r\n    constructor(cX, cY, canvasWidth, vX) {\r\n        super();\r\n        Object.setPrototypeOf(this, Ground.prototype);\r\n        this.sX = 0;\r\n        this.sY = 100;\r\n        this.sW = 2400;\r\n        this.sH = 30;\r\n        this.cX = cX;\r\n        this.cY = cY;\r\n        this.cW = canvasWidth * 2;\r\n        this.cH = 30;\r\n        this.vX = vX;\r\n    }\r\n    draw(ctx) {\r\n        ctx.beginPath();\r\n        ctx.drawImage(this.imageSprites, this.sX, this.sY, this.sW, this.sH, this.cX, this.cY, this.cW, this.cH);\r\n    }\r\n}\r\nexports.Ground = Ground;\r\n\n\n//# sourceURL=webpack://game/./src/outside/Ground.ts?");

/***/ }),

/***/ "./src/scenes/Score.ts":
/*!*****************************!*\
  !*** ./src/scenes/Score.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Score = exports.scoreObject = void 0;\r\nconst imageObject_1 = __webpack_require__(/*! ../base/imageObject */ \"./src/base/imageObject.ts\");\r\nclass scoreObject extends imageObject_1.imageObject {\r\n    constructor(cX, cY) {\r\n        super();\r\n        Object.setPrototypeOf(this, scoreObject.prototype);\r\n        this.cX = cX;\r\n        this.cY = cY;\r\n        this.value = 0;\r\n        this.arrNumber = this.arrNumber = [\r\n            {\r\n                name: \"0\",\r\n                sX: 952,\r\n                cX: cX,\r\n            },\r\n            {\r\n                name: \"0\",\r\n                sX: 952,\r\n                cX: cX + 17,\r\n            },\r\n            {\r\n                name: \"0\",\r\n                sX: 952,\r\n                cX: cX + 34,\r\n            },\r\n            {\r\n                name: \"0\",\r\n                sX: 952,\r\n                cX: cX + 51,\r\n            },\r\n            {\r\n                name: \"0\",\r\n                sX: 952,\r\n                cX: cX + 68,\r\n            },\r\n        ];\r\n    }\r\n    update(value) {\r\n        let splitValue = this.value.toString().split(\"\");\r\n        let lengthSplit = splitValue.length;\r\n        for (let i = 0; i < 5 - lengthSplit; i++) {\r\n            this.arrNumber[i].sX = 952;\r\n            this.arrNumber[i].name = \"0\";\r\n        }\r\n        for (let i = 5 - lengthSplit; i < 5; i++) {\r\n            if (this.arrNumber[i].name !== splitValue[-5 + (i + lengthSplit)]) {\r\n                this.arrNumber[i].name = splitValue[i + 1 - lengthSplit];\r\n                this.arrNumber[i].sX =\r\n                    952 + 20 * parseInt(splitValue[-5 + (i + lengthSplit)]);\r\n            }\r\n        }\r\n    }\r\n}\r\nexports.scoreObject = scoreObject;\r\nclass Score extends scoreObject {\r\n    constructor(cX, cY) {\r\n        super(cX, cY);\r\n        Object.setPrototypeOf(this, Score.prototype);\r\n        this.timer = 0;\r\n    }\r\n    draw(ctx) {\r\n        this.arrNumber.forEach((_e) => {\r\n            ctx.drawImage(this.imageSprites, _e.sX, 0, 20, 25, _e.cX, this.cY, 15, 15);\r\n        });\r\n    }\r\n    update() {\r\n        this.timer++;\r\n        if (this.timer > 5) {\r\n            this.value++;\r\n            this.timer = 0;\r\n        }\r\n        super.update();\r\n    }\r\n}\r\nexports.Score = Score;\r\n\n\n//# sourceURL=webpack://game/./src/scenes/Score.ts?");

/***/ }),

/***/ "./src/scenes/gameOver.ts":
/*!********************************!*\
  !*** ./src/scenes/gameOver.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.gameOver = void 0;\r\nconst imageObject_1 = __webpack_require__(/*! ../base/imageObject */ \"./src/base/imageObject.ts\");\r\nclass gameOver extends imageObject_1.imageObject {\r\n    constructor() {\r\n        super();\r\n        Object.setPrototypeOf(this, gameOver.prototype);\r\n    }\r\n    draw(ctx, canvas, heightScore, score) {\r\n        ctx.beginPath();\r\n        ctx.fillStyle = \"rgba(0,0,0,0.3)\";\r\n        ctx.fillRect(0, 0, canvas.width, canvas.height);\r\n        ctx.drawImage(this.imageSprites, 955, 25, 380, 30, canvas.width / 2 - 135, 80, 270, 20);\r\n        ctx.drawImage(this.imageSprites, 0, 0, 75, 70, canvas.width / 2 - 35, 120, 70, 60);\r\n        ctx.beginPath();\r\n        ctx.fillStyle = \"#000\";\r\n        ctx.font = \"25px Arial\";\r\n        ctx.fillText(\"Click to restart\", canvas.width / 2 - 80, 205);\r\n        ctx.font = \"20px Arial\";\r\n        ctx.fillText(`Hight Score: ${heightScore}`, canvas.width / 2 - 80, 240);\r\n        ctx.fillText(`Score: ${score}`, canvas.width / 2 - 80, 265);\r\n    }\r\n}\r\nexports.gameOver = gameOver;\r\n\n\n//# sourceURL=webpack://game/./src/scenes/gameOver.ts?");

/***/ }),

/***/ "./src/scenes/gameStart.ts":
/*!*********************************!*\
  !*** ./src/scenes/gameStart.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.gameStart = void 0;\r\nconst imageObject_1 = __webpack_require__(/*! ../base/imageObject */ \"./src/base/imageObject.ts\");\r\nclass gameStart extends imageObject_1.imageObject {\r\n    constructor() {\r\n        super();\r\n        this.imgBtnStart = new Image(); // image button start\r\n        Object.setPrototypeOf(this, gameStart.prototype);\r\n        this.imgBtnStart.src = \"./image/Scenes/PlayButton.png\";\r\n    }\r\n    draw(ctx, canvas) {\r\n        ctx.beginPath();\r\n        ctx.drawImage(this.imgBtnStart, canvas.width / 2 - 50, canvas.height / 2 - 100, 100, 100);\r\n        ctx.drawImage(this.imageSprites, 75, 0, 100, 110, 15, 307, 60, 70);\r\n        (ctx.font = \"30px Arial\"),\r\n            ctx.strokeText(\"Click to start\", canvas.width / 2 - 75, canvas.height / 2 + 24);\r\n    }\r\n}\r\nexports.gameStart = gameStart;\r\n\n\n//# sourceURL=webpack://game/./src/scenes/gameStart.ts?");

/***/ }),

/***/ "./src/scenes/maxScore.ts":
/*!********************************!*\
  !*** ./src/scenes/maxScore.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.maxScore = void 0;\r\nconst Score_1 = __webpack_require__(/*! ./Score */ \"./src/scenes/Score.ts\");\r\nclass maxScore extends Score_1.scoreObject {\r\n    constructor(cX, cY) {\r\n        super(cX, cY);\r\n        Object.setPrototypeOf(this, maxScore.prototype);\r\n    }\r\n    draw(ctx) {\r\n        this.arrNumber.forEach((_e) => {\r\n            ctx.drawImage(this.imageSprites, _e.sX, 0, 20, 25, _e.cX, this.cY, 15, 15);\r\n        });\r\n        ctx.drawImage(this.imageSprites, 1152, 0, 40, 25, this.cX - 40, this.cY, 30, 15);\r\n    }\r\n    update(maxScore) {\r\n        this.value = maxScore;\r\n        super.update();\r\n    }\r\n}\r\nexports.maxScore = maxScore;\r\n\n\n//# sourceURL=webpack://game/./src/scenes/maxScore.ts?");

/***/ }),

/***/ "./src/utilities/box.ts":
/*!******************************!*\
  !*** ./src/utilities/box.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.box = void 0;\r\nclass box {\r\n    constructor(x, y, width, height) {\r\n        this.x = x;\r\n        this.y = y;\r\n        this.width = width;\r\n        this.height = height;\r\n        this.x = x;\r\n        this.y = y;\r\n        this.width = width;\r\n        this.height = height;\r\n    }\r\n}\r\nexports.box = box;\r\n\n\n//# sourceURL=webpack://game/./src/utilities/box.ts?");

/***/ }),

/***/ "./src/utilities/config.ts":
/*!*********************************!*\
  !*** ./src/utilities/config.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.pterodactyl = exports.cactus_small = exports.cactus_large_three = exports.cactus_large_one = exports.end = exports.play = exports.start = exports.status_duck = exports.status_jump = exports.status_run = exports.Space = exports.ArrowUp = exports.ArrowDown = exports.canvasHeight = exports.canvasWidth = void 0;\r\nexports.canvasWidth = 800;\r\nexports.canvasHeight = 400;\r\nexports.ArrowDown = \"ArrowDown\";\r\nexports.ArrowUp = \"ArrowUp\";\r\nexports.Space = \" \";\r\nexports.status_run = 0;\r\nexports.status_jump = 1;\r\nexports.status_duck = 2;\r\nexports.start = 0;\r\nexports.play = 1;\r\nexports.end = 2;\r\nexports.cactus_large_one = 0;\r\nexports.cactus_large_three = 1;\r\nexports.cactus_small = 2;\r\nexports.pterodactyl = 3;\r\n\n\n//# sourceURL=webpack://game/./src/utilities/config.ts?");

/***/ }),

/***/ "./src/utilities/helper.ts":
/*!*********************************!*\
  !*** ./src/utilities/helper.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.getRandomNumber = void 0;\r\nfunction getRandomNumber(minNumber, maxNumber) {\r\n    return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;\r\n}\r\nexports.getRandomNumber = getRandomNumber;\r\n\n\n//# sourceURL=webpack://game/./src/utilities/helper.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;