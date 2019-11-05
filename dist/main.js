/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/asteroid.js":
/*!*************************!*\
  !*** ./src/asteroid.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\n\nfunction Asteroid(pos, game, radius = Asteroid.RADIUS, splitCount = 0) {\n    MovingObject.call(this, {\n        pos: pos,\n        vel: Util.randomVec(2),\n        color: Asteroid.COLOR,\n        radius: radius,\n        game: game,\n        wrappable: true\n    })\n    this.splitCount = splitCount;\n}   \n\nUtil.inherits(Asteroid, MovingObject);\n\nAsteroid.prototype.draw = function(ctx) {\n    const img = new Image();\n    img.src = 'assets/meteorBrown_big3.png';\n\n    const width = this.radius * 2;\n\n    ctx.drawImage(img, this.pos[0] - width / 2, this.pos[1] - width / 2, width, width);\n}\n\nAsteroid.prototype.collideWith = function (otherObject) {\n    if (otherObject instanceof Asteroid) return null;\n\n    let a = otherObject.pos[0] - this.pos[0];\n    let b = otherObject.pos[1] - this.pos[1];\n    let dist = Math.sqrt(a ** 2 + b ** 2);\n    if (dist < this.radius + otherObject.radius) {\n        if (otherObject instanceof Ship) {\n            this.game.lives.pop();\n            otherObject.relocate();\n        }\n        if (otherObject instanceof Bullet) {\n            console.log('hit!')\n            this.game.remove(otherObject)\n            this.split();\n        }\n    }\n}\n\nAsteroid.prototype.split = function() {\n    this.game.remove(this);\n    if (this.splitCount < 2) {\n\n        for (x = 0; x < 2; x++) {\n            let pos = this.pos.slice(0);\n            let asteroid = new Asteroid(\n                pos, \n                this.game, \n                this.radius/2, \n                this.splitCount + 1\n            );\n                \n            this.game.asteroids.push(asteroid);\n\n        }\n    }\n}\n\nAsteroid.COLOR = 'grey';\nAsteroid.RADIUS = 40;\n\nmodule.exports = Asteroid;\n\n\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/bullet.js":
/*!***********************!*\
  !*** ./src/bullet.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\nfunction Bullet({pos, vel, game, heading}) {\n    MovingObject.call(this, {\n        pos: pos,\n        vel: vel,\n        radius: Bullet.RADIUS,\n        color: Bullet.COLOR,\n        game: game,\n        wrappable: false\n    })\n    this.heading = heading;\n}\n\nUtil.inherits(Bullet,MovingObject);\n\nBullet.prototype.draw = function(ctx) {\n    let startDeg = 360 - this.heading;\n\n    const img = new Image();\n    img.src = 'assets/laserGreen04.png';\n    \n    const radian = (startDeg * Math.PI / 180) + (180 * Math.PI / 180);\n    const width = this.radius * 2;\n    const height = this.radius * 15;\n\n    ctx.translate(this.pos[0], this.pos[1]);\n    ctx.rotate(radian);\n    ctx.drawImage(img, 0 - width / 2, 0 - height / 2, width, height);\n    ctx.rotate(-radian);\n    ctx.translate(-this.pos[0], -this.pos[1]);\n};\n\nBullet.RADIUS = 2;\nBullet.COLOR = '#67ff38';\n\nmodule.exports = Bullet;\n\n//# sourceURL=webpack:///./src/bullet.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Asteroid = __webpack_require__(/*! ./asteroid */ \"./src/asteroid.js\");\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\n\nfunction Game() {\n    this.asteroids = [];\n    this.bullets = [];\n    this.ship = new Ship([Game.DIM_X / 2, Game.DIM_Y / 2], this);\n    this.addAsteroids();\n    this.lives = ['🚀','🚀','🚀'];\n};\n\nGame.prototype.addAsteroids = function() {\n    for (x = 0; x < Game.NUM_ASTEROIDS; x++ ) {\n        let pos = this.randomPosition('asteroid')\n        let asteroid = new Asteroid(pos, this);\n\n        this.asteroids.push(asteroid);\n    }\n}\n\nGame.prototype.randomPosition = function(str) {\n    let x = Math.floor(Math.random() * Game.DIM_X);\n    let y = Math.floor(Math.random() * Game.DIM_Y);\n\n    if ( str == 'asteroid') {\n        while (x > Game.DIM_X * 0.25 && x < Game.DIM_X * 0.75) {\n            x = Math.floor(Math.random() * Game.DIM_X);\n        }\n    \n        while (y > Game.DIM_Y * 0.25 && y < Game.DIM_Y * 0.75) {\n            y = Math.floor(Math.random() * Game.DIM_Y);\n        }\n    }\n\n    return [x,y];\n}\n\nGame.prototype.draw = function(ctx) {\n    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);\n    this.allObjects().forEach( obj => {\n        obj.draw(ctx);\n    });\n\n    ctx.fillStyle = 'white';\n    ctx.font = \"20px Georgia\";\n    ctx.fillText(`Lives: ${this.lives.join('')}`, 10, 30);\n}\n\nGame.prototype.moveObjects = function(timeDelta) {\n    this.allObjects().forEach( obj => {\n        obj.move(timeDelta);\n    })\n}\n\nGame.prototype.wrap = function(pos, radius) {\n    let x = pos[0] % (Game.DIM_X + radius);\n    let y = pos[1] % (Game.DIM_X + radius);\n\n    if (x < 0 - radius) {\n        x = Game.DIM_X + radius\n    }\n    if (y < 0 - radius) {\n        y = Game.DIM_Y + radius\n    }\n\n    return [x,y]\n}\n\nGame.prototype.over = function() {\n    let over = false;\n    if (this.asteroids.length == 0) {\n        over = true;\n        alert('You Win!');\n    }\n    if (this.lives.length == 0) {\n        over = true;\n        alert('You Lose!');\n    }\n    return over;\n};\n\nGame.prototype.checkCollisions = function() {\n    let objects = this.allObjects();\n\n    objects.forEach( obj => {\n        objects.forEach( otherObj => {\n            obj.collideWith(otherObj)\n        })\n    })\n}\n\nGame.prototype.step = function(timeDelta) {\n    this.checkCollisions();\n    this.moveObjects(timeDelta);\n}\n\nGame.prototype.add = function(obj) {\n    let objArr = this.asteroids;\n    if (obj instanceof Bullet) {\n        objArr = this.bullets;\n    };\n\n    objArr.push(obj);\n}\n\nGame.prototype.remove = function(obj) {\n    let objArr = this.asteroids\n    if (obj instanceof Bullet) {\n        objArr = this.bullets;\n    }\n\n    let idx = objArr.indexOf(obj);\n    objArr.splice(idx,1);\n}\n\nGame.prototype.allObjects = function() {\n    let allObjects = this.asteroids.concat(this.bullets).concat([this.ship]);\n\n    return allObjects\n}\n\nGame.prototype.isOutOfBounds = function(pos) {\n    let x = pos[0];\n    let y = pos[1];\n\n    return x < 0 || y < 0 || x > Game.DIM_X || y > Game.DIM_X;\n}\n\nGame.DIM_X = 500;\nGame.DIM_Y = 500\nGame.NUM_ASTEROIDS = 4;\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst Util = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\nfunction GameView(ctx) {\n    this.ctx = ctx;\n    this.game = new Game();\n    this.lastTime = 0;\n    this.pressedKeys = {};\n};\n\nGameView.MOVES = {\n    up: [0, -2],\n    left: [-2, 0],\n    down: [0, 2],\n    right: [2, 0],\n};\n\nGameView.KEYS = {\n    'ArrowUp': true,\n    'ArrowLeft': true,\n    'ArrowRight': true,\n}\n\nGameView.prototype.start = function() {\n    let that = this;\n    document.addEventListener('keydown',(e) => {\n        if (GameView.KEYS[e.code] && !this.pressedKeys[e.code]) {\n            that.keyPress(e.code);\n        }\n    });\n    document.addEventListener('keyup', (e) => {\n        if (GameView.KEYS[e.code] && this.pressedKeys[e.code]) {\n            that.keyPress(e.code);\n        } \n    });\n    document.addEventListener('keypress', (e) => {\n        if (e.code == 'Space') that.game.ship.fireBullet();\n    })\n\n    requestAnimationFrame(this.animate.bind(this))\n};\n\nGameView.prototype.keyPress = function(key) {\n    this.pressedKeys[key] = !this.pressedKeys[key];\n}\n\nGameView.prototype.animate = function(current) {\n    const delta = current - this.lastTime\n    if (this.game.over()) {\n        this.game = new Game();\n        this.lastTime = 0;\n        this.pressedKeys = {};\n    };\n    if (Object.keys(this.pressedKeys).length > 0) {\n        this.actions();\n    }\n\n    requestAnimationFrame(this.animate.bind(this));\n\n    this.game.step(delta);\n    this.game.draw(this.ctx);\n    this.lastTime = current;\n};\n\nGameView.prototype.bindKeyHandlers = function() {\n    const ship = this.game.ship;\n\n    key('up', function() { ship.power() });\n    key('left', function() { ship.rotateLeft() });\n    key('right', function() { ship.rotateRight() });\n    key('space', function() { ship.fireBullet(); });\n}\n\nGameView.prototype.actions = function () {\n    const ship = this.game.ship;\n    const actions = {\n        'ArrowUp': function() { ship.power() },\n        'ArrowLeft': function() { ship.rotateLeft() },\n        'ArrowRight': function() { ship.rotateRight() }\n    }\n\n    keys = Object.keys(this.pressedKeys).filter(key => this.pressedKeys[key] == true );\n\n    keys.forEach( key => actions[key]() );\n}\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("console.log('webpack is working!');\nconst GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n\ndocument.addEventListener('DOMContentLoaded', () => {\n    const ctx = document.getElementById('canvas').getContext(\"2d\")\n\n    const gameview = new GameView(ctx);\n\n    gameview.start()\n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function MovingObject({ pos, vel, radius, color, game, wrappable }) {\n    this.pos = pos;\n    this.vel = vel;\n    this.radius = radius;\n    this.color = color;\n    this.game = game;\n    this.isWrappable = wrappable;\n}\n\n\nMovingObject.prototype.draw = function(ctx) {\n    ctx.fillStyle = this.color;\n    ctx.beginPath();\n    ctx.arc(\n        this.pos[0],\n        this.pos[1],\n        this.radius,\n        0,\n        2 * Math.PI,\n        false\n    );\n\n    ctx.fill();\n};\n\nMovingObject.prototype.move = function(timeDelta) {\n    timeDelta = timeDelta || 1;\n\n    this.pos[0] += (this.vel[0] * timeDelta / 20);\n    this.pos[1] += (this.vel[1] * timeDelta / 20);\n\n    if (this.game.isOutOfBounds(this.pos)) {\n        if (this.isWrappable) {\n            this.pos = this.game.wrap(this.pos, this.radius);\n        } else {\n            this.game.remove(this);\n        }\n    }\n}\n\nMovingObject.prototype.collideWith = function(otherObject) {\n    \n}\n\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\nconst Util = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\nfunction Ship(pos, game) {\n    MovingObject.call(this,{\n        pos: pos,\n        vel: [0,0],\n        radius: Ship.RADIUS,\n        color: Ship.COLOR,\n        game: game,\n        wrappable: true\n    })\n    this.heading = 180\n    this.powerOn = false;\n}\n\nUtil.inherits(Ship, MovingObject);\n\nShip.prototype.draw = function(ctx) {\n    let startDeg = 360 - this.heading;\n\n    const img = new Image();\n    img.src = 'assets/playerShip1_red.png';\n    const radian = (startDeg * Math.PI / 180) + (180 * Math.PI / 180);\n    ctx.translate(this.pos[0],this.pos[1]);\n    ctx.rotate(radian);\n    ctx.drawImage(img, 0 - 12.5,0 - 12.5,25,25);\n    ctx.rotate(-radian);\n    ctx.translate(-this.pos[0], -this.pos[1]);\n}\n\nShip.prototype.relocate = function() {\n    this.pos = this.game.randomPosition();\n    this.vel = [0,0];\n}\n\nShip.prototype.power = function() {\n    const impulse = Util.getVec(0.1,this.heading)\n    this.vel[0] += impulse[0];\n    this.vel[1] += impulse[1];\n}\n\nShip.prototype.rotateLeft = function() {\n    let deg = this.heading + 5;\n\n    if (deg > 360) {\n        deg -= 360\n    }\n\n    this.heading = deg\n}\n\nShip.prototype.rotateRight = function() {\n    let deg = this.heading - 5;\n\n    if (deg < 0) {\n        deg += 360\n    }\n\n    this.heading = deg\n}\n\nShip.prototype.fireBullet = function() {\n    let vel = Util.getVec(10,this.heading);\n    let pos = this.pos.slice(0);\n\n    let bullet = new Bullet({\n        pos: pos,\n        vel: vel,\n        game: this.game,\n        heading: this.heading\n    })\n\n    this.game.add(bullet);\n}\n\nShip.prototype.calcPositions = function() {\n    let pos = this.pos;\n\n    return({\n        tip: [pos[0], pos[1] - 10],\n        left: [pos[0] - 10, pos[1] + 10],\n        right: [pos[0] + 10, pos[1] + 10],\n    })\n}\n\nShip.RADIUS = 10;\nShip.COLOR = 'red';\n\n\n\nmodule.exports = Ship;\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Util = {\n    inherits: function inherits(child, parent) {\n        function Proxy() {};\n        Proxy.prototype = parent.prototype;\n        child.prototype = new Proxy();\n        child.prototype.constructor = child;\n    },\n    randomVec(length) {\n        const deg = 2 * Math.PI * Math.random();\n        return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n    },\n    getVec(length,angle) {\n        const deg = 2 * Math.PI * (1 / 360 * angle);\n        return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n    },\n    // Scale the length of a vector by the given amount.\n    scale(vec, m) {\n        return [vec[0] * m, vec[1] * m];\n    },\n    debounce(func,wait) {\n        setTimeout(func,wait)\n    }\n}\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ })

/******/ });