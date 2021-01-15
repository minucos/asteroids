const Game = require('./game');
const Util = require('./utils');

function GameView(ctx, demo) {
    this.ctx = ctx;
    this.demo = demo
    this.game = new Game(this.demo);
    this.lastTime = 0;
    this.pressedKeys = {};
};

GameView.MOVES = {
    up: [0, -2],
    left: [-2, 0],
    down: [0, 2],
    right: [2, 0],
};

GameView.KEYS = {
    'ArrowUp': true,
    'ArrowLeft': true,
    'ArrowRight': true,
};

GameView.prototype.start = function() {
    let that = this;
    if (!this.demo) {
        document.addEventListener('keydown',(e) => {
            if (GameView.KEYS[e.code] && !this.pressedKeys[e.code]) {
                that.keyPress(e.code);
            }
            if (e.code === 'ArrowUp') {
                this.game.ship.powerOn = true;
            }
        });
        document.addEventListener('keyup', (e) => {
            if (GameView.KEYS[e.code] && this.pressedKeys[e.code]) {
                that.keyPress(e.code);
            }
            if (e.code === 'ArrowUp') {
                this.game.ship.powerOn = false;
                const sound = document.querySelector('audio[data-name="engine"]');
                sound.pause();
                sound.currentTime = 0;
            }
        });
        document.addEventListener('keypress', (e) => {
            if (e.code == 'Space') {
                that.game.ship.fireBullet();
                const sound = document.querySelector('audio[data-name="laser"]');
                sound.currentTime = 0;
                sound.play();
            }
        })
    }

    requestAnimationFrame(this.animate.bind(this))
};

GameView.prototype.keyPress = function(key) {
    this.pressedKeys[key] = !this.pressedKeys[key];
}

GameView.prototype.animate = function(current) {
    const delta = current - this.lastTime
    if (this.game.over()) {
        delete this.game;
        this.game = new Game();
        this.lastTime = 0;
        this.pressedKeys = {};
    } else {
        if (!this.demo && Object.keys(this.pressedKeys).length > 0) {
            this.actions();
        }
    
        requestAnimationFrame(this.animate.bind(this));
    
        this.game.step(delta);
        this.game.draw(this.ctx);
        this.lastTime = current;
    };
};

GameView.prototype.actions = function () {
    const ship = this.game.ship;
    const actions = {
        'ArrowUp': function() { 
            ship.power();
            const sound = document.querySelector('audio[data-name="engine"]');
            sound.play();
        },
        'ArrowLeft': function() { ship.rotateLeft() },
        'ArrowRight': function() { ship.rotateRight() }
    }

    keys = Object.keys(this.pressedKeys).filter(key => this.pressedKeys[key] == true );

    keys.forEach( key => actions[key]() );
}

module.exports = GameView;