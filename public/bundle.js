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

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst player_1 = __webpack_require__(/*! ./player */ \"./src/player.ts\");\r\nlet canvas = document.getElementById('viewport');\r\nlet ctx = canvas.getContext('2d');\r\nlet _player = new player_1.player();\r\nlet play_image = new Image();\r\nlet id;\r\nfunction init() {\r\n    play_image.src = _player.image;\r\n    id = window.requestAnimationFrame(draw);\r\n}\r\nfunction draw() {\r\n    window.cancelAnimationFrame(id);\r\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\r\n    //draw player\r\n    ctx.drawImage(play_image, 0, 0, 85, 100, 10, 300, 40, 50);\r\n    ctx.drawImage(play_image, 10, 10, 85, 100, 10, 300, 40, 50);\r\n    id = window.requestAnimationFrame(draw);\r\n}\r\ninit();\r\n\n\n//# sourceURL=webpack://game/./src/index.ts?");

/***/ }),

/***/ "./src/player.ts":
/*!***********************!*\
  !*** ./src/player.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.player = void 0;\r\nclass player {\r\n    constructor() {\r\n        this.image = '../image/assets/dino-run.png';\r\n    }\r\n    run() {\r\n    }\r\n}\r\nexports.player = player;\r\n\n\n//# sourceURL=webpack://game/./src/player.ts?");

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