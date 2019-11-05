const Asteroid = require('./asteroid');
const Ship = require('./ship');
const Bullet = require('./bullet');

function Game() {
    this.asteroids = [];
    this.bullets = [];
    this.ship = new Ship([Game.DIM_X / 2, Game.DIM_Y / 2], this);
    this.addAsteroids();
    this.lives = ['🚀','🚀','🚀'];
};

Game.prototype.addAsteroids = function() {
    for (x = 0; x < Game.NUM_ASTEROIDS; x++ ) {
        let pos = this.randomPosition()
        let asteroid = new Asteroid(pos, this);

        this.asteroids.push(asteroid);
    }
}

Game.prototype.randomPosition = function() {
    let x = Math.floor(Math.random() * Game.DIM_X);
    while (x > Game.DIM_X * 0.25 && x < Game.DIM_X * 0.75) {
        x = Math.floor(Math.random() * Game.DIM_X);
    }

    let y = Math.floor(Math.random() * Game.DIM_Y);
    while (y > Game.DIM_Y * 0.25 && y < Game.DIM_Y * 0.75) {
        y = Math.floor(Math.random() * Game.DIM_Y);
    }

    return [x,y];
}

Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.allObjects().forEach( obj => {
        obj.draw(ctx);
    });

    ctx.fillStyle = 'white';
    ctx.font = "20px Georgia";
    ctx.fillText(`Lives: ${this.lives.join('')}`, 10, 30);
}

Game.prototype.moveObjects = function(timeDelta) {
    this.allObjects().forEach( obj => {
        obj.move(timeDelta);
    })
}

Game.prototype.wrap = function(pos, radius) {
    let x = pos[0] % (Game.DIM_X + radius);
    let y = pos[1] % (Game.DIM_X + radius);

    if (x < 0 - radius) {
        x = Game.DIM_X + radius
    }
    if (y < 0 - radius) {
        y = Game.DIM_Y + radius
    }

    return [x,y]
}

Game.prototype.over = function() {
    let over = false;
    if (this.asteroids.length == 0) {
        over = true;
        alert('You Win!');
    }
    if (this.lives.length == 0) {
        over = true;
        alert('You Lose!');
    }
    return over;
};

Game.prototype.checkCollisions = function() {
    let objects = this.allObjects();

    objects.forEach( obj => {
        objects.forEach( otherObj => {
            obj.collideWith(otherObj)
        })
    })
}

Game.prototype.step = function(timeDelta) {
    this.checkCollisions();
    this.moveObjects(timeDelta);
}

Game.prototype.add = function(obj) {
    let objArr = this.asteroids;
    if (obj instanceof Bullet) {
        objArr = this.bullets;
    };

    objArr.push(obj);
}

Game.prototype.remove = function(obj) {
    let objArr = this.asteroids
    if (obj instanceof Bullet) {
        objArr = this.bullets;
    }

    let idx = objArr.indexOf(obj);
    objArr.splice(idx,1);
}

Game.prototype.allObjects = function() {
    let allObjects = this.asteroids.concat(this.bullets).concat([this.ship]);

    return allObjects
}

Game.prototype.isOutOfBounds = function(pos) {
    let x = pos[0];
    let y = pos[1];

    return x < 0 || y < 0 || x > Game.DIM_X || y > Game.DIM_X;
}

Game.DIM_X = 500;
Game.DIM_Y = 500
Game.NUM_ASTEROIDS = 4;

module.exports = Game;