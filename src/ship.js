const MovingObject = require('./moving_object');
const Bullet = require('./bullet');
const Util = require('./utils');

function Ship(pos, game) {
    MovingObject.call(this,{
        pos: pos,
        vel: [0,0],
        radius: Ship.RADIUS,
        color: Ship.COLOR,
        game: game,
        wrappable: true
    })
    this.heading = 180
    this.powerOn = false;
}

Util.inherits(Ship, MovingObject);

Ship.prototype.draw = function(ctx) {
    let startDeg = 360 - this.heading;
    const img = new Image();
    img.src = this.powerOn ? 'assets/player_ship_flame.png' : 'assets/player_ship.png';
    const imgX = 99/3;
    const imgY = this.powerOn ? 141/3 : 75/3;
    const radian = (startDeg * Math.PI / 180) + (180 * Math.PI / 180);
    ctx.translate(this.pos[0],this.pos[1]);
    ctx.rotate(radian);
    ctx.drawImage(img, 0 - (imgX/2), 0 - (imgY/2), imgX, imgY);
    ctx.rotate(-radian);
    ctx.translate(-this.pos[0], -this.pos[1]);
}

Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
    const sound = document.querySelector('audio[data-name="ship-explosion"]');
    sound.currentTime = 0;
    sound.play();
}

Ship.prototype.power = function() {
    const impulse = Util.getVec(0.1,this.heading)
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
}

Ship.prototype.rotateLeft = function() {
    let deg = this.heading + 5;

    if (deg > 360) {
        deg -= 360
    }

    this.heading = deg
}

Ship.prototype.rotateRight = function() {
    let deg = this.heading - 5;

    if (deg < 0) {
        deg += 360
    }

    this.heading = deg
}

Ship.prototype.fireBullet = function() {
    let vel = Util.getVec(10,this.heading);
    let pos = this.pos.slice(0);

    let bullet = new Bullet({
        pos: pos,
        vel: vel,
        game: this.game,
        heading: this.heading
    })

    this.game.add(bullet);
}

Ship.prototype.calcPositions = function() {
    let pos = this.pos;

    return({
        tip: [pos[0], pos[1] - 10],
        left: [pos[0] - 10, pos[1] + 10],
        right: [pos[0] + 10, pos[1] + 10],
    })
}

Ship.RADIUS = 10;
Ship.COLOR = 'red';



module.exports = Ship;