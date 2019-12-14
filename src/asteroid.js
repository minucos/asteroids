const Util = require('./utils');
const MovingObject = require('./moving_object');
const Ship = require('./ship');
const Bullet = require('./bullet');

function Asteroid(pos, game, radius = Asteroid.RADIUS, splitCount = 0) {
    MovingObject.call(this, {
        pos: pos,
        vel: Util.randomVec(2),
        color: Asteroid.COLOR,
        radius: radius,
        game: game,
        wrappable: true
    })
    this.splitCount = splitCount;
}   

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.draw = function(ctx) {
    const img = new Image();
    img.src = 'assets/meteorBrown_big3.png';

    const width = this.radius * 2;

    ctx.drawImage(img, this.pos[0] - width / 2, this.pos[1] - width / 2, width, width);
}

Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroid) return null;

    let a = otherObject.pos[0] - this.pos[0];
    let b = otherObject.pos[1] - this.pos[1];
    let dist = Math.sqrt(a ** 2 + b ** 2);
    if (dist < this.radius + otherObject.radius) {
        if (otherObject instanceof Ship) {
            this.game.lives.pop();
            otherObject.relocate();
        }
        if (otherObject instanceof Bullet) {
            console.log('hit!')
            this.game.remove(otherObject)
            this.split();
        }
    }
}

Asteroid.prototype.split = function() {
    this.game.remove(this);
    const sound = document.querySelector('audio[data-name="asteroid-explosion"]');
    sound.currentTime = 0;
    sound.play();
    if (this.splitCount < 2) {

        for (x = 0; x < 2; x++) {
            let pos = this.pos.slice(0);
            let asteroid = new Asteroid(
                pos, 
                this.game, 
                this.radius/2, 
                this.splitCount + 1
            );
                
            this.game.asteroids.push(asteroid);

        }
    }
}

Asteroid.COLOR = 'grey';
Asteroid.RADIUS = 40;

module.exports = Asteroid;

